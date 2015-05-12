var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var BeginTallPlanes;
  BeginTallPlanes = (function(_super) {
    __extends(BeginTallPlanes, _super);

    BeginTallPlanes.prototype.spritesNum = 10;

    function BeginTallPlanes() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      BeginTallPlanes.__super__.constructor.call(this);
    }

    BeginTallPlanes.prototype.init = function() {
      var i, s, _i, _ref;
      BeginTallPlanes.__super__.init.call(this);
      this.instrId = "contrabassi";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = new THREE.Mesh(this.geom, this.mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        this.container.add(s);
      }
    };

    BeginTallPlanes.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry("tall_plane");
      this.mat = new THREE.MeshBasicMaterial({
        fog: true,
        color: 0x68d6fb,
        side: THREE.DoubleSide
      });
    };

    BeginTallPlanes.prototype.reset = function(o) {
      var deg;
      o.yEasing = Util.Rand(0.2, 0.1, 2);
      o.scale.x = o.scale.y = o.scale.z = 8;
      o.scale.x *= Util.Rand(1, 0, 1) > 0.45 ? 1 : -1;
      o.position.x = Util.Rand(1800, -1800, 0);
      o.position.y = -2000;
      o.position.z = this.camera.position.z + 2500 + Util.Rand(2000, -200, 0);
      o.randPosY = Util.Rand(3000, 1800, 0);
      deg = Math.random() * 1 > 0.45 ? 0 : 180;
      o.rotation.y = Util.DegreesToRadians(deg);
    };

    BeginTallPlanes.prototype.expand = function(o) {
      if (o.position.y < o.randPosY) {
        o.position.y += (o.randPosY - o.position.y) * o.yEasing;
      }
      if (this.camera.position.z > o.position.z) {
        this.restart(o);
      }
    };

    BeginTallPlanes.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      BeginTallPlanes.__super__.collectParams.call(this);
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

    BeginTallPlanes.prototype.applyParams = function(capture) {
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

    return BeginTallPlanes;

  })(MidiSprites);
  return BeginTallPlanes;
});
