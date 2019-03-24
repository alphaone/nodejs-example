const express = require('express');

const logger = require('morgan');
const bodyParser = require('body-parser');
const httpStatusCodes = require('http-status-codes');
const sass = require('node-sass-middleware');
const path = require('path');
const cors = require('cors');
const health = require('./routes/health');

const search = require('./routes/search');

const response = require("./errors/response");


class App {

    constructor() {
        this.express = express();
        this._setup();
        this._middleware();
        this._routes();
    }

    _setup() {
        this.express.set('view engine', 'pug');
        this.express.use(
            sass({
                src: path.join(__dirname, '/../sass'),
                dest: path.join(__dirname, '/../public/css'),
                debug: true,
                prefix: '/public/css'
            })
        );
        this.express.use('/public', express.static(path.join(__dirname, '/../public')));
    }

    _middleware() {
        this.express.use(logger('combined'));
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({extended: false}));
        this.express.use(cors({optionsSuccessStatus: httpStatusCodes.OK}))
    }

    _routes() {
        this.express.use('/health', health.getRouter());
        this.express.use('/search', search.getRouter());
        // ToDo add your routes here
        this.express.use(this._errorHandler.bind(this))
    }

    _errorHandler(err, req, res, next) {
        // bring the error into our format
        if (!(err instanceof response.ResponseError)) {
            err = new response.ServerError(err.message)
        }
        res.statusCode = err.code;
        res.json({code: err.code, time: (new Date()).toISOString(), message: err.message})
    }
}

const app = new App();
module.exports = {app: app.express};