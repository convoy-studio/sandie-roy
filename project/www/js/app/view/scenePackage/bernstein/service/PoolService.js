var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["RibbonCurve", "Quad"], function(RibbonCurve, Quad) {
  "use strict";
  var PoolService;
  PoolService = (function() {
    PoolService.prototype.op = void 0;

    PoolService.prototype.Mesh = void 0;

    PoolService.prototype.ribbonCurves = void 0;

    PoolService.prototype.Quad = void 0;

    function PoolService() {
      this.init = __bind(this.init, this);
    }

    PoolService.prototype.init = function() {
      this.op = window.ObjectPool;
      this.Mesh = this.op.generate(THREE.Mesh, {
        count: 1000
      });
      this.ribbonCurves = this.op.generate(RibbonCurve, {
        count: 1000
      });
      this.Quad = this.op.generate(Quad, {
        count: 4050
      });
    };

    return PoolService;

  })();
  return PoolService;
});
