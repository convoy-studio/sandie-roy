define([], function() {
  "use strict";
  var Context;
  Context = class Context {
    constructor() {
      this.launchApp = this.launchApp.bind(this);
      this.launchApp();
    }

    launchApp() {
      Switcher.init();
      Router.setupRouting();
      
      // Init DOM
      Controller.setupViews();
      // Setup Global 3D Objects
      Controller.setupRenderer();
      // Routing
      Controller.startRouting();
    }

  };
  return Context;
});
