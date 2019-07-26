import { NextFunction, Request, Response } from 'express';
import uuidv4 from 'uuid/v4';

import { createLogger } from '../../src/commons/utils';

const logger = createLogger(['middlewares', 'idMiddleware']);

export default function idMiddleware(req: Request, res: Response, next: NextFunction) {
    req.id = uuidv4();
    logger.info('idMiddleware', req.id);
    next();
}
