const chai = require('chai');
const chaiHttp = require('chai-http');
const HttpStatusCodes = require('http-status-codes');
const app = require('../src/api').app;

chai.use(chaiHttp);
const request = chai.request;
const expect = chai.expect;

const apiPrefix = '/health';

describe('/health', () => {
    it('get liveliness', async () => {
        const res = await request(app).get(`${apiPrefix}/liveliness`);
        expect(res).to.have.status(HttpStatusCodes.OK);
        expect(res).to.be.json;
        expect(res.body.status).to.equal('OK')
    });
    it('get readiness', async () => {
        const res = await request(app).get(`${apiPrefix}/readiness`);
        expect(res).to.have.status(HttpStatusCodes.OK);
        expect(res).to.be.json;
        expect(res.body.status).to.equal('OK')
    })
});