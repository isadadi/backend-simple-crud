import { Request, Response, NextFunction } from "express";

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

export const errorHandler = (
  err: ApiError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).send({
    status: err.status,
    message: err.message,
  });
};
