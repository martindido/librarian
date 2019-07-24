/// <reference types="passport"/>

declare module 'passport-goodreads' {
    import { Request as ExpressRequest } from 'express';
    import { Strategy as PassportStrategy } from 'passport-strategy';

    type Request = {
        authentication: string;
        key: string;
        method: string;
    };

    type Id = string;

    type ProfileUser = {
        '@': {
            id: Id;
        };
        name: string;
        link: string;
    };

    type Credentials = {
        token: string;
        secret: string;
    };

    type User = {
        id: Id;
        name: string;
        link: string;
        credentials: Credentials;
    };

    type Profile = {
        provider: 'goodreads';
        id: Id;
        displayName: string;
        _raw: string;
        _xml2js: {
            Request: Request;
            user: ProfileUser;
        };
        _xml2json: {
            Request: Request;
            user: ProfileUser;
        };
    };

    interface IStrategyOptions {
        consumerKey: string;
        consumerSecret: string;
        callbackURL: string;
        passReqToCallback?: false;
    }

    interface IStrategyOptionsWithRequest extends IStrategyOptions {
        passReqToCallback: true;
    }

    interface IVerifyOptions {
        message: string;
    }

    type VerifyWithRequest = (
        req: ExpressRequest,
        token: string,
        tokenSecret: string,
        profile: Profile,
        done: (error: any, profile?: Profile, options?: IVerifyOptions) => void
    ) => void;

    type Verify = (
        token: string,
        tokenSecret: string,
        profile: Profile,
        done: (error: any, profile?: User, options?: IVerifyOptions) => void
    ) => void;

    class Strategy extends PassportStrategy {
        constructor(options: IStrategyOptionsWithRequest, verify: VerifyWithRequest);
        constructor(options: IStrategyOptions, verify: Verify);
        constructor(verify: Verify);

        name: string;
    }

    type SerializeUserDone = (err: any, user?: string) => void;

    type DeserializeUserDone = (err: any, user?: User) => void;
}
