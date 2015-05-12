var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define(["preloadjs"], function(PreloadJS) {
  "use strict";
  var LoaderService;
  LoaderService = (function() {
    LoaderService.prototype.queue = void 0;

    LoaderService.prototype.geometryCollection = {};

    function LoaderService() {
      this.onLoadProgress = __bind(this.onLoadProgress, this);
      this.onLoadCompleted = __bind(this.onLoadCompleted, this);
      this.getContentById = __bind(this.getContentById, this);
      this.getMesh = __bind(this.getMesh, this);
      this.getGeometry = __bind(this.getGeometry, this);
      this.getCubeTexture = __bind(this.getCubeTexture, this);
      this.getSvg = __bind(this.getSvg, this);
      this.getShader = __bind(this.getShader, this);
      this.getTexture = __bind(this.getTexture, this);
      this.getImageURL = __bind(this.getImageURL, this);
      this.pushGeometry = __bind(this.pushGeometry, this);
      this.load = __bind(this.load, this);
      this.queue = new PreloadJS();
      this.queue.on("complete", this.onLoadCompleted);
      this.queue.on("progress", this.onLoadProgress);
    }

    LoaderService.prototype.load = function(manifest, onLoaded, onProgress) {
      this.queue.onLoaded = onLoaded;
      this.queue.onProgress = onProgress;
      return this.queue.loadManifest(manifest);
    };

    LoaderService.prototype.pushGeometry = function(id, g, mat) {
      g = {
        geometry: g,
        material: mat
      };
      return this.geometryCollection[id] = g;
    };

    LoaderService.prototype.getImageURL = function(id) {
      return $(this.queue.getResult(id)).attr("src");
    };

    LoaderService.prototype.getTexture = function(id) {
      var img, texture;
      img = this.getContentById(id);
      texture = new THREE.Texture(img);
      texture.needsUpdate = true;
      return texture;
    };

    LoaderService.prototype.getShader = function(id) {
      return this.getContentById(id);
    };

    LoaderService.prototype.getSvg = function(id) {
      return this.getContentById(id + "-svg");
    };

    LoaderService.prototype.getCubeTexture = function(id) {
      var urls;
      urls = [this.getImageURL(id + "-px-cubemap"), this.getImageURL(id + "-nx-cubemap"), this.getImageURL(id + "-py-cubemap"), this.getImageURL(id + "-ny-cubemap"), this.getImageURL(id + "-pz-cubemap"), this.getImageURL(id + "-nz-cubemap")];
      return THREE.ImageUtils.loadTextureCube(urls, new THREE.CubeRefractionMapping());
    };

    LoaderService.prototype.getGeometry = function(id) {
      return this.geometryCollection[id].geometry.clone();
    };

    LoaderService.prototype.getMesh = function(id) {
      var m, t;
      t = this.geometryCollection[id];
      m = new THREE.Mesh(t.geometry, new THREE.MeshFaceMaterial(t.material));
      return m;
    };

    LoaderService.prototype.getContentById = function(id) {
      return this.queue.getResult(id);
    };

    LoaderService.prototype.onLoadCompleted = function(e) {
      var q;
      q = this.queue;
      return typeof q.onLoaded === "function" ? q.onLoaded(e.currentTarget) : void 0;
    };

    LoaderService.prototype.onLoadProgress = function(e) {
      var q;
      q = this.queue;
      return typeof q.onProgress === "function" ? q.onProgress() : void 0;
    };

    return LoaderService;

  })();
  return LoaderService;
});
