const express = require('express');
const SearchController = require('../controllers/search');

function getRouter() {
    const router = express.Router();
    router.get('', (req, res, next) => {
        let query = req.query.q;

        return SearchController.search(query).then(results => {
            return res.render('results.ejs', {results: results});
        }).catch(next)
    });
    return router
}

module.exports = {getRouter};