const express = require('express');

const logger = require('morgan');
const bodyParser = require('body-parser');
const httpStatusCodes = require('http-status-codes');
const cors = require('cors');
const health = require('./routes/health');

const response = require("./errors/response");

class App {

    constructor() {
        this.express = express();
        this._middleware();
        this._routes();
    }

    _middleware() {
        this.express.use(logger('[asset-manager] :method :url :status :response-time ms - :res[content-length]'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors({optionsSuccessStatus: httpStatusCodes.OK}))
    }
    
    _routes() {
        this.express.use('/health/', health.getRouter());
        // ToDo add your routes here
        this.express.use(this._errorHandler.bind(this))
    }

    _errorHandler (err, req, res, next) {
        // bring the error into our format
        if (!(err instanceof response.ResponseError)) {
            err = new response.ServerError(err.message)
        }
        res.statusCode = err.code;
        res.json({ code: err.code, time: (new Date()).toISOString(), message: err.message })
    }
}

const app = new App();
module.exports = {app: app.express};