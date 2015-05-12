var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var ViolinTriangles;
  ViolinTriangles = (function(_super) {
    __extends(ViolinTriangles, _super);

    ViolinTriangles.prototype.spritesNum = 20;

    function ViolinTriangles() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      ViolinTriangles.__super__.constructor.call(this);
    }

    ViolinTriangles.prototype.init = function() {
      var i, s, _i, _ref;
      ViolinTriangles.__super__.init.call(this);
      this.instrId = "violini";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = new THREE.Mesh(this.geom, this.mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    ViolinTriangles.prototype.setupMatGeom = function() {
      this.geom = new THREE.PlaneBufferGeometry(1, 2, 1, 1);
      this.mat = new THREE.MeshLambertMaterial({
        color: this.params.color,
        ambient: this.params.color,
        emissive: this.params.color,
        side: THREE.DoubleSide
      });
    };

    ViolinTriangles.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = (100 / 70) * 8;
      b.angle = 0;
      b.radius = Math.random() * 20;
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = 80 / 100 * 150;
      b.angleForce = Util.Rand(6, 4, 0);
      b.xEasing = Util.Rand(0.01, 0.009, 3);
      b.yEasing = Util.Rand(0.01, 0.009, 3);
      b.zEasing = Util.Rand(0.01, 0.009, 3);
      b.zVelocity = Util.Rand(17, 10, 0);
      b.zRotation = Util.DegreesToRadians(Util.Rand(30, -30, 0));
      b.xRotation = Util.DegreesToRadians(Util.Rand(20, -10, 0));
      b.yRotationVel = Util.Rand(0.05, -0.05, 2);
      b.gravityX = 1;
      b.gravityY = 1;
      b.startPositionX = Dvorak.Mouse.projection.x + Util.Rand(1, -1, 0) + Math.cos(b.angle) * b.radius;
      b.startPositionY = Dvorak.Mouse.projection.y + Util.Rand(50, -50, 0) + Math.sin(b.angle) * b.radius;
      b.startPositionZ = Dvorak.Mouse.projection.z + 200;
      b.startPositionY += 130;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
    };

    ViolinTriangles.prototype.expand = function(b) {
      var newPosX, newPosY;
      b.angle += b.angleForce;
      b.angle = b.angle * 0.1;
      if (b.scale.x < b.maxScale) {
        b.position.z += (Dvorak.Mouse.projection.z - b.position.z) * b.zEasing;
        b.scale.x += b.sVel * 0.05;
        b.scale.y += b.sVel * 0.8;
        b.rotation.x += (b.xRotation - b.rotation.x) * 0.1;
        b.rotation.z += (b.zRotation - b.rotation.z) * 0.1;
        newPosX = Dvorak.Mouse.projection.x + Math.cos(b.angle) * b.radius;
        newPosY = Dvorak.Mouse.projection.y + Math.sin(b.angle) * b.radius;
      } else {
        newPosX = b.startPositionX + Math.cos(b.angle) * (b.radius * b.afterRadiusX);
        newPosY = b.startPositionY + Math.sin(b.angle) * (b.radius * b.afterRadiusY);
        newPosX *= b.gravityX;
        newPosY *= b.gravityY;
      }
      b.scale.y = 10 + (Sound.frequency / 200) * 500;
      newPosX *= b.gravityX;
      newPosY *= b.gravityY;
      b.rotation.y += b.yRotationVel;
      b.position.x += (newPosX - b.position.x) * b.xEasing;
      b.position.y += (newPosY - b.position.y) * b.yEasing;
      b.position.z -= b.zVelocity;
      if (this.camera.position.z > b.position.z) {
        this.restart(b);
      }
    };

    ViolinTriangles.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      ViolinTriangles.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.collection.setup = this.params;
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

    ViolinTriangles.prototype.applyParams = function(capture) {
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

    return ViolinTriangles;

  })(MidiSprites);
  return ViolinTriangles;
});
