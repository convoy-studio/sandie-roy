var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["View"], function(View) {
  var Contact;
  Contact = (function(_super) {
    __extends(Contact, _super);

    function Contact(id, scope) {
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
      Contact.__super__.constructor.call(this, id, scope);
    }

    Contact.prototype.init = function() {
      TweenMax.delayedCall(0.1, this.ready);
    };

    Contact.prototype.ready = function() {
      console.log("go");
    };

    return Contact;

  })(View);
  return Contact;
});
