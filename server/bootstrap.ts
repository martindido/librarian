import debug from 'debug';

import { Logger } from '../src/commons/types/Logger';
import { createLogger } from '../src/commons/utils';

import LibrarianServer from './server';

let logger: Logger;

function bootstrapLogger() {
    if (process.env.SERVER_DEBUG) {
        debug.enable(process.env.SERVER_DEBUG);
    }
    logger = createLogger('bootstrap');
    logger.info('');
}

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

bootstrapLogger();
bootstrapUnhandledErrorHandlers();
bootstrapServer();
