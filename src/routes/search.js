const express = require('express');
const SearchController = require('../controllers/search');

function getRouter() {
    const router = express.Router();
    router.get('', (req, res, next) => {
        let query = req.query.q;

        if (query !== undefined && query.length > 0) {
            return SearchController.search(query).then(results => {
                return res.render('results', {query: query ,results: results});
            }).catch(next)
        } else {
            res.render('results', {query: undefined ,results: []});
        }
    });
    return router
}

module.exports = {getRouter};