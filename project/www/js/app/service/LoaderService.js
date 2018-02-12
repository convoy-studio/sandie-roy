define(["preloadjs"], function(PreloadJS) {
  "use strict";
  var LoaderService;
  LoaderService = (function() {
    class LoaderService {
      constructor() {
        this.load = this.load.bind(this);
        this.pushGeometry = this.pushGeometry.bind(this);
        this.getImageURL = this.getImageURL.bind(this);
        this.getTexture = this.getTexture.bind(this);
        this.getShader = this.getShader.bind(this);
        this.getSvg = this.getSvg.bind(this);
        this.getCubeTexture = this.getCubeTexture.bind(this);
        this.getGeometry = this.getGeometry.bind(this);
        this.getMesh = this.getMesh.bind(this);
        this.getContentById = this.getContentById.bind(this);
        this.onLoadCompleted = this.onLoadCompleted.bind(this);
        this.onLoadProgress = this.onLoadProgress.bind(this);
        this.queue = new PreloadJS();
        this.queue.on("complete", this.onLoadCompleted);
        this.queue.on("progress", this.onLoadProgress);
      }

      load(manifest, onLoaded, onProgress) {
        this.queue.onLoaded = onLoaded;
        this.queue.onProgress = onProgress;
        return this.queue.loadManifest(manifest);
      }

      pushGeometry(id, g, mat) {
        g = {
          geometry: g,
          material: mat
        };
        return this.geometryCollection[id] = g;
      }

      getImageURL(id) {
        return $(this.queue.getResult(id)).attr("src");
      }

      getTexture(id) {
        var img, texture;
        img = this.getContentById(id);
        texture = new THREE.Texture(img);
        texture.needsUpdate = true;
        return texture;
      }

      getShader(id) {
        return this.getContentById(id);
      }

      getSvg(id) {
        return this.getContentById(id + "-svg");
      }

      getCubeTexture(id) {
        var urls;
        urls = [this.getImageURL(id + "-px-cubemap"), this.getImageURL(id + "-nx-cubemap"), this.getImageURL(id + "-py-cubemap"), this.getImageURL(id + "-ny-cubemap"), this.getImageURL(id + "-pz-cubemap"), this.getImageURL(id + "-nz-cubemap")];
        return THREE.ImageUtils.loadTextureCube(urls, new THREE.CubeRefractionMapping());
      }

      getGeometry(id) {
        return this.geometryCollection[id].geometry.clone();
      }

      getMesh(id) {
        var m, t;
        t = this.geometryCollection[id];
        m = new THREE.Mesh(t.geometry, new THREE.MeshFaceMaterial(t.material));
        return m;
      }

      getContentById(id) {
        return this.queue.getResult(id);
      }

      onLoadCompleted(e) {
        var q;
        q = this.queue;
        return typeof q.onLoaded === "function" ? q.onLoaded(e.currentTarget) : void 0;
      }

      onLoadProgress(e) {
        var q;
        q = this.queue;
        return typeof q.onProgress === "function" ? q.onProgress() : void 0;
      }

    };

    LoaderService.prototype.queue = void 0;

    LoaderService.prototype.geometryCollection = {};

    return LoaderService;

  }).call(this);
  return LoaderService;
});
