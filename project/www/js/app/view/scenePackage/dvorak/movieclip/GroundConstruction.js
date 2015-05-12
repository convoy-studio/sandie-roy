var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  "use strict";
  var GroundConstruction;
  GroundConstruction = (function(_super) {
    __extends(GroundConstruction, _super);

    GroundConstruction.prototype.particleSystem = void 0;

    GroundConstruction.prototype.particlesNum = 500;

    GroundConstruction.prototype.velocities = void 0;

    GroundConstruction.prototype.particlesParams = void 0;

    function GroundConstruction() {
      this.onUpdate = __bind(this.onUpdate, this);
      this.reset = __bind(this.reset, this);
      this.init = __bind(this.init, this);
      GroundConstruction.__super__.constructor.call(this);
      this.velocities = [];
      this.particlesParams = [];
    }

    GroundConstruction.prototype.init = function() {
      var i, pMaterial, particle, particles, px, py, pz, sprite, _i, _j, _ref, _ref1, _results;
      GroundConstruction.__super__.init.call(this);
      sprite = Loader.getTexture("ball_gold-texture");
      particles = new THREE.Geometry();
      for (i = _i = 0, _ref = this.particlesNum - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        this.particlesParams.push({});
        px = Util.Rand(500, -500, 0);
        py = Util.Rand(500, -500, 0);
        pz = Util.Rand(500, -500, 0);
        particle = new THREE.Vector3(px, py, pz);
        this.velocities.push(new THREE.Vector3(0, 0, -Util.Rand(150, 50, 0)));
        this.reset(this.particlesParams[i]);
        particles.vertices.push(particle);
      }
      this.uniforms = {
        texture: {
          type: 't',
          value: sprite
        },
        color: {
          type: "c",
          value: new THREE.Color(0xff0000)
        }
      };
      this.attributes = {
        scale: {
          type: 'f',
          value: []
        }
      };
      pMaterial = new THREE.ShaderMaterial({
        uniforms: this.uniforms,
        attributes: this.attributes,
        vertexShader: Loader.getShader("point-vertex"),
        fragmentShader: Loader.getShader("point-fragment"),
        transparent: true
      });
      this.particleSystem = new THREE.PointCloud(particles, pMaterial);
      this.particleSystem.sortParticles = true;
      this.container.add(this.particleSystem);
      _results = [];
      for (i = _j = 0, _ref1 = this.particlesNum - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        _results.push(this.attributes.scale.value[i] = Math.random() * 1);
      }
      return _results;
    };

    GroundConstruction.prototype.reset = function(p) {
      p.velocityX = Util.Rand(0.2, -0.2, 1);
      p.velocityY = Util.Rand(1.8, 0, 1);
      p.velocityZ = Util.Rand(60, 40, 2);
      p.positionX = Mouse.projection.x;
      p.positionY = Mouse.projection.y - Camera.originalPosY;
      p.positionZ = Mouse.projection.z - Camera.camera.position.z;
      return p.scale = Math.random() * 1;
    };

    GroundConstruction.prototype.onUpdate = function() {
      var pCount, params, particle, particles, scale, velocity, _results;
      if (!Camera.isTweeningCamera) {
        this.particleSystem.position.y = Camera.originalPosY;
      }
      this.particleSystem.position.z = Camera.camera.position.z;
      particles = this.particleSystem.geometry;
      pCount = this.particlesNum;
      _results = [];
      while (pCount--) {
        particle = particles.vertices[pCount];
        params = this.particlesParams[pCount];
        velocity = this.velocities[pCount];
        scale = this.attributes.scale.value[pCount];
        if (particle.z < 0) {
          this.reset(params);
          particle.x = params.positionX;
          particle.y = params.positionY;
          particle.z = params.positionZ;
          scale = params.scale;
        }
        particle.x += params.velocityX;
        particle.y += params.velocityY;
        particle.z -= params.velocityZ;
        _results.push(this.attributes.scale.needsUpdate = true);
      }
      return _results;
    };

    return GroundConstruction;

  })(Movieclip);
  return GroundConstruction;
});
