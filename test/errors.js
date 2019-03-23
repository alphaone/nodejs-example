const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatusCodes = require('http-status-codes');
const app = require('../src/api').app;

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

describe('errors', () => {
    it('get 404', async () => {
        const res = await request(app).get('/nothing-here');
        expect(res).to.have.status(HttpStatusCodes.NOT_FOUND);
    });
    it('get 500', async () => {
        const res = await request(app).get('/health/error');
        expect(res).to.have.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
        expect(res.body.message).to.eql('Intentional Error');
    })
});