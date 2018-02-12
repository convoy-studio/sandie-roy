var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["PartsPage"], function(PartsPage) {
  var RelationsPubliques;
  RelationsPubliques = class RelationsPubliques extends PartsPage {
    constructor(id, scope) {
      // scope.logoSimple = Loader.getSvg "logo-simple"
      // scope.progressArc = Loader.getSvg "progress-arc"
      // scope.titleBox = Loader.getSvg "title-box"
      // scope.heart = Loader.getSvg "heart"
      // scope.pictureIcon = Loader.getSvg "picture-icon"
      // scope.blankImg = Loader.getImageURL "blank-image"
      // scope.downloadIcon = Loader.getSvg "download-circle-icon"
      // scope.twitterIcon = Loader.getSvg "twitter-circle-icon"
      // scope.facebookIcon = Loader.getSvg "facebook-circle-icon"
      // scope.emailIcon = Loader.getSvg "email-circle-icon"
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
      boundMethodCheck(this, RelationsPubliques);
      return super.init(cb);
    }

    ready() {
      boundMethodCheck(this, RelationsPubliques);
      super.ready();
    }

    addAnimations() {
      boundMethodCheck(this, RelationsPubliques);
      super.addAnimations();
    }

    transitionIn() {
      boundMethodCheck(this, RelationsPubliques);
      super.transitionIn();
    }

    transitionOut() {
      boundMethodCheck(this, RelationsPubliques);
      super.transitionOut();
    }

    transitionInCompleted() {
      boundMethodCheck(this, RelationsPubliques);
      super.transitionInCompleted();
    }

    transitionOutCompleted() {
      boundMethodCheck(this, RelationsPubliques);
      super.transitionOutCompleted();
    }

    resize() {
      boundMethodCheck(this, RelationsPubliques);
      super.resize();
    }

    destroy() {
      boundMethodCheck(this, RelationsPubliques);
      super.destroy();
    }

  };
  return RelationsPubliques;
});
