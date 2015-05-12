var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var CylinderInside;
  CylinderInside = (function(_super) {
    __extends(CylinderInside, _super);

    function CylinderInside() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      this.captOpacity = [];
      CylinderInside.__super__.constructor.call(this);
    }

    CylinderInside.prototype.init = function() {
      var color, i, mat, s, _i, _ref;
      CylinderInside.__super__.init.call(this);
      this.instrId = "timpani";
      this.spritesNum = 4;
      color = "#ffffff";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        mat = new THREE.MeshLambertMaterial({
          color: 0xffffff,
          ambient: 0xffffff,
          emissive: 0xffffff,
          transparent: true
        });
        s = new THREE.Mesh(this.geom, mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.reset(s);
        this.container.add(s);
      }
    };

    CylinderInside.prototype.setupMatGeom = function() {
      this.geom = new THREE.SphereGeometry(10, 20, 20);
    };

    CylinderInside.prototype.reset = function(b) {
      b.sc = 0.01;
      b.maxScale = Util.Rand(50, 30, 0);
      b.angleForce = 10;
      b.angle = Math.random() * (Math.PI * 2);
      b.sVel = Util.Rand(0.8, 0.6, 1);
      b.yVelocity = Util.Rand(4.9, 4.7, 1);
      b.startPositionX = this.mouseProjection.x;
      b.startPositionY = this.mouseProjection.y;
      b.startPositionZ = this.mouseProjection.z;
      b.startPositionY += 10.8;
      b.startPositionZ += 400;
      b.endPositionY = Util.Rand(b.startPositionY + 400, b.startPositionY + 200, 0);
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
      b.material.opacity = 1;
    };

    CylinderInside.prototype.expand = function(b) {
      var prevScale;
      b.angle += b.angleForce;
      if (b.scale.x < b.maxScale) {
        prevScale = b.scale.x;
        b.scale.x = b.scale.y = b.scale.z += b.sVel;
      }
      if (b.scale.x > (b.maxScale * 0.2)) {
        b.material.opacity -= (b.material.opacity - 0) * 0.1;
      }
      if (b.material.opacity < 0.01) {
        this.restart(b);
      }
    };

    CylinderInside.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      CylinderInside.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      this.captOpacity.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
          this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
          this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
          this.captOpacity.push(sprite.material.opacity);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      this.collection.opacity = this.captOpacity;
      return this.collection;
    };

    CylinderInside.prototype.applyParams = function(capture) {
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
        s.material.opacity = capture.opacity[i];
        j += 3;
      }
    };

    return CylinderInside;

  })(MidiSprites);
  return CylinderInside;
});
