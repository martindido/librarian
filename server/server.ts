// import bodyParser from 'body-parser';
// import compression from 'compression';
// import cookieParser from 'cookie-parser';
// import express from 'express';
// import morgan from 'morgan';
// import path from 'path';
// // import forceDomain from 'forcedomain';
// import Loadable from 'react-loadable';

// import loader from './loader';

// const app = express();
// const PORT = process.env.PORT || 3001;

// // NOTE: UNCOMMENT THIS IF YOU WANT THIS FUNCTIONALITY
// /*
//   Forcing www and https redirects in production, totally optional.
//   http://mydomain.com
//   http://www.mydomain.com
//   https://mydomain.com
//   Resolve to: https://www.mydomain.com
// */
// // if (process.env.NODE_ENV === 'production') {
// //   app.use(
// //     forceDomain({
// //       hostname: 'www.mydomain.com',
// //       protocol: 'https'
// //     })
// //   );
// // }

// app.use(compression());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(morgan('dev'));
// app.use(cookieParser());

// app.use(express.Router().get('/', loader));
// app.use(express.static(path.resolve(__dirname, '../build')));
// app.use(loader);

// Loadable.preloadAll().then(() => {
//     app.listen(PORT, console.log(`App listening on port ${PORT}!`));
// });

// app.on('error', (error) => {
//     if (error.syscall !== 'listen') {
//         throw error;
//     }

//     const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

//     switch (error.code) {
//         case 'EACCES':
//             console.error(bind + ' requires elevated privileges');
//             process.exit(1);
//             break;
//         case 'EADDRINUSE':
//             console.error(bind + ' is already in use');
//             process.exit(1);
//             break;
//         default:
//             throw error;
//     }
// });

import { Server } from '@overnightjs/core';
import bodyParser from 'body-parser';
import DynamoDBStore from 'connect-dynamodb';
import express from 'express';
import session from 'express-session';
import passport from 'passport';

import { createLogger } from '../src/commons/utils';

import ApiController from './controllers/api';
import AuthController from './controllers/auth';
import NotFoundController from './controllers/notFound';

export default class LibrarianServer extends Server {
    constructor() {
        super(process.env.NODE_ENV === 'development');
        LibrarianServer.logger.info('');
        this.setupStatic();
        this.setupBodyParser();
        this.setupSession();
        this.setupPassport();
        this.setupControllers();
    }

    private static readonly SERVER_STATIC_PATH = '/public';
    private static readonly SERVER_SESSION_SECRET = 'library mouse';
    private static readonly SERVER_SESSION_NAME = 'lwsid';
    private static readonly SERVER_SESSION_UNSET = 'destroy';
    private static readonly SERVER_STORE_TABLE = 'library-sessions';
    private static readonly SERVER_STARTED = 'Librarian Server started on port: ';

    private static logger = createLogger('server');

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
                secret: LibrarianServer.SERVER_SESSION_SECRET,
                resave: false,
                saveUninitialized: false,
                unset: LibrarianServer.SERVER_SESSION_UNSET,
                name: LibrarianServer.SERVER_SESSION_NAME,
                store: new Store({
                    table: LibrarianServer.SERVER_STORE_TABLE
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

    public start = (port: number): void => {
        LibrarianServer.logger.info('start');
        this.app.listen(port, () => {
            LibrarianServer.logger.info(LibrarianServer.SERVER_STARTED + port);
        });
    }
}
