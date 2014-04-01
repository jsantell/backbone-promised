# backbone-promised

[![browser support](https://ci.testling.com/jsantell/backbone-promised.png)](https://ci.testling.com/jsantell/backbone-promised)

[![Build Status](https://travis-ci.org/jsantell/backbone-promised.png)](https://travis-ci.org/jsantell/backbone-promised)

Wraps up Backbone's sync/XHR functions (`Backbone.Model`'s `save`, `fetch`, `destroy` and `Backbone.Collection`'s `fetch`) as promises. If using the native response from these methods, on success, they return a jQuery XHR promisable, on failure a falsy value. This eliminates the need to check to see if it's thennable. Another advantage is these promises return on `options.success` or `options.error`, rather than just the XHR response, so when the modified promises resolve, you can be sure that the collection or model is also updated by that time.

## Install

`npm install backbone-promised`

## Usage

### `BackbonePromised(prototype, resolver)`

`BackbonePromised` takes two arguments; first a prototype (or object) with the methods that
should be extended (`save`, `fetch`, `destroy`). Generally this will be `Backbone.Model.prototype`, but can be any object. The second argument is a Promise resolver so you can use any promise library, as long as you pass in a function that is called with a resolver function, like [when.promise](https://github.com/cujojs/when/blob/master/docs/api.md#whenpromise).

```javascript
var Backbone = require("backbone");
var BackbonePromised = require("backbone-promised");
var when = require("when");
var Model = Backbone.Model.extend(BackbonePromised(Backbone.model.prototype, when.promise));

var user = new Model({ name: "Dash Rendar" });
user.save().then(function (model) {
  console.log("success!");
}, function (model) {
  console.error("rejected!");
});
```

## License

MIT License
