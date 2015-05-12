var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Movieclip"], function(Movieclip) {
  var ObjectColorSwitcher;
  ObjectColorSwitcher = (function(_super) {
    __extends(ObjectColorSwitcher, _super);

    ObjectColorSwitcher.prototype.startPosZ = 4000;

    ObjectColorSwitcher.prototype.beginPosZ = 0;

    ObjectColorSwitcher.prototype.offsetPosZ = 0;

    function ObjectColorSwitcher() {
      this.applyParams = __bind(this.applyParams, this);
      this.collectParams = __bind(this.collectParams, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.init = __bind(this.init, this);
      ObjectColorSwitcher.__super__.constructor.call(this);
    }

    ObjectColorSwitcher.prototype.init = function() {
      var scale, vert, _i, _len, _ref;
      ObjectColorSwitcher.__super__.init.call(this);
      this.geom = Loader.getGeometry(this.params.geom);
      scale = this.params.scale;
      _ref = this.geom.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vert = _ref[_i];
        vert.multiplyScalar(scale);
      }
      this.mat = new THREE.MeshBasicMaterial({
        color: this.params.color,
        side: THREE.BackSide
      });
      this.mesh = new THREE.Mesh(this.geom, this.mat);
      this.container.add(this.mesh);
    };

    ObjectColorSwitcher.prototype.onUpdate = function() {
      var zUnit;
      this.mesh.position.x = this.camera.position.x;
      this.mesh.position.y = this.camera.position.y;
      this.offsetPosZ = this.mesh.position.z - this.camera.position.z;
      zUnit = 1 - ((this.offsetPosZ / this.beginPosZ) * 1);
      this.mesh.position.z -= zUnit * 150;
      this.mesh.scale.x = this.mesh.scale.y = zUnit;
    };

    ObjectColorSwitcher.prototype.transitionIn = function() {
      this.assignCamera();
      this.mesh.position.z = this.camera.position.z + this.startPosZ;
      this.beginPosZ = this.mesh.position.z - this.camera.position.z;
      ObjectColorSwitcher.__super__.transitionIn.call(this);
    };

    ObjectColorSwitcher.prototype.collectParams = function() {
      ObjectColorSwitcher.__super__.collectParams.call(this);
      this.collection.setup = this.params;
      this.collection.position = [this.mesh.position.x, this.mesh.position.y, this.mesh.position.z];
      this.collection.scale = [this.mesh.scale.x, this.mesh.scale.y, this.mesh.scale.z];
      return this.collection;
    };

    ObjectColorSwitcher.prototype.applyParams = function(capture) {
      this.params = capture.setup;
      this.mesh.position.set(capture.position[0], capture.position[1], capture.position[2]);
      this.mesh.scale.set(capture.scale[0], capture.scale[1], capture.scale[2]);
      return ObjectColorSwitcher.__super__.applyParams.call(this);
    };

    return ObjectColorSwitcher;

  })(Movieclip);
  return ObjectColorSwitcher;
});
