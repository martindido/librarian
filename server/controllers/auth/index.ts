import { Children, ClassMiddleware, Controller } from '@overnightjs/core';

import { createLogger } from '../../../src/commons/utils';
import idMiddleware from '../../middlewares/id';

import GoodreadsAuthController from './Goodreads';

@Controller('auth')
@ClassMiddleware([idMiddleware])
@Children([new GoodreadsAuthController()])
export default class AuthController {
    constructor() {
        AuthController.logger.info('');
    }

    private static logger = createLogger(['controllers', 'auth']);
}
