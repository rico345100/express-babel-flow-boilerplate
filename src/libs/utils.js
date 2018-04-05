/* @flow */
const bcrypt = require('bcrypt-nodejs');
const fs = require('fs');
const validator = require('validator');
const {
	BadRequestError, 
	InvalidRequestBodyError, 
	UnauthorizedError, 
	ExpiredResourceError, 
	InternalServerError, 
	ResourceNotFoundError
} = require('../libs/exceptions');

function checkHasNull(data:any, fields:any): Promise<void|Error> {
	return new Promise((resolve, reject) => {
		if(typeof data === 'undefined') {
			return reject(new InvalidRequestBodyError('Received Body'));
		}

		for(var i = 0; i < fields.length; i++) {
			let field = fields[i];

			if(typeof data[field] === 'undefined') {
				return reject(new InvalidRequestBodyError(field + ' is required.'));
			}
			else if(typeof data[field] === 'string' && validator.isNull(data[field])) {
				return reject(new InvalidRequestBodyError(field + ' is required.'));
			}
		}

		resolve();
	});
}

function generateHash(password:string): Promise<string|Error> {
	return new Promise((resolve, reject) => {
		bcrypt.hash(password, null, null, (err, hash) => {
			if(err) {
				return reject(err);
			}

			resolve(hash);
		});
	});
}

function compareHash(password:string, hash:string): Promise<bool|Error> {
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, hash, (err, result) => {
			if(err) {
				reject(err);
			}

			resolve(result);
		});
	});
}

/**
 * Return proper status code
 * If your target node platform doesn't support class, babel will transpile class to constructor,
 * so this function will not work. Use Error.status property instead.
 * @param {Error} error 
 */
function getStatusCode(error:Error):number {
	if(error instanceof InvalidRequestBodyError) 
		return 400;
	else if(error instanceof BadRequestError)
		return 400;
	else if(error instanceof UnauthorizedError)
		return 401;
	else if(error instanceof ResourceNotFoundError)
		return 404; 
	else if(error instanceof ExpiredResourceError)
		return 410;
	
	return 500;
}

module.exports = {
	checkHasNull,
	generateHash,
	compareHash,
	getStatusCode
};