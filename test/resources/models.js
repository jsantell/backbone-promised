// Include GT Legacy for older browser tests
require("ghosttrain/legacy");

var Backbone = require("backbone");
var GhostTrain = require("ghosttrain");
var GhostTrainBackbone = require("ghosttrain-backbone");
var initRoutes = require("./router");
var BackbonePromised = require("../..");
var when = require("when");

function createModels () {
  var gt = new GhostTrain();
  initRoutes(gt);

  var User = Backbone.Model.extend(BackbonePromised(Backbone.Model.prototype, when.promise))
    .extend(GhostTrainBackbone(gt)).extend({
     urlRoot: '/users'
    });

  var Users = Backbone.Collection.extend(BackbonePromised(Backbone.Collection.prototype, when.promise))
    .extend(GhostTrainBackbone(gt)).extend({
      url: '/users',
      model: User
    });

  var FailCollection = Backbone.Collection.extend(BackbonePromised(Backbone.Collection.prototype, when.promise))
    .extend(GhostTrainBackbone(gt)).extend({
      url: '/fail',
      model: User
    });
  
  var FailUser = Backbone.Model.extend(BackbonePromised(Backbone.Model.prototype, when.promise))
    .extend(GhostTrainBackbone(gt)).extend({
      url: '/fail',
    });


  return {
    User: User,
    Users: Users,
    FailCollection: FailCollection,
    FailUser: FailUser
  };
}
exports.createModels = createModels;
