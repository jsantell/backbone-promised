var createModels = require("./resources/models").createModels;
var Backbone = require("backbone");
var expect = require("expect.js");

describe("Backbone Model", function () {
  describe("Model#fetch", function () {
    it("Resolves promise after model is updated", function (done) {
      var User = createModels().User;
      var user = new User({ id: 1 });
      user.fetch().then(function (res) {
        expect(user.get("name")).to.be.equal("Crono");
      }).then(done, done);
    });

    it("Resolves to the model, response and options object on success", function (done) {
      var User = createModels().User;
      var user = new User({ id: 1 });
      user.fetch().then(function (res) {
        expect(res.model).to.be.equal(user);
        expect(res.options.success).to.be.ok();
        expect(res.options.error).to.be.ok();
        expect(res.response.name).to.be.equal("Crono");
      }).then(done, done);
    });

    it("Rejects if fetch fails", function (done) {
      var User = createModels().User;
      var user = new User({ id: 100 });
      user.fetch().then(function (res) {
        expect(false).to.be.ok();
      }, function () {
        expect(true).to.be.ok();
      }).then(done, done);
    });

    it("Resolves to model, response and options object on failure", function (done) {
      var User = createModels().User;
      var user = new User({ id: 100 });
      user.fetch().then(function (res) {
        expect(false).to.be.ok();
      }, function (res) {
        expect(res.model).to.be.equal(user);
        expect(res.options.success).to.be.ok();
        expect(res.options.error).to.be.ok();
        expect(res.response).to.be.equal("Internal Server Error");
      }).then(done, done);
    });
  });

  describe("Model#destroy", function () {
    it("Resolves promise after model is destroyed", function (done) {
      var User = createModels().User;
      var user = new User({ id: 1 });
      var called = false;

      user.on("destroy", function () {
        called = true;
      });

      user.fetch().then(function (res) {
        return user.destroy({wait: true});
      }).then(function (res) {
        expect(called).to.be.ok();
      }).then(done, done);
    });

    it("Resolves to the model, response, options object on success", function (done) {
      var User = createModels().User;
      var user = new User({ id: 1 });
      var called = false;

      user.on("destroy", function () {
        called = true;
      });

      user.fetch().then(function (res) {
        return user.destroy({ wait: true });
      }).then(function (res) {
        expect(res.model).to.be.equal(user);
        expect(res.options.success).to.be.ok();
        expect(res.options.error).to.be.ok();
        expect(res.response).to.be.equal("OK");
      }).then(done, done);
    });

    it("Rejects on destroy failure", function (done) {
      var User = createModels().User;
      var user = new User({ id: 1 });
      var called = false;

      user.fetch().then(function (res) {
        return user.destroy({ wait: true });
      }, done).then(function (res) {
        return user.destroy();
      }).then(function () {
        expect(false).to.be.ok();
      }, function (res) {
        expect(true).to.be.ok();
        done();
      });
    });
  });

  describe("Model#save", function () {
    it("Resolves promise after model is saved, hash-style save", function (done) {
      var User = createModels().User;
      var user = new User();
      user.save({ name: "Magus" }).then(function (res) {
        expect(user.isNew()).to.be.equal(false);
        expect(user.get("name")).to.be.equal("Magus");
        done();
      });
    });

    it("Resolves promise after model is saved, key-value save", function (done) {
      var User = createModels().User;
      var user = new User();
      user.save("name", "Magus").then(function (res) {
        expect(user.isNew()).to.be.equal(false);
        expect(user.get("name")).to.be.equal("Magus");
        done();
      });
    });
  });
});
