import { Children, ClassMiddleware, Controller } from '@overnightjs/core';

import idMiddleware from '../../middlewares/id';

import GoodreadsApiController from './Goodreads';

@Controller('api')
@ClassMiddleware([idMiddleware])
@Children([new GoodreadsApiController()])
export default class ApiController {}
