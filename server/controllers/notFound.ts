import { ClassMiddleware, Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { Request, Response } from 'express';

import idMiddleware from '../middlewares/id';

@Controller('*')
@ClassMiddleware([idMiddleware])
export default class NotFoundController {
    @Get()
    protected async notFound(req: Request, res: Response) {
        Logger.Err(`[${req.id}] Called notFound for ${req.baseUrl}`);
        return res.sendStatus(404);
    }
}
