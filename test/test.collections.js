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
    
    it("Resolves to the collection object on success", function (done) {
      var Users = createModels().Users;
      var users = new Users();
      users.fetch().then(function (res) {
        expect(res).to.be.equal(users);
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
    
    it("Resolves to collection object on failure", function (done) {
      var Users = createModels().FailCollection;
      var users = new Users();
      users.fetch().then(function () {
        expect(false).to.be.ok();
      }, function (res) {
        expect(res).to.be.equal(users);
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
