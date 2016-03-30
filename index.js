var _ = require("underscore");
var methods = ["fetch", "save", "destroy"];

module.exports = function Promised (Base, Promise) {
  var model = {};
  return _.reduce(_.filter(methods, isPropertyOf(Base)), methodExtend(Base, Promise), model);
};

function methodExtend (Base, Promise) {
  return function (agg, method) {
    agg[method] = function (key, value, _options) {
      var model = this;

      var parsed = parseArgs(method, key, value, _options);
      var options = parsed.options;
      var attrs = parsed.attrs;

      // Wrap up our callbacks
      var success = options.success;
      var error = options.error;

      return Promise(function (resolve, reject) {
        options.success = overrideCallback(success, resolve);
        options.error = overrideCallback(error, reject);

        Base[method].apply(model, method === "save" ? [attrs, options] : [options]);
      });
    };
    return agg;
  };
}

/**
 * Takes an optional `callback` and a fulfillment or rejection
 * `resolver`. Returns a function to be ultimately passed into
 * Backbone.ajax's XHR options as `error` or `success`. Resolves
 * upon calling the returned function via `resolver` with
 * an object representing jQuery's XHR promise signature.
 *
 * @param {Function} callback
 * @param {Function} resolver
 * @return {Function}
 */
function overrideCallback (callback, resolver) {
  return function (model, response, options) {
    if (callback) callback.apply(model, arguments);
    resolver({ model: model, response: response, options: options, collection: model.collection || model });
  };
}

/**
 * Accepts an argument `obj` and returns a function
 * that accepts an argument returning whether or not the argument
 * is a property of the original `obj`.
 *
 * @param {Object} obj
 * @return {Function}
 */
function isPropertyOf (obj) {
  return function (prop) { return !!obj[prop]; };
}

/**
 * Normalizes the finding of the options object
 * between method calls, returning an object with
 * `attrs` and `options` properties. For `fetch` and `destroy`,
 * the `attrs` property will be undefined.
 *
 * @param {String} method
 * @param {Mixed} key
 * @param {Mixed} value
 * @param {Object} _options
 * @return {Object}
 */
function parseArgs (method, key, value, _options) {
  var attrs, options;

  // Find the options object for `save`
  if (method === "save") {
    if (key == null || typeof key === 'object') {
      attrs = key;
      options = value;
    } else {
      (attrs = {})[key] = value;
      options = _options;
    }
  } else {
    options = key;
  }

  // Duplicate options or create an empty object
  options = options ? _.clone(options) : {};

  return { attrs: attrs, options: options };
}

