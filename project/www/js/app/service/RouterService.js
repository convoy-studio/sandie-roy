define(["hasher"], function(hasher) {
  "use strict";
  var RouterService;
  RouterService = class RouterService {
    constructor() {
      this.setupRouting = this.setupRouting.bind(this);
      this.createRoute = this.createRoute.bind(this);
      this.configHasher = this.configHasher.bind(this);
      this.onRouteChanged = this.onRouteChanged.bind(this);
      this.pageChanged = this.pageChanged.bind(this);
      this.sendToDefault = this.sendToDefault.bind(this);
      this.sendTo = this.sendTo.bind(this);
      this.getBaseURL = this.getBaseURL.bind(this);
      this.getNewViewFromRoute = this.getNewViewFromRoute.bind(this);
    }

    setupRouting() {
      var k, ks, ref, ref1, routes, scope, v, vs;
      routes = [];
      ref = Model.routing;
      for (k in ref) {
        v = ref[k];
        ref1 = Model.pageScope;
        for (ks in ref1) {
          vs = ref1[ks];
          if (k === ks) {
            scope = vs;
          }
        }
        routes.push(this.createRoute(k, k, scope, v.files));
      }
      Model.routing = routes;
    }

    createRoute(id, route, scope, files) {
      var r;
      r = {};
      r.id = id;
      r.clazz = Util.ConvertToClassName(id);
      r.route = route;
      r.scope = scope;
      r.files = files;
      return r;
    }

    configHasher() {
      hasher.prependHash = '/';
      hasher.changed.add(this.onRouteChanged);
      hasher.initialized.add(this.onRouteChanged);
      hasher.init();
    }

    onRouteChanged(newHash) {
      var i, len, newHashFounded, r, ref;
      Model.gallery = void 0;
      newHashFounded = false;
      ref = Model.routing;
      for (i = 0, len = ref.length; i < len; i++) {
        r = ref[i];
        if (newHash === r.route) {
          Model.newHash = r.route;
          newHashFounded = true;
          this.pageChanged();
        }
      }
      if (!newHashFounded) {
        this.sendToDefault();
      }
    }

    pageChanged() {
      Signal.onRouteChanged.dispatch();
    }

    sendToDefault() {
      hasher.setHash("home");
    }

    sendTo(id) {
      hasher.setHash(id);
    }

    getBaseURL() {
      return document.URL.split("#")[0];
    }

    getNewViewFromRoute(newHash) {
      var i, len, r, ref, view;
      view = void 0;
      ref = Model.routing;
      for (i = 0, len = ref.length; i < len; i++) {
        r = ref[i];
        if (r.route === newHash) {
          view = r;
          return view;
          break;
        }
      }
    }

  };
  return RouterService;
});
