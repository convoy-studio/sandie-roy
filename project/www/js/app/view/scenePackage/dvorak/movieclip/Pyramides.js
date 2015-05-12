var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var Pyramides;
  Pyramides = (function(_super) {
    __extends(Pyramides, _super);

    Pyramides.prototype.spritesNum = 10;

    Pyramides.prototype.counter = 0;

    Pyramides.prototype.delayIndex = 0;

    function Pyramides() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.checkIntersection = __bind(this.checkIntersection, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      Pyramides.__super__.constructor.call(this);
    }

    Pyramides.prototype.init = function() {
      var i, pyramide, _i, _ref;
      Pyramides.__super__.init.call(this);
      this.instrId = "contrabassi";
      this.mouseVector = new THREE.Vector3();
      this.projection = new THREE.Vector3();
      this.raycaster = new THREE.Raycaster();
      this.intersection = {
        intersects: false,
        point: new THREE.Vector3()
      };
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        pyramide = new THREE.Mesh(this.geom, this.mat);
        this.sprites[i] = pyramide;
        this.sprites[i].active = false;
        this.reset(this.sprites[i]);
        this.container.add(pyramide);
      }
    };

    Pyramides.prototype.setupMatGeom = function() {
      var tex;
      this.geom = Loader.getGeometry("pyramide");
      tex = Loader.getTexture("PyramidSurface_Color-texture");
      this.mat = Util.MeshTextureMaterial(tex, null, 1);
    };

    Pyramides.prototype.transitionIn = function() {
      this.intersectMeshes = Dvorak.Mouse.intersectMeshes;
      this.projectCamera = Dvorak.Intersector.projectCamera;
      this.projectCameraLookAt = Dvorak.Intersector.projectCameraLookAt;
      Pyramides.__super__.transitionIn.call(this);
    };

    Pyramides.prototype.reset = function(o) {
      o.sc = Util.Rand(1.5, 0.7, 1);
      o.velocity = Util.Rand(0.5, 0.2, 1);
      o.position.x = this.intersection.point.x;
      o.position.y = this.intersection.point.y - 50;
      o.position.z = this.intersection.point.z;
      o.rotation.x = Util.DegreesToRadians(Util.Rand(10, -10, 0));
      o.rotation.y = Util.DegreesToRadians(Util.Rand(45, -45, 0));
      o.rotation.z = Util.DegreesToRadians(Util.Rand(10, -10, 0));
      o.scale.x = 0;
      o.scale.y = 0;
      o.scale.z = 0;
    };

    Pyramides.prototype.expand = function(o) {
      if (o.scale.x < o.sc) {
        o.scale.x += (o.sc - o.scale.x) * o.velocity;
        o.scale.y += (o.sc - o.scale.y) * o.velocity;
        o.scale.z += (o.sc - o.scale.z) * o.velocity;
      }
      if (this.camera.position.z > o.position.z) {
        this.restart(o);
      }
    };

    Pyramides.prototype.onUpdate = function() {
      Pyramides.__super__.onUpdate.call(this);
      this.checkIntersection();
    };

    Pyramides.prototype.checkIntersection = function() {
      var dir, intersects, p, xRatio, yRatio, zRatio;
      xRatio = Util.Rand(0.4, -0.3, 3);
      yRatio = Util.Rand(0.5, -0.5, 3);
      zRatio = 1;
      this.mouseVector.set(xRatio, yRatio, zRatio);
      this.mouseVector.unproject(this.projectCamera);
      dir = this.mouseVector.sub(this.projectCamera.position).normalize();
      this.raycaster.set(this.projectCamera.position, dir);
      intersects = this.raycaster.intersectObjects(this.intersectMeshes);
      if (intersects.length > 0) {
        p = intersects[0].point;
        this.intersection.point.x = p.x;
        this.intersection.point.y = p.y;
        this.intersection.point.z = p.z;
      }
    };

    Pyramides.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      Pyramides.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
          this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
          this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      return this.collection;
    };

    Pyramides.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return Pyramides;

  })(MidiSprites);
  return Pyramides;
});
