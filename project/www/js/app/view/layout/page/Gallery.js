var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["Page"], function(Page) {
  var Gallery;
  Gallery = (function(_super) {
    __extends(Gallery, _super);

    function Gallery(id, scope) {
      this.destroy = __bind(this.destroy, this);
      this.resize = __bind(this.resize, this);
      this.transitionOutCompleted = __bind(this.transitionOutCompleted, this);
      this.transitionInCompleted = __bind(this.transitionInCompleted, this);
      this.transitionOut = __bind(this.transitionOut, this);
      this.transitionIn = __bind(this.transitionIn, this);
      this.addAnimations = __bind(this.addAnimations, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      scope.logoSimple = Loader.getSvg("logo-simple");
      scope.progressArc = Loader.getSvg("progress-arc");
      scope.titleBox = Loader.getSvg("title-box");
      scope.heart = Loader.getSvg("heart");
      scope.pictureIcon = Loader.getSvg("picture-icon");
      scope.blankImg = Loader.getImageURL("blank-image");
      scope.downloadIcon = Loader.getSvg("download-circle-icon");
      scope.twitterIcon = Loader.getSvg("twitter-circle-icon");
      scope.facebookIcon = Loader.getSvg("facebook-circle-icon");
      scope.emailIcon = Loader.getSvg("email-circle-icon");
      Gallery.__super__.constructor.call(this, id, scope);
    }

    Gallery.prototype.init = function(cb) {
      return Gallery.__super__.init.call(this, cb);
    };

    Gallery.prototype.ready = function() {
      Gallery.__super__.ready.call(this);
    };

    Gallery.prototype.addAnimations = function() {
      Gallery.__super__.addAnimations.call(this);
    };

    Gallery.prototype.transitionIn = function() {
      Gallery.__super__.transitionIn.call(this);
    };

    Gallery.prototype.transitionOut = function() {
      Gallery.__super__.transitionOut.call(this);
    };

    Gallery.prototype.transitionInCompleted = function() {
      Gallery.__super__.transitionInCompleted.call(this);
    };

    Gallery.prototype.transitionOutCompleted = function() {
      Gallery.__super__.transitionOutCompleted.call(this);
    };

    Gallery.prototype.resize = function() {
      Gallery.__super__.resize.call(this);
    };

    Gallery.prototype.destroy = function() {
      Gallery.__super__.destroy.call(this);
    };

    return Gallery;

  })(Page);
  return Gallery;
});
