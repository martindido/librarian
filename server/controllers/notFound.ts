import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { NOT_FOUND } from 'http-status-codes';

import { createLogger } from '../../src/commons/utils';
import idMiddleware from '../middlewares/id';

@Controller('*')
@ClassMiddleware([idMiddleware])
export default class NotFoundController {
    constructor() {
        NotFoundController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'NotFoundController']);

    @Get()
    protected async notFound(req: Request, res: Response) {
        NotFoundController.logger.info('notFound');
        return res.sendStatus(NOT_FOUND);
    }
}
