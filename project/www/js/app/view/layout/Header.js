var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  "use strict";
  var Header;
  Header = (function(_super) {
    __extends(Header, _super);

    function Header(id, scope) {
      this.init = __bind(this.init, this);
      scope = {};
      scope.logo = Loader.getSvg("logo");
      Header.__super__.constructor.call(this, id, scope);
    }

    Header.prototype.init = function() {};

    return Header;

  })(View);
  return Header;
});
