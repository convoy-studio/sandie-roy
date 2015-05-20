var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["hasher"], function(hasher) {
  "use strict";
  var RouterService;
  RouterService = (function() {
    function RouterService() {
      this.getNewViewFromRoute = __bind(this.getNewViewFromRoute, this);
      this.getBaseURL = __bind(this.getBaseURL, this);
      this.sendTo = __bind(this.sendTo, this);
      this.sendToDefault = __bind(this.sendToDefault, this);
      this.pageChanged = __bind(this.pageChanged, this);
      this.onRouteChanged = __bind(this.onRouteChanged, this);
      this.configHasher = __bind(this.configHasher, this);
      this.createRoute = __bind(this.createRoute, this);
      this.setupRouting = __bind(this.setupRouting, this);
    }

    RouterService.prototype.setupRouting = function() {
      var k, ks, routes, scope, v, vs, _ref, _ref1;
      routes = [];
      _ref = Model.routing;
      for (k in _ref) {
        v = _ref[k];
        _ref1 = Model.pageScope;
        for (ks in _ref1) {
          vs = _ref1[ks];
          if (k === ks) {
            scope = vs;
          }
        }
        routes.push(this.createRoute(k, k, scope, v.files, v["global-color"]));
      }
      Model.routing = routes;
    };

    RouterService.prototype.createRoute = function(id, route, scope, files, color) {
      var r;
      r = {};
      r.id = id;
      r.clazz = Util.ConvertToClassName(id);
      r.route = route;
      r.scope = scope;
      r.files = files;
      r.color = color;
      return r;
    };

    RouterService.prototype.configHasher = function() {
      hasher.prependHash = '/';
      hasher.changed.add(this.onRouteChanged);
      hasher.initialized.add(this.onRouteChanged);
      hasher.init();
    };

    RouterService.prototype.onRouteChanged = function(newHash) {
      var newHashFounded, r, _i, _len, _ref;
      Model.gallery = void 0;
      newHashFounded = false;
      _ref = Model.routing;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        if (newHash === r.route) {
          Model.newHash = r.route;
          newHashFounded = true;
          this.pageChanged();
        }
      }
      if (!newHashFounded) {
        this.sendToDefault();
      }
    };

    RouterService.prototype.pageChanged = function() {
      Signal.onRouteChanged.dispatch();
    };

    RouterService.prototype.sendToDefault = function() {
      hasher.setHash("home");
    };

    RouterService.prototype.sendTo = function(id) {
      hasher.setHash(id);
    };

    RouterService.prototype.getBaseURL = function() {
      return document.URL.split("#")[0];
    };

    RouterService.prototype.getNewViewFromRoute = function(newHash) {
      var r, view, _i, _len, _ref;
      view = void 0;
      _ref = Model.routing;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        r = _ref[_i];
        if (r.route === newHash) {
          view = r;
          return view;
          break;
        }
      }
    };

    return RouterService;

  })();
  return RouterService;
});
