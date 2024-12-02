import { ErrorRequestHandler, Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';
import { Prisma } from '@prisma/client'; // Import Prisma errors
import { TErrorSources } from '../interface/error';
import handleZodError from './handleZodError';
import AppError from './AppError';
import config from '../../config';
import { extractPrismaErrorMessage } from './extractPrismaErrorMessage';

const handleGlobalError: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  next: NextFunction,
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';
  let errorSources: TErrorSources = [];

  // Handle Zod validation errors
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;

    // Handle custom application errors
  } else if (err instanceof AppError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];

    // Handle Prisma errors
  } else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // Known errors (e.g., unique constraint violations, invalid field names)
    statusCode = 400; // Bad Request
    message = `Prisma Error: ${err.message}`;
    errorSources = [
      {
        path: err.meta?.target || '', // Field causing the issue (if provided)
        message: err.message,
      },
    ];
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    // Extract only the meaningful part of the Prisma error message
    message = extractPrismaErrorMessage(err.message);
    statusCode = 422; // Unprocessable Entity
    errorSources = [
      {
        path: '', // You can populate this if a specific field is available
        message,
      },
    ];

    // Handle other Prisma error types if needed
  } else if (err instanceof Prisma.PrismaClientUnknownRequestError) {
    // Unknown request errors
    statusCode = 500;
    message = 'An unknown error occurred while interacting with the database';
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];
  } else if (err instanceof Prisma.PrismaClientInitializationError) {
    // Initialization errors (e.g., unable to connect to the database)
    statusCode = 500;
    message = 'Database initialization error';
    errorSources = [
      {
        path: '',
        message: err.message,
      },
    ];

    // Handle generic JavaScript errors
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  // Respond with the error
  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    stack: config.node_Env === 'development' ? err.stack : '', // Show stack trace only in development
  });
};

export default handleGlobalError;
