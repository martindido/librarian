import axios from 'axios';

import { createLogger } from '../utils';

const logger = createLogger(['clients', 'goodreads']);

export default class GoodreadsClient {
    private static readonly GOODREADS_AUTH_HOST = 'http://www.librarian.world:5000';
    private static readonly GOODREADS_AUTH_BASE_PATH = '/auth/goodreads';
    private static readonly GOODREADS_API_BASE_PATH = '/api/goodreads';

    public signIn = () => {
        logger.info('signIn');

        window.location.href = `${GoodreadsClient.GOODREADS_AUTH_HOST}${GoodreadsClient.GOODREADS_AUTH_BASE_PATH}`;
    }

    public signOut = async () => {
        logger.info('signOut');

        const response = await axios.delete(`${GoodreadsClient.GOODREADS_AUTH_BASE_PATH}`);

        return response.data;
    }

    public getMe = async () => {
        logger.info('getMe');

        const response = await axios.get(`${GoodreadsClient.GOODREADS_API_BASE_PATH}/me`);

        return response.data;
    }

    public getShelves = async () => {
        logger.info('getShelves');

        const response = await axios.get(`${GoodreadsClient.GOODREADS_API_BASE_PATH}/shelves`);

        return response.data;
    }

    public getBookByISBN = async (isbn: number) => {
        logger.info('getBookByISBN');

        const response = await axios.get(`${GoodreadsClient.GOODREADS_API_BASE_PATH}/books/isbn/${isbn}`);

        return response.data.GoodreadsResponse.book;
    }
}
