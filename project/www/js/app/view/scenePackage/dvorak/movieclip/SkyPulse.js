var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var SkyPulse;
  SkyPulse = (function(_super) {
    __extends(SkyPulse, _super);

    function SkyPulse() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      SkyPulse.__super__.constructor.call(this);
    }

    SkyPulse.prototype.init = function() {
      var i, mat, s, _i, _ref;
      SkyPulse.__super__.init.call(this);
      this.instrId = "corni";
      this.spritesNum = 4;
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        mat = Util.MeshColorMaterial(0xffffff);
        s = new THREE.Mesh(this.geom, mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    SkyPulse.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry("circle_points");
    };

    SkyPulse.prototype.reset = function(b) {
      b.sc = 0.01;
      b.maxScale = Util.Rand(3, 2, 0);
      b.angleForce = 0.3;
      b.angle = Math.random() * (Math.PI * 2);
      b.sVel = Util.Rand(0.4, 0.01, 2);
      b.zRotationVel = Util.Rand(0.04, 0.01, 2);
      b.zVelocity = Util.Rand(0.4, 0.2, 1);
      b.startPositionX = Dvorak.Mouse.projection.x;
      b.startPositionY = Dvorak.Mouse.projection.y;
      b.startPositionZ = Dvorak.Mouse.projection.z;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.rotation.z = 0;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
      b.material.opacity = 1;
    };

    SkyPulse.prototype.expand = function(b) {
      var prevScale;
      b.angle += b.angleForce;
      if (b.scale.x < b.maxScale) {
        prevScale = b.scale.x;
        b.scale.x = b.scale.y = b.scale.z += (b.maxScale - prevScale) * b.sVel;
      }
      if (b.scale.x > (b.maxScale * 0.5)) {
        b.material.opacity -= (b.material.opacity - 0) * 0.06;
      }
      b.rotation.z += b.zRotationVel;
      b.position.z -= b.zVelocity;
      if (b.material.opacity < 0.01) {
        this.restart(b);
      }
    };

    SkyPulse.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      SkyPulse.__super__.collectParams.call(this);
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

    SkyPulse.prototype.applyParams = function(capture) {
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

    return SkyPulse;

  })(MidiSprites);
  return SkyPulse;
});
