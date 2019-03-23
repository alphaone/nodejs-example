const HttpStatusCodes = require('http-status-codes');

class ResponseError extends Error {
    constructor (message, code) {
        super(message);
        this.code = code
    }
}

class ServerError extends ResponseError {
    constructor(message) {
        super(message, HttpStatusCodes.INTERNAL_SERVER_ERROR)
    }
}

module.exports = {ResponseError, ServerError};