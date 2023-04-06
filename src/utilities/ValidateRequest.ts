import { Request, Response, NextFunction }  from  'express';
import RequestValidators  from  '../interfaces/RequestValidators';
import { ZodError } from 'zod';
export  const  validateRequest = (validators: RequestValidators )  =>  {
  return async (req: Request, res: Response, next: NextFunction)  =>  {
    try {
      if (validators.params) req.params = await validators.params.parseAsync(req.params);
      if (validators.query) req.query = await validators.query.parseAsync(req.query);
      if (validators.body) req.body = await validators.body.parseAsync(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(422).json({
          message: err.message,
          errors: err.errors,
        });
      }
      next(err);
    }
  };

};
