import { Request, Response, NextFunction } from 'express';

export const allCattles = async (req: Request, res: Response, next: NextFunction) => {

  try {
    res.status(200).json({
      message: 'fetch cattles',
    });
  } catch (err) {
    next(err);
  }

};


export const createCattle = async (req: Request, res: Response, next: NextFunction) => {

  try {
    res.status(200).json({
      message: 'create cattles',
    });
  } catch (err) {
    next(err);
  }

};
