import { Controller, Delete, Get, Middleware } from '@overnightjs/core';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import passport from 'passport';
import { DeserializeUserDone, SerializeUserDone, Strategy, User, Verify } from 'passport-goodreads';

import { createLogger } from '../../../src/commons/utils';
import { GOODREADS_CALLBACK, GOODREADS_KEY, GOODREADS_REDIRECTION, GOODREADS_SECRET } from '../../constants/goodreads';
import { SESSION_NAME } from '../../constants/session';

@Controller('goodreads')
export default class GoodreadsAuthController {
    constructor() {
        GoodreadsAuthController.logger.info('');
        GoodreadsAuthController.setupPassport();
    }

    private static readonly GOODREADS_KEY = GOODREADS_KEY;
    private static readonly GOODREADS_SECRET = GOODREADS_SECRET;
    private static readonly GOODREADS_CALLBACK = GOODREADS_CALLBACK;
    private static readonly GOODREADS_REDIRECTION = GOODREADS_REDIRECTION;
    private static readonly SESSION_NAME = SESSION_NAME;

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
    protected authenticate(req: Request): void {
        GoodreadsAuthController.logger.info(req.id, 'authenticate');
    }

    @Delete()
    protected deauthenticate(req: Request, res: Response): Response {
        GoodreadsAuthController.logger.info(req.id, 'deauthenticate');
        req.logout();
        this.destroySession(req);
        return res.clearCookie(GoodreadsAuthController.SESSION_NAME).sendStatus(OK);
    }

    private destroySession = (req: Request): void => {
        if (!req.session) {
            return;
        }
        req.session.destroy((error) => {
            if (error) {
                GoodreadsAuthController.logger.error(req.id, 'destroySession', error);
            } else {
                GoodreadsAuthController.logger.info(req.id, 'destroySession');
            }
        });
    }

    @Get('callback')
    @Middleware(passport.authenticate('goodreads', { failureRedirect: '/sign-in' }))
    protected async callback(req: Request, res: Response): Promise<void> {
        GoodreadsAuthController.logger.info(req.id, 'callback');
        res.redirect(GoodreadsAuthController.GOODREADS_REDIRECTION);
    }
}
