var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  "use strict";
  var SkyLines;
  SkyLines = (function(_super) {
    __extends(SkyLines, _super);

    SkyLines.prototype.spritesNum = 80;

    SkyLines.prototype.maxRadius = 4000;

    function SkyLines() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.collapse = __bind(this.collapse, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      this.sprites = [];
      SkyLines.__super__.constructor.call(this);
    }

    SkyLines.prototype.init = function() {
      var i, l, mat, _i, _ref;
      SkyLines.__super__.init.call(this);
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        mat = Math.random() * 1 < 0.2 ? this.matB : this.matA;
        l = new THREE.Line(this.geom, mat, THREE.LinePieces);
        this.reset(l);
        this.sprites[i] = l;
        this.container.add(l);
      }
      this.container.scale.z = 2;
      this.matA.opacity = 0;
      this.matB.opacity = 0;
    };

    SkyLines.prototype.setupMatGeom = function() {
      var colors, scale;
      colors = this.params.colors == null ? ["0xffffff", "0xe4e4e4"] : this.params.colors;
      this.matA = new THREE.LineBasicMaterial({
        linewidth: 3,
        color: colors[0],
        transparent: true
      });
      this.matB = new THREE.LineBasicMaterial({
        linewidth: 3,
        color: colors[1],
        transparent: true
      });
      this.geom = new THREE.Geometry();
      scale = 100;
      this.geom.vertices.push(new THREE.Vector3(0, 0, scale / 2));
      this.geom.vertices.push(new THREE.Vector3(0, 0, -scale / 2));
    };

    SkyLines.prototype.reset = function(b) {
      var angle, radius, scale;
      scale = Util.Rand(10, 0.5, 1);
      angle = Math.random() * (Math.PI * 2);
      radius = Math.random() * this.maxRadius;
      b.zVelocity = 100 + Util.Rand(200 * this.clipTimeScale, 100 * this.clipTimeScale, 1);
      b.startPositionX = Math.cos(angle) * radius;
      b.startPositionY = Math.sin(angle) * radius;
      b.startPositionZ = Util.Rand(3000, 1500, 0);
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.z = scale;
    };

    SkyLines.prototype.expand = function(b) {
      b.position.z -= b.zVelocity;
      if (b.position.z < 0) {
        this.reset(b);
      }
    };

    SkyLines.prototype.collapse = function() {
      var b, _i, _len, _ref;
      this.clipTimeScale = ((Sound.instance.getPosition() - this.startTimeMill) / (this.endTimeMill - this.startTimeMill)) * 1;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        b.position.z -= b.zVelocity;
      }
      this.matA.opacity = this.clipTimeScale;
      this.matB.opacity = this.clipTimeScale;
      this.container.position.x = this.camera.position.x;
      this.container.position.y = this.camera.position.y - 300;
      this.container.position.z = this.camera.position.z;
    };

    SkyLines.prototype.onUpdate = function() {
      var b, _i, _len, _ref;
      this.clipTimeScale = ((Sound.instance.getPosition() - this.startTimeMill) / (this.endTimeMill - this.startTimeMill)) * 1;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        this.expand(b);
      }
      this.matA.opacity = this.clipTimeScale;
      this.matB.opacity = this.clipTimeScale;
      this.container.position.x = this.camera.position.x;
      this.container.position.y = this.camera.position.y - 300;
      this.container.position.z = this.camera.position.z;
    };

    SkyLines.prototype.transitionIn = function() {
      this.assignCamera();
      this.matA.color.setHex(this.params.colors[0]);
      this.matB.color.setHex(this.params.colors[1]);
      SkyLines.__super__.transitionIn.call(this);
    };

    SkyLines.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      SkyLines.__super__.collectParams.call(this);
      this.collection.setup = this.params;
      this.collection.contPosition = [this.container.position.x, this.container.position.y, this.container.position.z];
      this.collection.matAopacity = this.matA.opacity;
      this.collection.matBopacity = this.matB.opacity;
      this.collection.clipTimeScale = this.clipTimeScale;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
        this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
        this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      return this.collection;
    };

    SkyLines.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      this.params = capture.setup;
      this.container.position.set(capture.contPosition[0], capture.contPosition[1], capture.contPosition[2]);
      this.clipTimeScale = capture.clipTimeScale;
      this.matA.color.setHex(this.params.colors[0]);
      this.matB.color.setHex(this.params.colors[1]);
      this.matA.opacity = capture.matAopacity;
      this.matB.opacity = capture.matBopacity;
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return SkyLines;

  })(Movieclip);
  return SkyLines;
});
