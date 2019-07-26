import { Children, ClassMiddleware, Controller } from '@overnightjs/core';

import { createLogger } from '../../../src/commons/utils';
import idMiddleware from '../../middlewares/id';

import GoodreadsApiController from './Goodreads';

@Controller('api')
@ClassMiddleware([idMiddleware])
@Children([new GoodreadsApiController()])
export default class ApiController {
    constructor() {
        ApiController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'ApiController']);
}
