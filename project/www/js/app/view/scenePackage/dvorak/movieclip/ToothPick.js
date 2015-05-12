var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["SimpleSprites"], function(SimpleSprites) {
  "use strict";
  var ToothPick;
  ToothPick = (function(_super) {
    __extends(ToothPick, _super);

    function ToothPick() {
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
      this.captVertX = [];
      ToothPick.__super__.constructor.call(this);
    }

    ToothPick.prototype.init = function() {
      var i, mesh, _i;
      ToothPick.__super__.init.call(this);
      this.setupMatGeom();
      for (i = _i = 0; _i <= 60; i = ++_i) {
        mesh = new THREE.Mesh(this.geom, this.material);
        this.sprites[i] = mesh;
        this.reset(mesh);
        this.container.add(mesh);
      }
    };

    ToothPick.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry("hairline");
      this.geom.dynamic = true;
      this.material = Util.MeshColorMaterial(this.params.color);
    };

    ToothPick.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.5, 0.05, 2);
      b.angle = Math.random() * (Math.PI * 2);
      b.radius = Math.random() * 20;
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(0.6, 0.4, 2);
      b.angleForce = Util.Rand(0.2, -0.2, 1);
      b.xEasing = Util.Rand(0.09, 0.02, 2);
      b.yEasing = Util.Rand(0.09, 0.02, 2);
      b.zEasing = Util.Rand(0.5, 0.05, 2);
      b.zVelocity = Util.Rand(20, 10, 0);
      b.rotVelocity = Util.Rand(30, 0, 1);
      b.vertVelocity = Util.Rand(1, 0.1, 1);
      b.vertRot = Util.Rand(1, 0, 1);
      b.gravityX = 1;
      b.gravityY = 1;
      b.startPositionX = Dvorak.Mouse.projection.x + Util.Rand(10, -10, 0) + Math.cos(b.angle) * b.radius;
      b.startPositionY = Dvorak.Mouse.projection.y + 100 + Util.Rand(10, -10, 0) + Math.sin(b.angle) * b.radius;
      b.startPositionZ = Dvorak.Mouse.projection.z;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
      b.scale.z = 1;
    };

    ToothPick.prototype.expand = function(b) {
      var i, newPosX, newPosY, time, vert, _i, _len, _ref;
      b.angle += b.angleForce;
      b.rotation.x = Util.DegreesToRadians(-90);
      b.rotation.y += b.rotVelocity;
      if (b.scale.x < b.maxScale) {
        b.position.z += (Dvorak.Mouse.projection.z - b.position.z) * b.zEasing;
        b.scale.x = b.scale.y = b.scale.z += b.sVel;
        newPosX = Dvorak.Mouse.projection.x + Math.cos(b.angle) * b.radius;
        newPosY = Dvorak.Mouse.projection.y + Math.sin(b.angle) * b.radius;
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
      time = Renderer.clock.getElapsedTime() * 10;
      i = 0;
      _ref = b.geometry.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vert = _ref[_i];
        if (b.vertRot > 0.45) {
          vert.x = b.vertVelocity * Math.sin(i + (time + i));
        } else {
          vert.x = b.vertVelocity * Math.cos(i + (time + i));
        }
        i += 1;
      }
      b.geometry.verticesNeedUpdate = true;
      if (this.camera.position.z > b.position.z) {
        this.restart(b);
      }
    };

    ToothPick.prototype.transitionIn = function() {
      this.material.uniforms.color.value.setHex(this.params.color);
      ToothPick.__super__.transitionIn.call(this);
    };

    ToothPick.prototype.collectParams = function() {
      var sprite, vert, _i, _j, _len, _len1, _ref, _ref1;
      ToothPick.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.collection.setup = this.params;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      this.captVertX.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
        this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
        this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
        _ref1 = sprite.geometry.vertices;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          vert = _ref1[_j];
          this.captVertX.push(vert.x);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      this.collection.captVertX = this.captVertX;
      return this.collection;
    };

    ToothPick.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, vert, _i, _j, _len, _ref, _ref1;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      this.material.uniforms.color.value.setHex(capture.setup.color);
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        _ref1 = s.geometry.vertices;
        for (_j = 0, _len = _ref1.length; _j < _len; _j++) {
          vert = _ref1[_j];
          vert.x = capture.captVertX[i];
        }
        s.geometry.verticesNeedUpdate = true;
        j += 3;
      }
    };

    return ToothPick;

  })(SimpleSprites);
  return ToothPick;
});
