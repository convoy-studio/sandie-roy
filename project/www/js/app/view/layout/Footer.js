var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  "use strict";
  var Footer;
  Footer = (function(_super) {
    __extends(Footer, _super);

    function Footer(id, scope) {
      this.init = __bind(this.init, this);
      scope = {};
      scope.footerTitle = Model.content["footer-title"];
      Footer.__super__.constructor.call(this, id, scope);
    }

    Footer.prototype.init = function() {};

    return Footer;

  })(View);
  return Footer;
});
