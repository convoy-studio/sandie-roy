var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var Context;
  Context = (function() {
    function Context() {
      this.launchApp = __bind(this.launchApp, this);
      this.launchApp();
    }

    Context.prototype.launchApp = function() {
      Switcher.init();
      Router.setupRouting();
      Controller.setupViews();
      Controller.setupRenderer();
      Controller.startRouting();
    };

    return Context;

  })();
  return Context;
});
