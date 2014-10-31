var createModels = require("./resources/models").createModels;
var Backbone = require("backbone");
var expect = require("expect.js");

describe("Backone Collection", function () {
  describe("Collection#fetch", function () {
    it("Resolves promise after collection is updated", function (done) {
      var Users = createModels().Users;
      var users = new Users();
      users.fetch().then(function (res) {
        expect(users.length).to.be.equal(4);
      }).then(done, done);
    });

    it("Resolves to the collection, response, options object on success", function (done) {
      var Users = createModels().Users;
      var users = new Users();
      users.fetch().then(function (res) {
        expect(res.collection).to.be.equal(users);
        expect(res.options.success).to.be.ok();
        expect(res.options.error).to.be.ok();
        expect(res.response[0].name).to.be.equal("Crono");
      }).then(done, done);
    });

    it("Rejects if fetch fails", function (done) {
      var Users = createModels().FailCollection;
      var users = new Users();
      users.fetch().then(function () {
        expect(false).to.be.ok();
      }, function () {
        expect(true).to.be.ok();
      }).then(done, done);
    });

    it("Resolves to collection, response, options object on failure", function (done) {
      var Users = createModels().FailCollection;
      var users = new Users();
      users.fetch().then(function () {
        expect(false).to.be.ok();
      }, function (res) {
        expect(res.collection).to.be.equal(users);
        expect(res.options.success).to.be.ok();
        expect(res.options.error).to.be.ok();
        expect(res.response).to.be.equal("Internal Server Error");
      }).then(done, done);
    });

    it("calls option.success callback", function (done) {
      var Users = createModels().Users;
      var users = new Users();
      var called = false;
      users.fetch({ success: success }).then(function () {
        expect(called).to.be.ok();
      }).then(done, done);

      function success () { called = true; }
    });

    it("calls option.error callback", function (done) {
      var Users = createModels().FailCollection;
      var users = new Users();
      var called = false;
      users.fetch({ error: error }).then(function () {
        expect(false).to.be.ok();
      }, function (res) {
        expect(called).to.be.ok();
      }).then(done, done);

      function error () { called = true; }
    });
  });
});
