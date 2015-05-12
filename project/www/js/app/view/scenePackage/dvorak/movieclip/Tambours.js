var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["MidiSprites"], function(MidiSprites) {
  "use strict";
  var Tambours;
  Tambours = (function(_super) {
    __extends(Tambours, _super);

    Tambours.prototype.spritesNum = 10;

    function Tambours() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.collapse = __bind(this.collapse, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.createBouncer = __bind(this.createBouncer, this);
      this.changeBouncersColors = __bind(this.changeBouncersColors, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      Tambours.__super__.constructor.call(this);
    }

    Tambours.prototype.init = function() {
      var b, i, _i, _ref;
      Tambours.__super__.init.call(this);
      this.instrId = "timpani";
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        b = this.createBouncer("#ffffff", "#b4b4b4");
        this.container.add(b);
        b.passedOnce = false;
        this.reset(b);
        this.sprites[i] = b;
        this.sprites[i].active = false;
      }
    };

    Tambours.prototype.setupMatGeom = function() {
      this.geom = new THREE.CircleGeometry(80, 60);
    };

    Tambours.prototype.onColorStateChanged = function() {
      var b, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        this.changeBouncersColors(b);
      }
    };

    Tambours.prototype.changeBouncersColors = function(b) {
      var backColor, frontColor;
      if (Dvorak.Color.state === "WHITE") {
        frontColor = Dvorak.Color.WHITE;
        backColor = Dvorak.Color.LIGHT_WHITE;
        b.children[0].material.uniforms.color.value.setRGB(backColor.r, backColor.g, backColor.b);
        b.children[1].material.uniforms.color.value.setRGB(frontColor.r, frontColor.g, frontColor.b);
      } else if (Dvorak.Color.state === "BLUE") {
        frontColor = Dvorak.Color.BLUE_GRAY;
        backColor = Dvorak.Color.LIGHT_WHITE;
        b.children[0].material.uniforms.color.value.setRGB(backColor.r, backColor.g, backColor.b);
        b.children[1].material.uniforms.color.value.setRGB(frontColor.r, frontColor.g, frontColor.b);
      } else if (Dvorak.Color.state === "GREEN") {
        frontColor = Dvorak.Color.WHITE;
        backColor = Dvorak.Color.LIGHT_WHITE;
        b.children[0].material.uniforms.color.value.setRGB(backColor.r, backColor.g, backColor.b);
        b.children[1].material.uniforms.color.value.setRGB(frontColor.r, frontColor.g, frontColor.b);
      }
    };

    Tambours.prototype.createBouncer = function(frontColor, backColor) {
      var bounceHolder, matA, matB, meshBack, meshFront;
      bounceHolder = new THREE.Group();
      matA = Util.MeshColorMaterial(backColor, 0, THREE.BackSide);
      meshFront = new THREE.Mesh(this.geom, matA);
      matB = Util.MeshColorMaterial(frontColor, 0, THREE.BackSide);
      meshBack = new THREE.Mesh(this.geom, matB);
      meshBack.position.z = -2;
      meshBack.position.x = 4;
      meshBack.position.y = 4;
      bounceHolder.add(meshBack);
      bounceHolder.add(meshFront);
      return bounceHolder;
    };

    Tambours.prototype.reset = function(o) {
      var zPos;
      o.scale.set(0.01, 0.01, 0.01);
      o.maxScale = Util.Rand(10, 6, 0);
      o.sVel = Util.Rand(0.2, 0.09, 2);
      o.minZ = o.passedOnce ? 0 : 4200;
      zPos = Util.Rand(4200, o.minZ, 0);
      o.zMult = (zPos / 4200) * 1;
      o.position.x = Util.Rand(2100, -2100, 0);
      o.position.y = Util.Rand(1000, 900, 0) - (1000 * o.zMult);
      o.position.z = this.camera.position.z + zPos;
      o.passedOnce = true;
      o.children[0].material.uniforms.opacity.value = 0;
      o.children[1].material.uniforms.opacity.value = 0;
    };

    Tambours.prototype.expand = function(o) {
      var prevScale;
      if (o.scale.x < o.maxScale) {
        prevScale = o.scale.x;
        o.scale.x = o.scale.y = o.scale.z += (o.maxScale - prevScale) * o.sVel;
      }
      if (o.children[0].material.uniforms.opacity.value < 1) {
        o.children[0].material.uniforms.opacity.value += 0.1;
        o.children[1].material.uniforms.opacity.value = o.children[0].material.uniforms.opacity.value;
      }
      o.position.y += 10 * o.zMult;
      if (this.camera.position.z > o.position.z) {
        this.restart(o);
      }
    };

    Tambours.prototype.onUpdate = function() {
      Tambours.__super__.onUpdate.call(this);
      this.container.position.y = this.camera.position.y + 400;
    };

    Tambours.prototype.collapse = function() {
      var o, prevScale, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        o = _ref[_i];
        if (o.scale.x > 0.01) {
          prevScale = o.scale.x;
          o.scale.x = o.scale.y = o.scale.z -= (prevScale - 0.01) * o.sVel;
        }
      }
    };

    Tambours.prototype.transitionIn = function() {
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.onColorStateChanged();
      Tambours.__super__.transitionIn.call(this);
    };

    Tambours.prototype.transitionOut = function(forced) {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      Tambours.__super__.transitionOut.call(this, forced);
    };

    Tambours.prototype.collectParams = function() {
      var bColor, fColor, sprite, _i, _len, _ref;
      Tambours.__super__.collectParams.call(this);
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
      this.collection.containerPos = [this.container.position.x, this.container.position.y, this.container.position.z];
      if (this.collection.spritesNum < 1) {
        return;
      }
      bColor = this.sprites[0].children[0].material.uniforms.color.value;
      fColor = this.sprites[0].children[1].material.uniforms.color.value;
      this.collection.backColor = [bColor.r, bColor.g, bColor.b];
      this.collection.frontColor = [fColor.r, fColor.g, fColor.b];
      return this.collection;
    };

    Tambours.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.children[0].material.uniforms.color.value.setRGB(capture.backColor[0], capture.backColor[1], capture.backColor[2]);
        s.children[1].material.uniforms.color.value.setRGB(capture.frontColor[0], capture.frontColor[1], capture.frontColor[2]);
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
      this.container.position.set(capture.containerPos[0], capture.containerPos[1], capture.containerPos[2]);
    };

    return Tambours;

  })(MidiSprites);
  return Tambours;
});
