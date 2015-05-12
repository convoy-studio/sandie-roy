var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var Floaters;
  Floaters = (function() {
    Floaters.prototype.sprites = void 0;

    Floaters.prototype.tl = void 0;

    function Floaters() {
      this.destroy = __bind(this.destroy, this);
      this.update = __bind(this.update, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.rotate = __bind(this.rotate, this);
      this.checkCollision = __bind(this.checkCollision, this);
      this.checkWalls = __bind(this.checkWalls, this);
      this.expand = __bind(this.expand, this);
      this.reset = __bind(this.reset, this);
      this.onUpdateTween = __bind(this.onUpdateTween, this);
      this.init = __bind(this.init, this);
    }

    Floaters.prototype.init = function() {
      var geom, geomCylinder, geomSphere, i, mat, matBlue, matRed, matYellow, randGeom, randMat, s, _i;
      this.container = new THREE.Group();
      this.tl = new TimelineMax({
        onUpdate: this.onUpdateTween
      });
      this.tweenVal = {
        val: 0
      };
      this.tl.fromTo(this.tweenVal, 1, {
        val: 0
      }, {
        val: 1,
        ease: Expo.easeOut
      });
      this.sprites = [];
      geomSphere = new THREE.SphereGeometry(10, 8, 40);
      geomCylinder = new THREE.CylinderGeometry(20, 20, 50, 40, 5);
      matRed = new THREE.MeshLambertMaterial({
        color: 0xc51905,
        ambient: 0xc51905,
        emissive: 0xc51905,
        shading: THREE.FlatShading
      });
      matBlue = new THREE.MeshLambertMaterial({
        color: 0x24b5e4,
        ambient: 0x24b5e4,
        emissive: 0x24b5e4,
        shading: THREE.FlatShading
      });
      matYellow = new THREE.MeshLambertMaterial({
        color: 0xf9f5d0,
        ambient: 0xf9f5d0,
        emissive: 0xf9f5d0,
        shading: THREE.FlatShading
      });
      for (i = _i = 0; _i <= 25; i = ++_i) {
        randMat = Math.random() * 1;
        mat = randMat <= 0.3 ? matBlue : randMat > 0.3 && randMat <= 0.8 ? matRed : matYellow;
        randGeom = Math.random() * 1;
        geom = randGeom <= 0.3 ? geomCylinder : geomSphere;
        s = new THREE.Mesh(geom, mat);
        this.sprites.push(s);
        this.reset(s, i);
        this.container.add(s);
      }
      this.onUpdateTween();
    };

    Floaters.prototype.onUpdateTween = function() {
      var b, sc, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        b = _ref[_i];
        sc = (this.tweenVal.val / 1) * b.maxScale;
        b.scale.x = b.scale.y = b.scale.z = sc;
      }
    };

    Floaters.prototype.reset = function(b, i) {
      b.sc = 0.01;
      b.sVel = Util.Rand(0.04, 0.01, 2);
      b.angle = Util.DegreesToRadians(Util.Rand(180, 100, 0)) * i;
      b.posRadiusX = Util.Rand(Model.windowW * 0.2, -Model.windowW * 0.2, 0);
      b.posRadiusY = Util.Rand(Model.windowH * 0.2, -Model.windowH * 0.2, 0);
      b.afterRadiusX = Util.Rand(1, -1, 1);
      b.afterRadiusY = Util.Rand(1, -1, 1);
      b.maxScale = Util.Rand(2.2, 0.1, 1);
      b.maxScale = b.geometry.type === "CylinderGeometry" ? b.maxScale * 0.3 : b.maxScale;
      b.angleForce = Util.Rand(6, 4, 0);
      b.zVelocity = Util.Rand(20, 10, 0);
      b.xRotationVel = b.geometry.type === "CylinderGeometry" ? Util.Rand(0.01, -0.01, 3) : 0;
      b.yRotationVel = b.geometry.type === "CylinderGeometry" ? Util.Rand(0.01, -0.01, 3) : 0;
      b.zRotationVel = b.geometry.type === "CylinderGeometry" ? Util.Rand(0.01, -0.01, 3) : 0;
      b.startPositionX = Math.cos(b.angle) * b.posRadiusX;
      b.startPositionY = Math.sin(b.angle) * b.posRadiusY;
      b.mass = b.maxScale * 0.35;
      b.radius = b.maxScale * 0.35;
      b.startPositionZ = 19 * i;
      b.direction = Math.random() * 1 < 0.45 ? 1 : -1;
      b.vx = b.direction * Util.Rand(0.08, 0.01, 3);
      b.vy = b.direction * Util.Rand(0.08, 0.01, 3);
      b.position.x = b.startPositionX;
      b.position.y = b.startPositionY;
      b.position.z = b.startPositionZ;
      b.scale.x = b.scale.y = b.scale.z = b.sc;
    };

    Floaters.prototype.expand = function(b) {
      b.position.x += Util.Limit(-0.8, 0.8, b.vx);
      b.position.y += Util.Limit(-0.8, 0.8, b.vy);
      b.rotation.x += b.xRotationVel;
      b.rotation.y += b.yRotationVel;
      b.rotation.z += b.zRotationVel;
    };

    Floaters.prototype.checkWalls = function(ball) {
      var bounce, xBound, yBound;
      xBound = 160;
      yBound = 160;
      bounce = -0.7;
      if (ball.position.x + ball.radius > xBound) {
        ball.position.x = xBound - ball.radius;
        ball.vx *= bounce;
      } else if (ball.position.x - ball.radius < -xBound) {
        ball.position.x = -xBound + ball.radius;
        ball.vx *= bounce;
      }
      if (ball.position.y + ball.radius > yBound) {
        ball.position.y = yBound - ball.radius;
        ball.vy *= bounce;
      } else if (ball.position.y - ball.radius < -yBound) {
        ball.position.y = -yBound + ball.radius;
        ball.vy *= bounce;
      }
    };

    Floaters.prototype.checkCollision = function(ball0, ball1) {
      var angle, cos, dist, dx, dy, pos0, pos0F, pos1, pos1F, sin, vel0, vel0F, vel1, vel1F, vxTotal;
      dx = ball1.position.x - ball0.position.x;
      dy = ball1.position.y - ball0.position.y;
      dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < ball0.radius + ball1.radius) {
        angle = Math.atan2(dy, dx);
        sin = Math.sin(angle);
        cos = Math.cos(angle);
        pos0 = {
          x: 0,
          y: 0
        };
        pos1 = this.rotate(dx, dy, sin, cos, true);
        vel0 = this.rotate(ball0.vx, ball0.vy, sin, cos, true);
        vel1 = this.rotate(ball1.vx, ball1.vy, sin, cos, true);
        vxTotal = vel0.x - vel1.x;
        vel0.x = ((ball0.mass - ball1.mass) * vel0.x + 2 * ball1.mass * vel1.x) / (ball0.mass + ball1.mass);
        vel1.x = vxTotal + vel0.x;
        pos0.x += vel0.x;
        pos1.x += vel1.x;
        pos0F = this.rotate(pos0.x, pos0.y, sin, cos, false);
        pos1F = this.rotate(pos1.x, pos1.y, sin, cos, false);
        ball1.position.x = ball0.position.x + pos1F.x;
        ball1.position.y = ball0.position.y + pos1F.y;
        ball0.position.x = ball0.position.x + pos0F.x;
        ball0.position.y = ball0.position.y + pos0F.y;
        vel0F = this.rotate(vel0.x, vel0.y, sin, cos, false);
        vel1F = this.rotate(vel1.x, vel1.y, sin, cos, false);
        ball0.vx = Util.Limit(-0.8, 0.8, vel0F.x);
        ball0.vy = Util.Limit(-0.8, 0.8, vel0F.y);
        ball1.vx = Util.Limit(-0.8, 0.8, vel1F.x);
        ball1.vy = Util.Limit(-0.8, 0.8, vel1F.y);
      }
    };

    Floaters.prototype.rotate = function(x, y, sin, cos, reverse) {
      var result;
      result = {
        x: 0,
        y: 0
      };
      if (reverse) {
        result.x = x * cos + y * sin;
        result.y = y * cos - x * sin;
      } else {
        result.x = x * cos - y * sin;
        result.y = y * cos + x * sin;
      }
      return result;
    };

    Floaters.prototype.transitionIn = function() {
      this.tl.timeScale(1.6);
      this.tl.play(0);
    };

    Floaters.prototype.transitionOut = function() {
      this.tl.timeScale(2.8);
      this.tl.reverse(0);
    };

    Floaters.prototype.update = function() {
      var i, j, partA, partB, _i, _j, _ref, _ref1, _ref2;
      this.container.rotation.z += 0.001;
      for (i = _i = 0, _ref = this.sprites.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; i = 0 <= _ref ? ++_i : --_i) {
        partA = this.sprites[i];
        this.expand(partA);
        this.checkWalls(partA);
        for (j = _j = _ref1 = i + 1, _ref2 = this.sprites.length; _ref1 <= _ref2 ? _j <= _ref2 : _j >= _ref2; j = _ref1 <= _ref2 ? ++_j : --_j) {
          partB = this.sprites[j];
          if (partB != null) {
            this.checkCollision(partA, partB);
            this.checkWalls(partB);
          }
        }
      }
    };

    Floaters.prototype.destroy = function() {
      var sprite, _i, _len, _ref;
      _ref = this.sprites;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        sprite = _ref[_i];
        Util.DestroyMesh(sprite, this.container);
        sprite = null;
      }
      this.tl.clear();
      this.sprites.length = 0;
      this.sprites = null;
    };

    return Floaters;

  })();
  return Floaters;
});
