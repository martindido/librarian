import debug from 'debug';

import { createLogger } from '../src/commons/utils';

import LibrarianServer from './server';

if (process.env.SERVER_DEBUG) {
    debug.enable(process.env.SERVER_DEBUG);
}

const logger = createLogger('bootstrap');

logger.info('');

const librarianServer = new LibrarianServer();

librarianServer.start(5000);
