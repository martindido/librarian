import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, NOT_FOUND } from 'http-status-codes';

import { createLogger } from '../../../src/commons/utils';
import GoodreadsClient from '../../clients/Goodreads';

@Controller('goodreads')
export default class GoodreadsApiController {
    constructor() {
        GoodreadsApiController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'api', 'goodreads']);

    @Get('me')
    protected async getMe(req: Request, res: Response): Promise<Response> {
        GoodreadsApiController.logger.info(req.id, 'getMe');

        try {
            const goodreadsClient = new GoodreadsClient(req.user.credentials);
            const user = await goodreadsClient.getAuthUser();

            return res.json(user);
        } catch (error) {
            GoodreadsApiController.logger.error(req.id, 'getMe', error);
            return res.sendStatus(INTERNAL_SERVER_ERROR);
        }
    }

    @Get('shelves')
    protected async getShelves(req: Request, res: Response): Promise<Response> {
        GoodreadsApiController.logger.info(req.id, 'getShelves');

        try {
            const goodreadsClient = new GoodreadsClient(req.user.credentials);
            const shelves = await goodreadsClient.getShelves();

            return res.json(shelves);
        } catch (error) {
            GoodreadsApiController.logger.error(req.id, 'getShelves', error);
            return res.sendStatus(NOT_FOUND);
        }
    }

    @Get('books/isbn/:isbn')
    protected async getBookByISBN(req: Request, res: Response): Promise<Response> {
        GoodreadsApiController.logger.info(req.id, 'getBookByISBN', req.params);

        try {
            const goodreadsClient = new GoodreadsClient(req.user.credentials);
            const book = await goodreadsClient.getBookByISBN(req.params.isbn);

            return res.json(book);
        } catch (error) {
            GoodreadsApiController.logger.error(req.id, 'getBookByISBN', error);
            return res.sendStatus(NOT_FOUND);
        }
    }
}
