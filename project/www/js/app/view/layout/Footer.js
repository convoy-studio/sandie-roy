var boundMethodCheck = function(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new Error('Bound instance method accessed before binding'); } };

define(["View"], function(View) {
  "use strict";
  var Footer;
  Footer = class Footer extends View {
    constructor(id, scope) {
      scope = {};
      scope.footerTitle = Model.content["footer-title"];
      super(id, scope);
      this.init = this.init.bind(this);
    }

    init() {
      boundMethodCheck(this, Footer);
    }

  };
  return Footer;
});
