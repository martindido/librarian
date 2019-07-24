import { Children, ClassMiddleware, Controller } from '@overnightjs/core';

import idMiddleware from '../../middlewares/id';

import GoodreadsAuthController from './Goodreads';

@Controller('auth')
@ClassMiddleware([idMiddleware])
@Children([new GoodreadsAuthController()])
export default class AuthController {}
