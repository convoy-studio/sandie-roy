var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var BubbleBreathe;
  BubbleBreathe = (function(_super) {
    __extends(BubbleBreathe, _super);

    function BubbleBreathe() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      BubbleBreathe.__super__.constructor.call(this);
    }

    BubbleBreathe.prototype.init = function() {
      var i, s, _i, _ref;
      BubbleBreathe.__super__.init.call(this);
      this.instrId = this.params.instrument;
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.params.num - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = new THREE.Mesh(this.geom, this.mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    BubbleBreathe.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry(this.params.geom);
      this.mat = Util.MeshColorMaterial(this.params.color, null, THREE.BackSide);
    };

    BubbleBreathe.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.04, 0.01, 2);
      b.angle = 0;
      b.radius = Util.Rand(700, -700, 0);
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(this.params.maxScale, 0.4, 1);
      b.angleForce = Util.Rand(6, 4, 0);
      b.xEasing = Util.Rand(0.01, 0.009, 3);
      b.yEasing = Util.Rand(0.01, 0.009, 3);
      b.zEasing = Util.Rand(0.01, 0.009, 3);
      b.zVelocity = Util.Rand(20, 10, 0);
      b.zRotationVel = Util.Rand(0.05, -0.05, 2);
      b.gravityX = 1;
      b.gravityY = 1;
      b.startPositionX = this.mouseProjection.x + Util.Rand(10, -10, 0) + Math.cos(b.angle) * b.radius;
      b.startPositionY = this.mouseProjection.y + Util.Rand(10, -10, 0) + Math.sin(b.angle) * b.radius;
      b.startPositionY += 130;
      b.startPositionZ = this.mouseProjection.z;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
    };

    BubbleBreathe.prototype.expand = function(b) {
      var newPosX, newPosY, prevScale;
      b.angle += b.angleForce;
      b.angle = b.angle * 0.1;
      if (b.scale.x < b.maxScale) {
        b.position.z += (this.mouseProjection.z - b.position.z) * b.zEasing;
        prevScale = b.scale.x;
        b.scale.x = b.scale.y = b.scale.z += (b.maxScale - prevScale) * b.sVel;
        newPosX = this.mouseProjection.x + Math.cos(b.angle) * b.radius;
        newPosY = this.mouseProjection.y + Math.sin(b.angle) * b.radius;
      } else {
        newPosX = b.startPositionX + Math.cos(b.angle) * (b.radius * b.afterRadiusX);
        newPosY = b.startPositionY + Math.sin(b.angle) * (b.radius * b.afterRadiusY);
        newPosX *= b.gravityX;
        newPosY *= b.gravityY;
      }
      newPosX *= b.gravityX;
      newPosY *= b.gravityY;
      b.position.x += (newPosX - b.position.x) * b.xEasing;
      b.position.y += (newPosY - b.position.y) * b.yEasing;
      b.position.z -= b.zVelocity;
      b.rotation.z += b.zRotationVel;
      if (this.camera.position.z > b.position.z) {
        this.restart(b);
      }
    };

    BubbleBreathe.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      BubbleBreathe.__super__.collectParams.call(this);
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

    BubbleBreathe.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      this.params = capture.setup;
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return BubbleBreathe;

  })(MidiSprites);
  return BubbleBreathe;
});
