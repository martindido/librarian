import 'dotenv/config';

import { createLogger } from '../src/commons/utils';

import LibrarianServer from './server';

const logger = createLogger('bootstrap');

function bootstrapUnhandledErrorHandlers() {
    process
        .on('uncaughtException', (error) => {
            logger.error('uncaughtException', error);
            process.exit(1);
        })
        .on('unhandledRejection', (reason, promise) => {
            logger.error('unhandledRejection', reason, promise);
            process.exit(1);
        });
}

function bootstrapServer() {
    const librarianServer = new LibrarianServer();

    librarianServer.start();
}

logger.info(process.env.NODE_ENV);
bootstrapUnhandledErrorHandlers();
bootstrapServer();
