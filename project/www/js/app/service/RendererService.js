var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var RendererService;
  RendererService = (function() {
    function RendererService() {
      this.resize = __bind(this.resize, this);
      this.init = __bind(this.init, this);
    }

    RendererService.prototype.init = function() {
      this.resize();
    };

    RendererService.prototype.resize = function() {};

    return RendererService;

  })();
  return RendererService;
});
