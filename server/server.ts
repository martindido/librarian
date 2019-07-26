import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import compression from 'compression';
import DynamoDBStore from 'connect-dynamodb';
import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import passport from 'passport';

import { createLogger } from '../src/commons/utils';

import { SERVER_PORT, SERVER_STATIC_PATH } from './constants/server';
import { SESSION_NAME, SESSION_SECRET, SESSION_STORE_TABLE, SESSION_UNSET } from './constants/session';
import ApiController from './controllers/api';
import AuthController from './controllers/auth';
import NotFoundController from './controllers/notFound';

export default class LibrarianServer extends Server {
    constructor() {
        super();
        LibrarianServer.logger.info('', process.env.NODE_ENV);
        this.setupHelmet();
        this.setupCompression();
        this.setupStatic();
        this.setupBodyParser();
        this.setupSession();
        this.setupPassport();
        this.setupControllers();
    }

    private static readonly SERVER_PORT = SERVER_PORT;
    private static readonly SERVER_STATIC_PATH = SERVER_STATIC_PATH;
    private static readonly SESSION_SECRET = SESSION_SECRET;
    private static readonly SESSION_NAME = SESSION_NAME;
    private static readonly SESSION_UNSET = SESSION_UNSET;
    private static readonly SESSION_STORE_TABLE = SESSION_STORE_TABLE;

    private static logger = createLogger('server');

    private setupCompression = (): void => {
        this.app.use(compression());
    }

    private setupHelmet = (): void => {
        this.app.use(helmet());
    }

    private setupStatic = (): void => {
        this.app.use(express.static(LibrarianServer.SERVER_STATIC_PATH));
    }

    private setupBodyParser = (): void => {
        this.app.use(bodyParser.json());
        this.app.use(
            bodyParser.urlencoded({
                extended: true
            })
        );
    }

    private setupSession = (): void => {
        const Store = DynamoDBStore(session);

        this.app.use(
            session({
                secret: LibrarianServer.SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                unset: LibrarianServer.SESSION_UNSET,
                name: LibrarianServer.SESSION_NAME,
                store: new Store({
                    table: LibrarianServer.SESSION_STORE_TABLE
                })
            })
        );
    }

    private setupPassport = (): void => {
        this.app.use(passport.initialize());
        this.app.use(passport.session());
    }

    private setupControllers = (): void => {
        const apiController = new ApiController();
        const authController = new AuthController();
        const notFoundController = new NotFoundController();

        super.addControllers([apiController, authController, notFoundController]);
    }

    public start = (): void => {
        LibrarianServer.logger.info('start');
        this.app.listen(LibrarianServer.SERVER_PORT, this.started);
    }

    private started = (): void => {
        LibrarianServer.logger.info('started', {
            port: LibrarianServer.SERVER_PORT
        });
    }
}
