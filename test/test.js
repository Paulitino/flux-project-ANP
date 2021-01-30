const app = require("../backend/api");
const chai = require("chai");
const chaiHttp = require("chai-http");

const { expect } = chai;
chai.use(chaiHttp);
describe("Server!", () => {
  it("Homepage", done => {
    chai
      .request(app)
      .get("/")
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
  it("Getting all items from a flux", done => {
    chai
      .request(app)
      .get("/items")
      .then(function (res) {
          expect(res).to.have.status(200);
          done();
      })
      .catch(function (err) {
        expect(res).to.have.status(500);
        throw err;
        done();
     });
  });
  it("Getting all flux", done => {
    chai
      .request(app)
      .get("/flux")
      .then(function (res) {
          expect(res).to.have.status(200);
          done();
      })
      .catch(function (err) {
        expect(res).to.have.status(500);
        throw err;
        done();
     });
  });
});
