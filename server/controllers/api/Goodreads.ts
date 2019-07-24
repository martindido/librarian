import { Controller, Get } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import axios from 'axios';
import { Request, Response } from 'express';
import { xml2js } from 'xml-js';

import GoodreadsClient from '../../clients/Goodreads';

@Controller('goodreads')
export default class GoodreadsApiController {
    protected static GOODREADS_HOST = 'https://www.goodreads.com';

    @Get('me')
    protected async getMe(req: Request, res: Response) {
        Logger.Info(`[${req.id}] Called getMe`);

        const goodreadsClient = new GoodreadsClient();

        try {
            const user = await goodreadsClient.getAuthUser(req.user.credentials);

            res.json(user);
        } catch (err) {
            Logger.Err(`[${req.id}] ${err}`);
            res.sendStatus(400);
        }
    }

    @Get('books/isbn/:isbn')
    protected async getByISBN(req: Request, res: Response) {
        Logger.Info(`[${req.id}] Called getByISBN with :isbn = ${req.params.isbn}`);
        try {
            const bookIdResponse = await axios.get(
                `https://www.goodreads.com/book/isbn/${req.params.isbn}?key=4DgGUgFPJmVjrIPYGaDRWQ`
            );

            return res.json(xml2js(bookIdResponse.data, { compact: true }));
        } catch (err) {
            Logger.Err(`[${req.id}] ${err}`);
            return res.sendStatus(err.response.status);
        }
    }
}
