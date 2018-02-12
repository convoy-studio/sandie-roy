define([], function() {
  "use strict";
  var GlobalModel;
  GlobalModel = (function() {
    class GlobalModel {
      constructor() {}

    };

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

    GlobalModel.prototype.colorState = "white";

    GlobalModel.prototype.gridPartW = 214;

    GlobalModel.prototype.gridMargin = 15;

    GlobalModel.prototype.blankImg = "//:0";

    GlobalModel.prototype.personBaseSize = {
      w: 400,
      h: 320
    };

    GlobalModel.prototype.mobile = 750;

    return GlobalModel;

  }).call(this);
  return GlobalModel;
});
