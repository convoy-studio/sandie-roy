var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  "use strict";
  var Chords;
  Chords = (function(_super) {
    __extends(Chords, _super);

    Chords.prototype.spritesNum = 6;

    function Chords() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.reset = __bind(this.reset, this);
      this.expand = __bind(this.expand, this);
      this.setupMatGeom = __bind(this.setupMatGeom, this);
      this.init = __bind(this.init, this);
      this.captPosition = [];
      this.captRotation = [];
      this.captScale = [];
      this.sprites = [];
      Chords.__super__.constructor.call(this);
    }

    Chords.prototype.init = function() {
      var c, i, _i, _ref;
      Chords.__super__.init.call(this);
      this.setupMatGeom();
      for (i = _i = 0, _ref = this.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        c = new THREE.Mesh(this.geom, this.mat);
        this.reset(c, i);
        this.container.add(c);
        this.sprites[i] = c;
      }
    };

    Chords.prototype.setupMatGeom = function() {
      var attributes, fragShader, uniforms, vertShader;
      this.geom = new THREE.PlaneBufferGeometry(800, 2);
      uniforms = {
        colorA: {
          type: "c",
          value: new THREE.Color(0xf12338)
        },
        colorB: {
          type: "c",
          value: new THREE.Color(0x69d5fb)
        },
        gradientOrigin: {
          type: "f",
          value: 0.75
        }
      };
      attributes = {
        size: {
          type: 'f',
          value: []
        }
      };
      vertShader = Loader.getShader("gradient-vertex");
      fragShader = Loader.getShader("gradient-fragment");
      this.mat = new THREE.ShaderMaterial({
        uniforms: uniforms,
        attributes: attributes,
        vertexShader: vertShader,
        fragmentShader: fragShader,
        side: THREE.DoubleSide,
        transparent: true
      });
    };

    Chords.prototype.expand = function(c) {
      if (c.scale.x < 4) {
        c.scale.x += (1 + c.scale.x) * 0.06;
      } else {
        c.position.x -= 25;
        c.position.y += 25;
      }
    };

    Chords.prototype.reset = function(c, i) {
      var mult;
      mult = 1;
      if (mult === 1) {
        c.rotation.z = Util.DegreesToRadians(-30);
        c.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-100, 0, 0));
        c.position.x = Util.Rand(400, -100, 0);
        c.position.y = Util.Rand(200, -200, 0);
        c.position.z = 30 + (80 * i);
        c.scale.x = 0.00001;
      }
    };

    Chords.prototype.onUpdate = function() {
      this.container.position.y = this.camera.position.y - 300;
      this.container.position.z = this.camera.position.z + 140;
      this.container.position.x = this.camera.position.x + 350;
      if (Sound.instance.getPosition() > 610 && Sound.instance.getPosition() < 1850) {
        this.expand(this.sprites[0]);
        this.expand(this.sprites[1]);
        this.expand(this.sprites[2]);
      }
      if (Sound.instance.getPosition() > 1850) {
        this.expand(this.sprites[3]);
        this.expand(this.sprites[4]);
        this.expand(this.sprites[5]);
      }
    };

    Chords.prototype.collectParams = function() {
      var sprite, _i, _len, _ref;
      Chords.__super__.collectParams.call(this);
      this.collection.spritesNum = this.spritesNum;
      this.collection.containerPos = [this.container.position.x, this.container.position.y, this.container.position.z];
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

    Chords.prototype.applyParams = function(capture) {
      var i, j, s, spritesNum, _i, _ref;
      spritesNum = capture.spritesNum;
      if (spritesNum <= 0) {
        return;
      }
      this.container.position.set(capture.containerPos[0], capture.containerPos[1], capture.containerPos[2]);
      j = 0;
      for (i = _i = 0, _ref = spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        s = this.sprites[i];
        s.geometry.applyMatrix(new THREE.Matrix4().makeTranslation(-100, 0, 0));
        s.position.set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        s.rotation.set(capture.rotation[j], capture.rotation[j + 1], capture.rotation[j + 2]);
        s.scale.set(capture.scale[j], capture.scale[j + 1], capture.scale[j + 2]);
        j += 3;
      }
    };

    return Chords;

  })(Movieclip);
  return Chords;
});
