const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

let app = require('../server');

chai.use(chaiHttp);

describe("GET for /api/users", () => {
    test("It should receive all users from the server", (done) => {
        chai
            .request(app)
            .get('/api/users')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res.status).to.be.equal(200);
                expect(res.body).to.be.an("object");
                done();
            })
    })
});