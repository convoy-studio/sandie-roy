var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  "use strict";
  var TriangleRocks;
  TriangleRocks = (function(_super) {
    __extends(TriangleRocks, _super);

    TriangleRocks.prototype.sprites = void 0;

    TriangleRocks.prototype.spritesNum = 100;

    TriangleRocks.prototype.enableSprites = void 0;

    TriangleRocks.prototype.instrument = void 0;

    function TriangleRocks() {
      this.onUpdate = __bind(this.onUpdate, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.getSprite = __bind(this.getSprite, this);
      this.onMidiChanged = __bind(this.onMidiChanged, this);
      this.init = __bind(this.init, this);
      TriangleRocks.__super__.constructor.call(this);
      this.sprites = [];
      this.enableSprites = [];
    }

    TriangleRocks.prototype.init = function() {
      var i, material, mesh, _i, _ref, _results;
      TriangleRocks.__super__.init.call(this);
      this.instrId = "tempo";
      this.geometry = Loader.getGeometry("small_rocks");
      this.geometry.dynamic = true;
      this.geometry.computeFaceNormals();
      this.geometry.computeVertexNormals();
      _results = [];
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        material = new THREE.MeshLambertMaterial({
          color: this.params.color,
          ambient: this.params.color,
          emissive: this.params.color,
          shading: THREE.FlatShading,
          transparent: true
        });
        mesh = new THREE.Mesh(this.geometry, material);
        this.sprites[i] = mesh;
        this.reset(mesh);
        _results.push(this.container.add(mesh));
      }
      return _results;
    };

    TriangleRocks.prototype.onMidiChanged = function() {
      var i, sprite, _i;
      for (i = _i = 0; _i <= 10; i = ++_i) {
        sprite = this.getSprite();
        if (sprite == null) {
          return;
        }
        this.enableSprites.push(sprite);
        this.reset(sprite);
      }
    };

    TriangleRocks.prototype.getSprite = function() {
      if (this.sprites.length !== 0) {
        return this.sprites.shift();
      }
    };

    TriangleRocks.prototype.reset = function(b) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.08, 0.05, 2);
      b.angle = 0;
      b.radius = Math.random() * 2;
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(this.params.maxScale, 0.08, 2);
      b.angleForce = Util.Rand(15.1, 14.1, 1);
      b.xEasing = Util.Rand(0.09, 0.02, 2);
      b.yEasing = Util.Rand(0.02, 0.01, 2);
      b.zEasing = Util.Rand(0.5, 0.05, 2);
      b.zVelocity = Util.Rand(17, 7, 0);
      b.gravityX = 1;
      b.gravityY = 1;
      b.startPositionX = Dvorak.Mouse.projection.x;
      b.startPositionY = Dvorak.Mouse.projection.y;
      b.startPositionZ = Dvorak.Mouse.projection.z;
      b.startPositionY -= 40;
      b.rotationVel = Util.Rand(0.09, -0.05, 2);
      b.opacityVel = Util.Rand(0.2, 0.1, 1);
      b.opacity = 0;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.material.opacity = b.opacity;
      b.material.ambient.setHex(this.params.color);
      return b.scale.x = b.scale.y = b.scale.z = b.sc;
    };

    TriangleRocks.prototype.expand = function(b) {
      var newPosX, newPosY;
      b.angle += b.angleForce;
      if (b.scale.x < b.maxScale) {
        b.position.z += (Mouse.projection.z - b.position.z) * b.zEasing;
        b.scale.x = b.scale.y = b.scale.z += b.sVel;
        newPosX = Dvorak.Mouse.projection.x + Math.cos(b.angle) * b.radius;
        newPosY = Dvorak.Mouse.projection.y + Math.sin(b.angle) * b.radius;
      } else {
        newPosX = b.startPositionX + Math.cos(b.angle) * (b.radius * b.afterRadiusX);
        newPosY = b.startPositionY + Math.sin(b.angle) * (b.radius * b.afterRadiusY);
        newPosX *= b.gravityX;
        newPosY *= b.gravityY;
      }
      b.material.opacity += (1 - b.material.opacity) * b.opacityVel;
      b.rotation.x += b.rotationVel;
      b.rotation.y += b.rotationVel;
      b.rotation.z += b.rotationVel;
      newPosX *= b.gravityX;
      newPosY *= b.gravityY;
      b.position.x += (newPosX - b.position.x) * b.xEasing;
      b.position.y += (newPosY - b.position.y) * b.yEasing;
      return b.position.z -= b.zVelocity;
    };

    TriangleRocks.prototype.onUpdate = function() {
      var o, spr, _i, _len, _ref, _results;
      _ref = this.enableSprites;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        this.expand(o);
        if (Dvorak.Camera.camera.position.z > o.position.z) {
          spr = this.enableSprites.shift();
          this.sprites.push(spr);
          break;
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    return TriangleRocks;

  })(Movieclip);
  return TriangleRocks;
});
