// import {Request , Response , NextFunction} from 'express';

export class AppError extends Error {
    statusCode;
    isoperational;

    constructor(message, statusCode = 500, isOperational = true) {
        super(message);
        this.statusCode = statusCode;
        this.isoperational = isOperational; 
        Error.captureStackTrace(this, this.constructor);
    }
}

export const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
    }

    console.error(err);
    res.status(500).json({
        success: false,
        message: err && err.message ? err.message : "Internal Server Error",
    });
};

export class NotFoundError extends AppError {
    constructor(message = "Resource not found") {
        super(message, 404);
    }
}

export class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
        super(message, 400);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
        super(message, 401);
    }
}

export const ConflictError = (message = "Conflict") => {
    return new AppError(message, 409);
};