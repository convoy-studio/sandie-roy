var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["RelationsPresse", "RelationsPubliques"], function(RelationsPresse, RelationsPubliques) {
  var SwitcherService;
  SwitcherService = (function() {
    function SwitcherService() {
      this.destroyViews = __bind(this.destroyViews, this);
      this.createView = __bind(this.createView, this);
      this.pageLoaderTransitionOutCompleted = __bind(this.pageLoaderTransitionOutCompleted, this);
      this.continueNewViewTransition = __bind(this.continueNewViewTransition, this);
      this.startTransition = __bind(this.startTransition, this);
      this.onViewInitialized = __bind(this.onViewInitialized, this);
      this.pageFilesLoaded = __bind(this.pageFilesLoaded, this);
      this.pageLoaderTransitionInCompleted = __bind(this.pageLoaderTransitionInCompleted, this);
      this.prepareView = __bind(this.prepareView, this);
      this.prepareManifest = __bind(this.prepareManifest, this);
      this.onRouteChanged = __bind(this.onRouteChanged, this);
      this.init = __bind(this.init, this);
      ({
        newPage: void 0,
        newView: void 0,
        oldView: void 0,
        hist: void 0
      });
    }

    SwitcherService.prototype.init = function() {
      this.hist = [];
      Signal.onRouteChanged.add(this.onRouteChanged);
    };

    SwitcherService.prototype.onRouteChanged = function() {
      this.prepareManifest();
    };

    SwitcherService.prototype.prepareManifest = function() {
      this.newPage = Router.getNewViewFromRoute(Model.newHash);
      this.prepareView();
    };

    SwitcherService.prototype.prepareView = function() {
      this.pageLoaderTransitionInCompleted();
    };

    SwitcherService.prototype.pageLoaderTransitionInCompleted = function() {
      var f, file, files, i, id, manifest, name, paths, type, url, _i, _len;
      files = this.newPage.files;
      if (files.length < 1) {
        this.pageFilesLoaded();
        return;
      }
      manifest = [];
      id = this.newPage.id;
      for (i = _i = 0, _len = files.length; _i < _len; i = ++_i) {
        file = files[i];
        url = file;
        paths = file.split("/");
        f = paths[paths.length - 1];
        name = f.split(".")[0];
        type = f.split(".")[1];
        manifest[i] = {
          id: this.newPage.id + "-" + name,
          src: url
        };
      }
      Loader.load(manifest, this.pageFilesLoaded);
    };

    SwitcherService.prototype.pageFilesLoaded = function() {
      var Class, parent;
      parent = Model.interfaceEl;
      Class = require(this.newPage.clazz);
      if (this.newView != null) {
        this.oldView = this.newView;
      }
      this.newView = this.createView(this.newPage.id, Class, this.newPage.scope);
      parent.append(this.newView.element);
      this.newView.init(this.onViewInitialized);
    };

    SwitcherService.prototype.onViewInitialized = function() {
      TweenMax.delayedCall(0, this.newView.resize);
      TweenMax.delayedCall(0, this.newView.addAnimations);
      TweenMax.delayedCall(0, this.startTransition);
    };

    SwitcherService.prototype.startTransition = function() {
      if (this.oldView != null) {
        if (this.oldView.transitionOutComplete != null) {
          this.oldView.transitionOutComplete.addOnce(this.continueNewViewTransition, this);
          this.oldView.transitionOut();
        } else {
          this.continueNewViewTransition();
        }
      } else {
        this.continueNewViewTransition();
      }
    };

    SwitcherService.prototype.continueNewViewTransition = function() {
      this.pageLoaderTransitionOutCompleted();
    };

    SwitcherService.prototype.pageLoaderTransitionOutCompleted = function() {
      this.newView.transitionIn();
      this.destroyViews();
    };

    SwitcherService.prototype.createView = function(id, Class, scope, assetsReadyCallback) {
      var view;
      view = new Class(id, scope, assetsReadyCallback);
      this.hist.push(view);
      return view;
    };

    SwitcherService.prototype.destroyViews = function() {
      var destroyArray, i, view, _i, _ref;
      destroyArray = this.hist.splice(0, this.hist.length - 1);
      for (i = _i = 0, _ref = destroyArray.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        view = destroyArray[i];
        if (view != null) {
          view.destroy();
          view.element.remove();
        }
      }
    };

    return SwitcherService;

  })();
  return SwitcherService;
});
