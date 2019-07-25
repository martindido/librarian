import { Controller, Delete, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import passport from 'passport';
import { DeserializeUserDone, SerializeUserDone, Strategy, User, Verify } from 'passport-goodreads';

import { createLogger } from '../../../src/commons/utils';

@Controller('goodreads')
export default class GoodreadsAuthController {
    constructor() {
        GoodreadsAuthController.logger.info('');
        GoodreadsAuthController.setupPassport();
    }

    private static readonly GOODREADS_SESSION_NAME = 'lwsid';
    private static readonly GOODREADS_KEY = '4DgGUgFPJmVjrIPYGaDRWQ';
    private static readonly GOODREADS_SECRET = 'ZaSi2UU7w8KVp6yUyl8cJImFrd31Vat1KdDSn3C3uA';
    private static readonly GOODREADS_CALLBACK = 'http://www.librarian.world:5000/auth/goodreads/callback';
    private static readonly GOODREADS_REDIRECT = 'http://www.librarian.world:3000/';

    private static logger = createLogger(['controllers', 'auth', 'goodreads']);

    private static setupPassport = () => {
        passport.serializeUser<User, string>(GoodreadsAuthController.serializeUser);
        passport.deserializeUser<User, string>(GoodreadsAuthController.deserializeUser);
        passport.use(
            new Strategy(
                {
                    consumerKey: GoodreadsAuthController.GOODREADS_KEY,
                    consumerSecret: GoodreadsAuthController.GOODREADS_SECRET,
                    callbackURL: GoodreadsAuthController.GOODREADS_CALLBACK
                },
                GoodreadsAuthController.verify
            )
        );
    }

    private static serializeUser = (user: User, done: SerializeUserDone) => {
        GoodreadsAuthController.logger.info('serializeUser');
        done(null, JSON.stringify(user));
    }

    private static deserializeUser = (user: string, done: DeserializeUserDone) => {
        GoodreadsAuthController.logger.info('deserializeUser');
        done(null, JSON.parse(user));
    }

    private static verify: Verify = (token, secret, profile, done) => {
        GoodreadsAuthController.logger.info('verify');
        return done(null, {
            id: profile.id,
            name: profile.displayName,
            link: profile._xml2js.user.link,
            credentials: {
                token,
                secret
            }
        });
    }

    @Get()
    @Middleware(passport.authenticate('goodreads'))
    protected async authenticate(req: Request) {
        GoodreadsAuthController.logger.info(`[${req.id}] authenticate`);
    }

    @Delete()
    protected async deauthenticate(req: Request, res: Response) {
        GoodreadsAuthController.logger.info(`[${req.id}] deauthenticate`);
        req.logout();
        if (!req.session) {
            res.sendStatus(OK);
            return;
        }
        req.session.destroy(() => {
            res.clearCookie(GoodreadsAuthController.GOODREADS_SESSION_NAME);
            res.sendStatus(OK);
        });
    }

    @Get('callback')
    @Middleware(passport.authenticate('goodreads', { failureRedirect: '/sign-in' }))
    protected async callback(req: Request, res: Response) {
        GoodreadsAuthController.logger.info(`[${req.id}] callback`);
        res.redirect(GoodreadsAuthController.GOODREADS_REDIRECT);
    }
}
