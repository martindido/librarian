import { Controller, Delete, Get, Middleware } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';
import { OK } from 'http-status-codes';
import passport from 'passport';
import { DeserializeUserDone, SerializeUserDone, Strategy, User, Verify } from 'passport-goodreads';

@Controller('goodreads')
export default class GoodreadsAuthController {
    constructor() {
        GoodreadsAuthController.setupPassport();
    }

    private static readonly GOODREADS_SESSION_NAME = 'lwsid';
    private static readonly GOODREADS_KEY = '4DgGUgFPJmVjrIPYGaDRWQ';
    private static readonly GOODREADS_SECRET = 'ZaSi2UU7w8KVp6yUyl8cJImFrd31Vat1KdDSn3C3uA';
    private static readonly GOODREADS_CALLBACK = 'http://www.librarian.world:5000/auth/goodreads/callback';
    private static readonly GOODREADS_REDIRECT = 'http://www.librarian.world:3000/';

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

    public static serializeUser = (user: User, done: SerializeUserDone) => {
        Logger.Info('serializeUser');
        done(null, JSON.stringify(user));
    }

    public static deserializeUser = (user: string, done: DeserializeUserDone) => {
        Logger.Info('deserializeUser');
        done(null, JSON.parse(user));
    }

    public static verify: Verify = (token, secret, profile, done) => {
        Logger.Info(`Called verify`);
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

    @Get('')
    @Middleware(passport.authenticate('goodreads'))
    protected async authenticate(req: Request) {
        Logger.Info(`[${req.id}] Called authenticate`);
    }

    @Delete('')
    protected async logout(req: Request, res: Response) {
        Logger.Info(`[${req.id}] Called logout`);
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
        Logger.Info(`[${req.id}] Called callback`);
        res.redirect(GoodreadsAuthController.GOODREADS_REDIRECT);
    }
}
