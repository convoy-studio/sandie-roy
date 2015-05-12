var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var BinLoader;
  BinLoader = (function() {
    BinLoader.prototype.id = void 0;

    BinLoader.prototype.callback = void 0;

    function BinLoader() {
      this.onLoadCompleted = __bind(this.onLoadCompleted, this);
      this.load = __bind(this.load, this);
    }

    BinLoader.prototype.load = function(id, cb) {
      var l, url;
      this.id = id;
      this.callback = cb;
      url = "model/" + id + ".js";
      l = new THREE.JSONLoader();
      return l.load(url, this.onLoadCompleted);
    };

    BinLoader.prototype.onLoadCompleted = function(g, mat) {
      return this.callback(this.id, g, mat);
    };

    return BinLoader;

  })();
  return BinLoader;
});
