const chai = require('chai');
const HttpStatusCodes = require('http-status-codes');
const app = require('../src/api').app;

chai.use(require('chai-http'));
const request = chai.request;
const expect = chai.expect;

const apiPrefix = '/search';

describe('/search', () => {
    it('renders html search result', async () => {
        const res = await request(app).get(`${apiPrefix}?q=weezer`);
        expect(res).to.have.status(HttpStatusCodes.OK);
        expect(res).to.be.html;
        expect(res.text).to.contain("Search Results")
        expect(res.text).to.contain("Weezer")
    });
});