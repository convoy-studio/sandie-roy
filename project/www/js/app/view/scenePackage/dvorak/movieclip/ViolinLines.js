var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var ViolinLines;
  ViolinLines = (function(_super) {
    __extends(ViolinLines, _super);

    ViolinLines.prototype.spritesNum = 30;

    function ViolinLines() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      ViolinLines.__super__.constructor.call(this);
    }

    ViolinLines.prototype.init = function() {
      var i, s, _i, _ref;
      ViolinLines.__super__.init.call(this);
      this.instrId = "violini";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = new THREE.Line(this.lineGeom, this.lineMat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    ViolinLines.prototype.setupMatGeom = function() {
      var color;
      color = 0xff0000;
      this.lineMat = new THREE.LineBasicMaterial({
        linewidth: 2,
        color: color
      });
      this.lineGeom = new THREE.Geometry();
      this.lineGeom.vertices.push(new THREE.Vector3(0, 100, 0));
      this.lineGeom.vertices.push(new THREE.Vector3(0, -100, 0));
    };

    ViolinLines.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.3, 0.1, 1);
      b.angle = 0;
      b.radius = Util.Rand(300, -300, 0);
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(6, 3, 1);
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
      b.startPositionX = Dvorak.Mouse.projection.x + Util.Rand(1, -1, 0) + Math.cos(b.angle) * b.radius;
      b.startPositionY = Dvorak.Mouse.projection.y + Util.Rand(150, -50, 0) + Math.sin(b.angle) * b.radius;
      b.startPositionY += 630;
      b.startPositionZ = Dvorak.Mouse.projection.z + 200;
      b.rotation.z = Util.DegreesToRadians(Util.Rand(95, 85, 0));
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.y = b.sc;
    };

    ViolinLines.prototype.expand = function(b) {
      var newPosX, newPosY;
      b.angle += b.angleForce;
      b.angle = b.angle * 0.1;
      b.scale.y *= Math.max((Sound.frequency / 200) * 1.3, 0.4);
      if (b.scale.x < b.maxScale) {
        b.position.z += (Dvorak.Mouse.projection.z - b.position.z) * b.zEasing;
        b.scale.y += (b.maxScale - b.scale.y) * b.sVel;
        newPosX = Dvorak.Mouse.projection.x + Math.cos(b.angle) * b.radius;
        newPosY = Dvorak.Mouse.projection.y + Math.sin(b.angle) * b.radius;
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

    ViolinLines.prototype.transitionIn = function() {
      var b, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        b.material.color.setHex(this.params.color);
      }
      ViolinLines.__super__.transitionIn.call(this);
    };

    ViolinLines.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      ViolinLines.__super__.collectParams.call(this);
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

    ViolinLines.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      this.params = capture.setup;
      this.lineMat.color.setHex(this.params.color);
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return ViolinLines;

  })(MidiSprites);
  return ViolinLines;
});
