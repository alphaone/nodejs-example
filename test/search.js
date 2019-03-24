const chai = require('chai');
const nock = require('nock');
const HttpStatusCodes = require('http-status-codes');

chai.use(require('chai-http'));
const request = chai.request;
const expect = chai.expect;

const app = require('../src/api').app;
const apiPrefix = '/search';

nock('https://itunes.apple.com')
    .get(/^\/search/)
    .reply(200, '{"results":[{"artistName": "Weezer"}]}');

describe('/search', () => {
    it('renders html search result', async () => {
        const res = await request(app).get(`${apiPrefix}?q=something`);
        expect(res).to.have.status(HttpStatusCodes.OK);
        expect(res).to.be.html;
        expect(res.text).to.contain("Search Results");
        expect(res.text).to.contain("Weezer")
    });
});

nock('https://itunes.apple.com')
    .get(/^\/search/)
    .reply(404, 'Some strange error');

describe('/search', () => {
    it('renders html search result', async () => {
        const res = await request(app).get(`${apiPrefix}?q=something`);
        expect(res).to.have.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(res).to.be.json;
        expect(res.body.message).to.contain("Got error while calling itunes: Some strange error");
    });
});