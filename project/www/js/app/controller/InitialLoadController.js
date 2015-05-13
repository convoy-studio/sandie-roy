var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var InitialLoadController;
  InitialLoadController = (function() {
    InitialLoadController.prototype.callback = void 0;

    function InitialLoadController(cb) {
      this.loadImagesAndTexts = __bind(this.loadImagesAndTexts, this);
      this.callback = cb;
      this.loadImagesAndTexts();
    }

    InitialLoadController.prototype.loadImagesAndTexts = function() {
      var basePath, manifest;
      basePath = Model.imageBasePath;
      manifest = [
        {
          id: "footer-partial",
          src: "partial/layout/footer.html"
        }, {
          id: "header-partial",
          src: "partial/layout/header.html"
        }, {
          id: "pages-loader-partial",
          src: "partial/layout/pages-loader.html"
        }, {
          id: "timeline-menu-partial",
          src: "partial/layout/timeline-menu.html"
        }, {
          id: "top-container-partial",
          src: "partial/layout/top-container.html"
        }, {
          id: "relations-presse-partial",
          src: "partial/page/relations-presse.html"
        }, {
          id: "relations-publiques-partial",
          src: "partial/page/relations-publiques.html"
        }, {
          id: "awwwards-logo-svg",
          src: "svg/awwwards-logo.svg",
          type: createjs.LoadQueue.TEXT
        }, {
          id: "logo-svg",
          src: "svg/logo.svg",
          type: createjs.LoadQueue.TEXT
        }, {
          id: "about-hd-image",
          src: "image/global/about-hd.jpg"
        }, {
          id: "blank-image",
          src: "image/global/blank.gif"
        }, {
          id: "production-hd-image",
          src: "image/global/production-hd.jpg"
        }, {
          id: "relations-presse-hd-image",
          src: "image/global/relations-presse-hd.jpg"
        }, {
          id: "relations-publiques-hd-image",
          src: "image/global/relations-publiques-hd.jpg"
        }
      ];
      return Loader.load(manifest, this.callback);
    };

    return InitialLoadController;

  })();
  return InitialLoadController;
});
