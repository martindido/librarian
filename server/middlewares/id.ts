import { NextFunction, Request, Response } from 'express';
import uuidv4 from 'uuid/v4';

export default function idMiddleware(req: Request, res: Response, next: NextFunction) {
    req.id = uuidv4();
    next();
}
