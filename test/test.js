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
        console.log(res.body.items[0])
        expect(res.body.items[0]).to.have.all.keys(['id', 'flux', 'title', 'link', 'description', 'publication', 'guid', 'isodate']);
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
