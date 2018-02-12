define([], function() {
  "use strict";
  var BinLoader;
  BinLoader = (function() {
    class BinLoader {
      constructor() {
        this.load = this.load.bind(this);
        this.onLoadCompleted = this.onLoadCompleted.bind(this);
      }

      load(id, cb) {
        var l, url;
        this.id = id;
        this.callback = cb;
        url = "model/" + id + ".js";
        l = new THREE.JSONLoader();
        return l.load(url, this.onLoadCompleted);
      }

      onLoadCompleted(g, mat) {
        return this.callback(this.id, g, mat);
      }

    };

    BinLoader.prototype.id = void 0;

    BinLoader.prototype.callback = void 0;

    return BinLoader;

  }).call(this);
  return BinLoader;
});
