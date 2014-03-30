var _ = require("underscore");

module.exports = function initRoutes (gt) {
  var users = [
    { id: 1, name: "Crono" },
    { id: 2, name: "Marle" },
    { id: 3, name: "Lucca" },
    { id: 4, name: "Frog" }
  ];

  gt.get('/fail', function (req, res) {
    res.send(500);
  });

  gt.get('/users', function (req, res) {
    res.json(users);
  });

  gt.get('/users/:id', function (req, res) {
    var user = _.filter(users, function (user) { return user.id === +req.params.id; }).pop();
    res.send(user || 500);
  });

  gt.post('/users', function (req, res) {
    var user = req.body;
    user.id = _.uniqueId();
    users.push(user);
    res.send(user);
  });

  gt.put('/users/:id', function (req, res) {
    var user = _.filter(users, function (user) { return user.id === +req.params.id; }).pop();
    if (user) {
      _.extend(user, req.body);
      res.send(200);
    } else {
      res.send(500);
    }
  });

  gt['delete']('/users/:id', function (req, res) {
    var user = _.findWhere(users, { id: +req.params.id });
    if (!user)
      res.send(500);
    else {
      var index = users.indexOf(user);
      users.splice(index, 1);
      res.send(200);
    }
  });
};
