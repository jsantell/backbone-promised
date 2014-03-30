var Backbone = require("backbone");
var GhostTrain = require("ghosttrain");
var GhostTrainBackbone = require("ghosttrain-backbone");
var initRoutes = require("./router");
var BackbonePromised = require("../..");
var when = require("when");

function createModels () {
  var gt = new GhostTrain();
  initRoutes(gt);

  var User = Backbone.Model.extend(BackbonePromised(Backbone.Model.prototype, when.promise)).extend({
    urlRoot: '/users',
    sync: GhostTrainBackbone(gt)
  });

  var Users = Backbone.Collection.extend(BackbonePromised(Backbone.Collection.prototype, when.promise)).extend({
    url: '/users',
    sync: GhostTrainBackbone(gt),
    model: User
  });

  var FailCollection = Backbone.Collection.extend(BackbonePromised(Backbone.Collection.prototype, when.promise)).extend({
    url: '/fail',
    sync: GhostTrainBackbone(gt),
    model: User
  });
  
  var FailUser = Backbone.Model.extend(BackbonePromised(Backbone.Model.prototype, when.promise)).extend({
    url: '/fail',
    sync: GhostTrainBackbone(gt)
  });


  return {
    User: User,
    Users: Users,
    FailCollection: FailCollection,
    FailUser: FailUser
  };
}
exports.createModels = createModels;
