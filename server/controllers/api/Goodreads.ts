import { Controller, Get } from '@overnightjs/core';
import axios from 'axios';
import { Request, Response } from 'express';
import { xml2js } from 'xml-js';

import { createLogger } from '../../../src/commons/utils';
import GoodreadsClient from '../../clients/Goodreads';

@Controller('goodreads')
export default class GoodreadsApiController {
    constructor() {
        GoodreadsApiController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'api', 'goodreads']);

    protected static GOODREADS_HOST = 'https://www.goodreads.com';

    @Get('me')
    protected async getMe(req: Request, res: Response) {
        GoodreadsApiController.logger.info(`[${req.id}] getMe`);

        const goodreadsClient = new GoodreadsClient();

        try {
            const user = await goodreadsClient.getAuthUser(req.user.credentials);

            res.json(user);
        } catch (error) {
            GoodreadsApiController.logger.info(`[${req.id}] ${error}`);
            res.sendStatus(400);
        }
    }

    @Get('books/isbn/:isbn')
    protected async getByISBN(req: Request, res: Response) {
        GoodreadsApiController.logger.info(`[${req.id}] getMe (:isbn = ${req.params.isbn})`);
        try {
            const bookIdResponse = await axios.get(
                `https://www.goodreads.com/book/isbn/${req.params.isbn}?key=4DgGUgFPJmVjrIPYGaDRWQ`
            );

            return res.json(xml2js(bookIdResponse.data, { compact: true }));
        } catch (error) {
            GoodreadsApiController.logger.info(`[${req.id}] ${error}`);
            return res.sendStatus(error.response.status);
        }
    }
}
