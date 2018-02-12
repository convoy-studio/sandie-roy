var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var Production;
  Production = class Production extends PartsPage {
    constructor(id, scope) {
      scope.pathId = id;
      super(id, scope);
      this.init = this.init.bind(this);
      this.ready = this.ready.bind(this);
      this.addAnimations = this.addAnimations.bind(this);
      this.transitionIn = this.transitionIn.bind(this);
      this.transitionOut = this.transitionOut.bind(this);
      this.transitionInCompleted = this.transitionInCompleted.bind(this);
      this.transitionOutCompleted = this.transitionOutCompleted.bind(this);
      this.resize = this.resize.bind(this);
      this.destroy = this.destroy.bind(this);
    }

    init(cb) {
      boundMethodCheck(this, Production);
      return super.init(cb);
    }

    ready() {
      boundMethodCheck(this, Production);
      super.ready();
    }

    addAnimations() {
      boundMethodCheck(this, Production);
      super.addAnimations();
    }

    transitionIn() {
      boundMethodCheck(this, Production);
      super.transitionIn();
    }

    transitionOut() {
      boundMethodCheck(this, Production);
      super.transitionOut();
    }

    transitionInCompleted() {
      boundMethodCheck(this, Production);
      super.transitionInCompleted();
    }

    transitionOutCompleted() {
      boundMethodCheck(this, Production);
      super.transitionOutCompleted();
    }

    resize() {
      boundMethodCheck(this, Production);
      super.resize();
    }

    destroy() {
      boundMethodCheck(this, Production);
      super.destroy();
    }

  };
  return Production;
});
