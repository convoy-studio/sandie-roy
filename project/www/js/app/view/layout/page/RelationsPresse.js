var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["PartsPage"], function(PartsPage) {
  "use strict";
  var RelationsPresse;
  RelationsPresse = class RelationsPresse extends PartsPage {
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
      boundMethodCheck(this, RelationsPresse);
      return super.init(cb);
    }

    ready() {
      boundMethodCheck(this, RelationsPresse);
      super.ready();
    }

    addAnimations() {
      boundMethodCheck(this, RelationsPresse);
      super.addAnimations();
    }

    transitionIn() {
      boundMethodCheck(this, RelationsPresse);
      super.transitionIn();
    }

    transitionOut() {
      boundMethodCheck(this, RelationsPresse);
      super.transitionOut();
    }

    transitionInCompleted() {
      boundMethodCheck(this, RelationsPresse);
      super.transitionInCompleted();
    }

    transitionOutCompleted() {
      boundMethodCheck(this, RelationsPresse);
      super.transitionOutCompleted();
    }

    resize() {
      boundMethodCheck(this, RelationsPresse);
      super.resize();
    }

    destroy() {
      boundMethodCheck(this, RelationsPresse);
      super.destroy();
    }

  };
  return RelationsPresse;
});
