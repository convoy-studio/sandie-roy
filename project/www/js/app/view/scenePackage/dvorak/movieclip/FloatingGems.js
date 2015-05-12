var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  var FloatingGems;
  FloatingGems = (function(_super) {
    __extends(FloatingGems, _super);

    FloatingGems.prototype.spritesNum = 16;

    function FloatingGems() {
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
      this.captColor = [];
      FloatingGems.__super__.constructor.call(this);
    }

    FloatingGems.prototype.init = function() {
      var color, i, mat, s, tex, _i, _ref;
      FloatingGems.__super__.init.call(this);
      this.instrId = "violoncelli";
      this.setupMatGeom();
      tex = Loader.getTexture("SphereSurface_Color-texture");
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        color = Math.random() * 1 < 0.45 ? 0x1eaba3 : 0x083646;
        mat = new THREE.MeshBasicMaterial({
          map: tex,
          color: color,
          transparent: true
        });
        s = new THREE.Mesh(this.geom, mat);
        this.sprites[i] = s;
        this.sprites[i].active = false;
        s.angle = 0;
        this.reset(s);
        this.container.add(s);
      }
    };

    FloatingGems.prototype.setupMatGeom = function() {
      this.geom = Loader.getGeometry("tall-gem");
    };

    FloatingGems.prototype.onMidiChanged = function() {
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

    FloatingGems.prototype.reset = function(b) {
      b.sc = 0.01;
      b.maxScale = Util.Rand(this.params.scale[0], this.params.scale[1], 2);
      b.radius = Util.Rand(this.params.radius, -this.params.radius, 0);
      b.sVel = Util.Rand(this.params.velocity[0], this.params.velocity[1], 2);
      b.zRotationVel = Util.Rand(0.07, 0.01, 2);
      b.gravity = Util.Rand(6, 1.2, 2);
      b.startPositionX = this.mouseProjection.x + Math.cos(b.angle) * b.radius;
      b.startPositionY = this.mouseProjection.y + Math.sin(b.angle) * b.radius;
      b.startPositionZ = this.mouseProjection.z;
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
      b.scale.y *= 3;
      return b.material.opacity = 1;
    };

    FloatingGems.prototype.expand = function(b) {
      var prevScale;
      b.angle += 0.3;
      if (b.scale.x < b.maxScale) {
        prevScale = b.scale.x;
        b.scale.x = b.scale.y = b.scale.z += (b.maxScale - prevScale) * b.sVel;
      }
      b.position.y += b.gravity;
      b.rotation.y += b.gravity * 0.02;
      if (this.camera.position.z > b.position.z) {
        this.restart(b);
      }
    };

    FloatingGems.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      FloatingGems.__super__.collectParams.call(this);
      this.collection.spritesNum = this.sprites.length;
      this.collection.setup = this.params;
      this.captPosition.length = 0;
      this.captRotation.length = 0;
      this.captScale.length = 0;
      this.captColor.length = 0;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        if (sprite.active) {
          this.captPosition.push(sprite.position.x, sprite.position.y, sprite.position.z);
          this.captRotation.push(sprite.rotation.x, sprite.rotation.y, sprite.rotation.z);
          this.captScale.push(sprite.scale.x, sprite.scale.y, sprite.scale.z);
          this.captColor.push(sprite.material.color.r, sprite.material.color.g, sprite.material.color.b);
        }
      }
      this.collection.position = this.captPosition;
      this.collection.rotation = this.captRotation;
      this.collection.scale = this.captScale;
      this.collection.color = this.captColor;
      return this.collection;
    };

    FloatingGems.prototype.applyParams = function(capture) {
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
        s.material.color.setRGB(capture.color[j], capture.color[j + 1], capture.color[j + 2]);
        j += 3;
      }
    };

    return FloatingGems;

  })(MidiSprites);
  return FloatingGems;
});
