var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["ParticlesGroup", "Movieclip"], function(ParticlesGroup, Movieclip) {
  "use strict";
  var MouseFollower;
  MouseFollower = (function(_super) {
    __extends(MouseFollower, _super);

    MouseFollower.prototype.activeParticles = true;

    MouseFollower.prototype.particleColor = 0x686666;

    function MouseFollower() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.onParticleCreated = __bind(this.onParticleCreated, this);
      this.onColorStateChanged = __bind(this.onColorStateChanged, this);
      this.init = __bind(this.init, this);
      this.captColor = [];
      this.captPosition = [];
      this.captScale = [];
      MouseFollower.__super__.constructor.call(this);
    }

    MouseFollower.prototype.init = function() {
      MouseFollower.__super__.init.call(this);
      this.particlesGroup = new ParticlesGroup();
      this.particlesGroup.container = this.container;
      this.particlesGroup.onParticleCreated = this.onParticleCreated;
      this.particlesGroup.particlesLength = 300;
      this.particlesGroup.steadyCounter = 160;
      this.particlesGroup.texture = Loader.getTexture("ball_gray-texture");
      this.particlesGroup.color = new THREE.Color(0x686666);
      this.particlesGroup.velocity = new THREE.Vector3(0, -5, 13);
      this.particlesGroup.accelerate = new THREE.Vector3(0, 0, -150);
      this.particlesGroup.randomDrift = new THREE.Vector3(800, 1000, 3000);
      this.particlesGroup.size = 100;
      this.particlesGroup.minSize = 100;
      this.particlesGroup.maxSize = 360;
      this.particlesGroup.randSize = true;
      this.particlesGroup.minLife = 0;
      this.particlesGroup.maxLife = 3;
      this.particlesGroup.isEditor = this.isEditor;
      this.particlesGroup.init();
    };

    MouseFollower.prototype.onColorStateChanged = function() {
      if (Bernstein.Color.state === "RED") {
        this.particleColor = [0xffffff, 0xffc3c3];
      } else if (Bernstein.Color.state === "BLUE") {
        this.particleColor = [0xffffff, 0xc3eaff];
      } else if (Bernstein.Color.state === "WHITE") {
        this.particleColor = [0x474b5e, 0x149ee9];
      }
    };

    MouseFollower.prototype.onParticleCreated = function(p) {
      var target;
      target = p.target;
      if (target) {
        this.particlesGroup.emitterpos.x += (Bernstein.Mouse.projection.x - this.particlesGroup.emitterpos.x) * 0.1;
        this.particlesGroup.emitterpos.y += (Bernstein.Mouse.projection.y - this.particlesGroup.emitterpos.y) * 0.1;
        this.particlesGroup.emitterpos.y += 10.8;
        this.particlesGroup.emitterpos.z += (Bernstein.Mouse.projection.z - this.particlesGroup.emitterpos.z) * 0.1;
        this.particlesGroup.values_color[target].setHex(this.particleColor[0]);
        this.particlesGroup.values_size[target] = Math.random() * 200 + (Sound.frequency / 200) * 400;
        this.particlesGroup.particles.vertices[target] = p.position;
      }
    };

    MouseFollower.prototype.onUpdate = function() {
      if (this.activeParticles) {
        this.particlesGroup.onUpdate();
      }
    };

    MouseFollower.prototype.transitionIn = function() {
      this.particlesGroup.emitterpos.x = 0;
      this.particlesGroup.emitterpos.y = 0;
      this.particlesGroup.emitterpos.z = -100;
      Signal.colorStateChanged.add(this.onColorStateChanged);
      this.particlesGroup.transitionIn();
      this.onColorStateChanged();
      MouseFollower.__super__.transitionIn.call(this);
    };

    MouseFollower.prototype.transitionOut = function() {
      Signal.colorStateChanged.remove(this.onColorStateChanged);
      this.particlesGroup.transitionOut();
      MouseFollower.__super__.transitionOut.call(this);
    };

    MouseFollower.prototype.collectParams = function() {
      var i, _i, _ref;
      MouseFollower.__super__.collectParams.call(this);
      this.collection.spritesNum = this.particlesGroup.particlesLength;
      this.captPosition.length = 0;
      this.captColor.length = 0;
      this.captScale.length = 0;
      for (i = _i = 0, _ref = this.particlesGroup.values_color.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.captPosition.push(this.particlesGroup.particles.vertices[i].x, this.particlesGroup.particles.vertices[i].y, this.particlesGroup.particles.vertices[i].z);
        this.captColor.push(this.particlesGroup.values_color[i].r, this.particlesGroup.values_color[i].g, this.particlesGroup.values_color[i].b);
        this.captScale.push(this.particlesGroup.values_size[i]);
      }
      this.collection.position = this.captPosition;
      this.collection.color = this.captColor;
      this.collection.scale = this.captScale;
      this.collection.emitterPos = [this.particlesGroup.emitterpos.x, this.particlesGroup.emitterpos.y, this.particlesGroup.emitterpos.z];
      return this.collection;
    };

    MouseFollower.prototype.applyParams = function(capture) {
      var i, j, _i, _ref;
      this.particlesGroup.emitterpos.set(capture.emitterPos[0], capture.emitterPos[1], capture.emitterPos[2]);
      j = 0;
      for (i = _i = 0, _ref = capture.spritesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.particlesGroup.values_color[i].setRGB(capture.color[j], capture.color[j + 1], capture.color[j + 2]);
        this.particlesGroup.values_size[i] = capture.scale[i];
        this.particlesGroup.particles.vertices[i].set(capture.position[j], capture.position[j + 1], capture.position[j + 2]);
        j += 3;
      }
      this.particlesGroup.onUpdate();
    };

    return MouseFollower;

  })(Movieclip);
  return MouseFollower;
});
