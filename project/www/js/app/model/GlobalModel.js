define([], function() {
  "use strict";
  var GlobalModel;
  GlobalModel = (function() {
    GlobalModel.prototype.routing = void 0;

    GlobalModel.prototype.isDesktop = void 0;

    GlobalModel.prototype.browser = void 0;

    GlobalModel.prototype.browserVersion = void 0;

    GlobalModel.prototype.isOldBrowser = false;

    GlobalModel.prototype.content = void 0;

    GlobalModel.prototype.parentEl = void 0;

    GlobalModel.prototype.interfaceEl = void 0;

    GlobalModel.prototype.env = void 0;

    GlobalModel.prototype.debugMode = void 0;

    GlobalModel.prototype.debugScene = false;

    GlobalModel.prototype.debugData = void 0;

    GlobalModel.prototype.oldHash = void 0;

    GlobalModel.prototype.newHash = void 0;

    GlobalModel.prototype.windowW = 0;

    GlobalModel.prototype.windowH = 0;

    function GlobalModel() {}

    return GlobalModel;

  })();
  return GlobalModel;
});
