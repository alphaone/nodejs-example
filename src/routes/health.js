const express = require('express');

function getRouter() {
    const router = express.Router();
    router.get('/liveliness', (req, res, next) => res.json({ status: 'OK' }));
    router.get('/readiness', (req, res, next) => res.json({ status: 'OK' }));
    router.get('/error', (req, res, next) => {throw new Error("Intentional Error")});
    return router
}

module.exports = {getRouter};