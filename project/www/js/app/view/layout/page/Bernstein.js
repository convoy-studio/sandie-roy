var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["SongPage"], function(SongPage) {
  var Bernstein;
  Bernstein = (function(_super) {
    __extends(Bernstein, _super);

    function Bernstein(id, scope) {
      scope.startBtnTxt = Model.content["startBtnTxt"];
      scope.concertBtnTxt = Model.content["concertBtnTxt"];
      scope.concertImage = Loader.getImageURL(id + "-bernstein");
      Bernstein.__super__.constructor.call(this, id, scope);
    }

    return Bernstein;

  })(SongPage);
  return Bernstein;
});
