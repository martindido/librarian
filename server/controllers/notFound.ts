import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

import { createLogger } from '../../src/commons/utils';
import idMiddleware from '../middlewares/id';

@Controller('*')
@ClassMiddleware([idMiddleware])
export default class NotFoundController {
    constructor() {
        NotFoundController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'auth', 'notFound']);

    @Get()
    protected async notFound(req: Request, res: Response) {
        NotFoundController.logger.info('notFound');
        return res.sendStatus(404);
    }
}
