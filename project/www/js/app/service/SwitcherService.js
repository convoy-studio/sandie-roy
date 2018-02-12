// Define start - generated content
define(["RelationsPresse", "RelationsPubliques", "About", "Production", "Home"], function(RelationsPresse, RelationsPubliques, About, Production, Home) {
  var SwitcherService;
  // Define end - generated content
  SwitcherService = class SwitcherService {
    constructor() {
      this.init = this.init.bind(this);
      this.onRouteChanged = this.onRouteChanged.bind(this);
      this.prepareManifest = this.prepareManifest.bind(this);
      this.prepareView = this.prepareView.bind(this);
      this.pageLoaderTransitionInCompleted = this.pageLoaderTransitionInCompleted.bind(this);
      this.pageFilesLoaded = this.pageFilesLoaded.bind(this);
      this.onViewInitialized = this.onViewInitialized.bind(this);
      this.startTransition = this.startTransition.bind(this);
      this.continueNewViewTransition = this.continueNewViewTransition.bind(this);
      this.pageLoaderTransitionOutCompleted = this.pageLoaderTransitionOutCompleted.bind(this);
      this.createView = this.createView.bind(this);
      this.destroyViews = this.destroyViews.bind(this);
      ({
        newPage: void 0,
        newView: void 0,
        oldView: void 0,
        hist: void 0
      });
    }

    init() {
      this.hist = [];
      Signal.onRouteChanged.add(this.onRouteChanged);
    }

    onRouteChanged() {
      this.prepareManifest();
    }

    prepareManifest() {
      this.newPage = Router.getNewViewFromRoute(Model.newHash);
      this.prepareView();
    }

    prepareView() {
      this.pageLoaderTransitionInCompleted();
    }

    pageLoaderTransitionInCompleted() {
      var f, file, files, i, id, j, len, manifest, name, paths, type, url;
      files = this.newPage.files;
      if (files.length < 1) {
        this.pageFilesLoaded();
        return;
      }
      manifest = [];
      id = this.newPage.id;
      for (i = j = 0, len = files.length; j < len; i = ++j) {
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
    }

    pageFilesLoaded() {
      var Class, parent;
      parent = Model.mainEl;
      // Create Class from hash id 
      Class = require(this.newPage.clazz);
      // Update old view
      if (this.newView != null) {
        this.oldView = this.newView;
      }
      // Create view
      this.newView = this.createView(this.newPage.id, Class, this.newPage.scope);
      parent.append(this.newView.element);
      this.newView.init(this.onViewInitialized);
    }

    onViewInitialized() {
      TweenMax.delayedCall(0, this.newView.resize);
      TweenMax.delayedCall(0, this.newView.addAnimations);
      TweenMax.delayedCall(0, this.startTransition);
    }

    startTransition() {
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
    }

    continueNewViewTransition() {
      this.pageLoaderTransitionOutCompleted();
    }

    pageLoaderTransitionOutCompleted() {
      this.newView.transitionIn();
      this.destroyViews();
    }

    createView(id, Class, scope, assetsReadyCallback) {
      var view;
      view = new Class(id, scope, assetsReadyCallback);
      this.hist.push(view);
      return view;
    }

    destroyViews() {
      var destroyArray, i, j, ref, view;
      destroyArray = this.hist.splice(0, this.hist.length - 1);
      for (i = j = 0, ref = destroyArray.length - 1; undefined !== 0 && (0 <= ref ? 0 <= j && j <= ref : 0 >= j && j >= ref); i = 0 <= ref ? ++j : --j) {
        view = destroyArray[i];
        if (view != null) {
          view.destroy();
          view.element.remove();
        }
      }
    }

  };
  return SwitcherService;
});
