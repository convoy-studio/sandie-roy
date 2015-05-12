var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["ScenePackage", "HomeCameraService", "HomeLightService", "HomeFloaters"], function(ScenePackage, CameraService, LightService, Floaters) {
  var HomePackage;
  HomePackage = (function(_super) {
    __extends(HomePackage, _super);

    HomePackage.prototype.floaters = void 0;

    function HomePackage(id) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.render = __bind(this.render, this);
      this.init = __bind(this.init, this);
      HomePackage.__super__.constructor.call(this, id);
      this.camera = Home.Camera = new CameraService();
      this.light = Home.Light = new LightService();
      this.scene = Home.Scene = new THREE.Scene();
      this.renderer = Renderer.renderer;
      this.Renderer = Renderer;
    }

    HomePackage.prototype.init = function() {
      this.camera.init();
      this.light.init();
      this.floaters = new Floaters();
      this.floaters.init();
      this.scene.add(this.floaters.container);
      this.rendererScale = 0.8;
      HomePackage.__super__.init.call(this);
    };

    HomePackage.prototype.render = function() {
      this.camera.update();
      this.light.update();
      this.floaters.update();
      this.Renderer.clear();
      this.renderer.render(this.scene, this.camera.camera);
    };

    HomePackage.prototype.resize = function() {
      HomePackage.__super__.resize.call(this);
      this.camera.resize();
    };

    HomePackage.prototype.destroy = function() {
      this.scene.remove(this.floaters.container);
      this.floaters.destroy();
      HomePackage.__super__.destroy.call(this);
    };

    return HomePackage;

  })(ScenePackage);
  return HomePackage;
});
