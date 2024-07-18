import { Request, Response, NextFunction } from "express";
// import { HttpException } from "../exceptions";

export const errorHandler = (   
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = err.status || 500;
  const response = {
    status,
    error: err.error || "Internal Server Error",
    message: err.message || "An error occurred",
  };
  if (err.cause) {
    response["cause"] = err.cause;
  }
  res.status(status).json(response);
};
