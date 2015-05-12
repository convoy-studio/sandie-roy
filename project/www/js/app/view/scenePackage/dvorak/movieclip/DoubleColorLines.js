var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var DoubleColorLines;
  DoubleColorLines = (function(_super) {
    __extends(DoubleColorLines, _super);

    DoubleColorLines.prototype.spritesNum = 20;

    function DoubleColorLines() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.createBouncer = __bind(this.createBouncer, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      DoubleColorLines.__super__.constructor.call(this);
    }

    DoubleColorLines.prototype.init = function() {
      var i, s, _i, _ref;
      DoubleColorLines.__super__.init.call(this);
      this.instrId = "violoncelli";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.createBouncer();
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    DoubleColorLines.prototype.setupMatGeom = function() {
      this.bouncerMatA = Util.MeshColorMaterial(0xd4dcde, null, THREE.BackSide);
      this.bouncerMatB = Util.MeshColorMaterial(0xffffff, null, THREE.BackSide);
      this.bouncerGeom = new THREE.PlaneBufferGeometry(10, 100, 1, 1);
    };

    DoubleColorLines.prototype.createBouncer = function() {
      var bounceHolder, meshBack, meshFront;
      bounceHolder = new THREE.Group();
      meshFront = new THREE.Mesh(this.bouncerGeom, this.bouncerMatA);
      meshBack = new THREE.Mesh(this.bouncerGeom, this.bouncerMatB);
      meshBack.scale.x = 1.3;
      meshBack.position.x = -12;
      bounceHolder.add(meshBack);
      bounceHolder.add(meshFront);
      return bounceHolder;
    };

    DoubleColorLines.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.3, 0.1, 1);
      b.angle = 0;
      b.radius = Util.Rand(1000, -1000, 0);
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(9, 5, 1);
      b.angleForce = Util.Rand(6, 4, 0);
      b.xEasing = Util.Rand(0.01, 0.009, 3);
      b.yEasing = Util.Rand(0.01, 0.009, 3);
      b.zEasing = Util.Rand(0.01, 0.009, 3);
      b.zVelocity = Util.Rand(27, 17, 0);
      b.zRotation = Util.DegreesToRadians(Util.Rand(30, -30, 0));
      b.xRotation = Util.DegreesToRadians(Util.Rand(20, -10, 0));
      b.yRotationVel = Util.Rand(0.05, -0.05, 2);
      b.gravityX = 1;
      b.gravityY = 0.6;
      b.startPositionX = this.mouseProjection.x + Util.Rand(1, -1, 0) + Math.cos(b.angle) * b.radius;
      b.startPositionY = this.mouseProjection.y + Util.Rand(150, -150, 0) + Math.sin(b.angle) * b.radius;
      b.startPositionY += 630;
      b.startPositionZ = this.mouseProjection.z + 200;
      b.rotation.z = Util.DegreesToRadians(Util.Rand(95, 85, 0));
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.y = b.sc;
    };

    DoubleColorLines.prototype.expand = function(b) {
      var newPosX, newPosY;
      b.scale.y *= Math.max((Sound.frequency / 200) * 1, 0.9);
      b.angle += b.angleForce;
      b.angle = b.angle * 0.1;
      if (b.scale.x < b.maxScale) {
        b.position.z += (this.mouseProjection.z - b.position.z) * b.zEasing;
        b.scale.y += (b.maxScale - b.scale.y) * b.sVel;
        newPosX = this.mouseProjection.x + Math.cos(b.angle) * b.radius;
        newPosY = this.mouseProjection.y + Math.sin(b.angle) * b.radius;
      } else {
        newPosX = b.startPositionX + Math.cos(b.angle) * (b.radius * b.afterRadiusX);
        newPosY = b.startPositionY + Math.sin(b.angle) * (b.radius * b.afterRadiusY);
        newPosX *= b.gravityX;
        newPosY *= b.gravityY;
      }
      b.rotation.z -= (-0.5 + (Model.mouseX / Model.windowW) * 1) * 0.07;
      newPosX *= b.gravityX;
      newPosY *= b.gravityY;
      b.position.x += (newPosX - b.position.x) * b.xEasing;
      b.position.y += (newPosY - b.position.y) * b.yEasing;
      b.position.z -= b.zVelocity;
      if (this.camera.position.z > b.position.z) {
        this.restart(b);
      }
    };

    DoubleColorLines.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      DoubleColorLines.__super__.collectParams.call(this);
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

    DoubleColorLines.prototype.applyParams = function(capture) {
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

    return DoubleColorLines;

  })(MidiSprites);
  return DoubleColorLines;
});
