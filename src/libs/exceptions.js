/* @flow */

class HttpError extends Error {
	statusCode:number;
	constructor(statusCode:number, message?:string) {
		super(message);
		this.statusCode = statusCode;
	}
}

class BadRequestError extends HttpError {
	constructor(message?:string) {
		super(400, message);
	}
}

class InvalidRequestBodyError extends HttpError {
	constructor(message?:string) {
		super(400, message);
	}
}

class UnauthorizedError extends HttpError {
	constructor(message?:string) {
		super(401, message);
	}
}

class ExpiredResourceError extends HttpError {
	constructor(message?:string) {
		super(410, message);
	}
}

class InternalServerError extends HttpError {
	constructor(message?:string) {
		super(500, message);
	}
}

class ResourceNotFoundError extends HttpError {
	constructor(message?:string) {
		super(404, message);
	}
}

module.exports = {
	BadRequestError,
	InvalidRequestBodyError,
	UnauthorizedError,
	ExpiredResourceError,
	InternalServerError,
	ResourceNotFoundError
};