const app = require("../backend/api");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("Getting all items from a flux", done => {
    chai
    .request(app)
    .get("/items")
    .end(function (err, res) {
      if (err) done(err);
      else {
        expect(res).to.have.status(200);
        /* expect(res).to.have.header('content-type', 'text/html; charset=utf-8'); 
        expect(res.text).to.contain('Express'); */
        //expect(res.body.model).to.be.an('array');
        done();
      }
    });
  });
  it("Getting all flux", done => {
    chai
    .request(app)
    .get("/flux")
    .end(function (err, res) {
      if (err) done(err);
      expect(res).to.have.status(200);
      done();
    });
  });
});
