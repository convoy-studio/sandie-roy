var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var TwoColorsFloatingObjects;
  TwoColorsFloatingObjects = (function(_super) {
    __extends(TwoColorsFloatingObjects, _super);

    TwoColorsFloatingObjects.prototype.spritesNum = 20;

    function TwoColorsFloatingObjects() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.onMidiChanged = __bind(this.onMidiChanged, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      TwoColorsFloatingObjects.__super__.constructor.call(this);
    }

    TwoColorsFloatingObjects.prototype.init = function() {
      var color, i, mat, s, _i, _ref;
      TwoColorsFloatingObjects.__super__.init.call(this);
      this.instrId = this.params.instrument;
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        color = Math.random() * 1 < 0.45 ? this.params.colorA : this.params.colorB;
        mat = Util.MeshColorMaterial(color, 1, THREE.BackSide);
        s = new THREE.Mesh(this.geom, mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        s.angle = 0;
        this.reset(s);
        this.container.add(s);
      }
    };

    TwoColorsFloatingObjects.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry(this.params.geom);
    };

    TwoColorsFloatingObjects.prototype.onMidiChanged = function() {
      var spriteA, spriteB;
      spriteA = this.getSprite();
      spriteB = this.getSprite();
      if ((spriteA == null) || (spriteB == null)) {
        return;
      }
      this.reset(spriteA);
      this.reset(spriteB);
      spriteA.active = true;
      spriteB.active = true;
    };

    TwoColorsFloatingObjects.prototype.reset = function(b) {
      b.sc = 0.01;
      b.maxScale = Util.Rand(this.params.scale[0], this.params.scale[1], 2);
      b.angleForce = 0.3;
      b.radius = Util.Rand(this.params.radius, -this.params.radius, 0);
      b.sVel = Util.Rand(this.params.velocity[0], this.params.velocity[1], 2);
      b.zRotationVel = Util.Rand(0.07, 0.01, 2);
      b.zVelocity = Util.Rand(this.params.zVelocity[0], this.params.zVelocity[1], 1);
      b.startPositionX = Util.Rand(this.params.radius, -this.params.radius, 0) + Dvorak.Mouse.projection.x + Math.cos(b.angle) * b.radius;
      b.startPositionY = Util.Rand(this.params.radius, -this.params.radius, 0) + Dvorak.Mouse.projection.y + Math.sin(b.angle) * b.radius;
      b.startPositionZ = Dvorak.Mouse.projection.z;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.rotation.z = 0;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
      if (!this.params.rotation) {
        b.rotation.z = Math.random() * 1 > 0.45 ? Util.DegreesToRadians(180) : Util.DegreesToRadians(0);
      }
      b.material.uniforms.opacity.value = 1;
    };

    TwoColorsFloatingObjects.prototype.expand = function(b) {
      var prevScale;
      b.angle += b.angleForce;
      if (b.scale.x < b.maxScale) {
        prevScale = b.scale.x;
        b.scale.x = b.scale.y = b.scale.z += (b.maxScale - prevScale) * b.sVel;
      }
      if (b.scale.x > (b.maxScale * this.params.opacityDelay)) {
        b.material.uniforms.opacity.value -= (b.material.uniforms.opacity.value - 0) * 0.06;
      }
      if (this.params.rotation) {
        b.rotation.z += b.zRotationVel;
      }
      b.position.z -= b.zVelocity;
      b.position.y += this.params.gravity;
      if (b.material.uniforms.opacity.value < 0.01) {
        this.restart(b);
      }
    };

    TwoColorsFloatingObjects.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      TwoColorsFloatingObjects.__super__.collectParams.call(this);
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

    TwoColorsFloatingObjects.prototype.applyParams = function(capture) {
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

    return TwoColorsFloatingObjects;

  })(MidiSprites);
  return TwoColorsFloatingObjects;
});
