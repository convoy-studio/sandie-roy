var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

define([], function() {
  "use strict";
  var SoundHelper;
  SoundHelper = (function() {
    SoundHelper.prototype.element = void 0;

    SoundHelper.prototype.mouseFollowTime = void 0;

    function SoundHelper() {
      this.destroy = __bind(this.destroy, this);
      this.onUpdate = __bind(this.onUpdate, this);
      this.onStopClicked = __bind(this.onStopClicked, this);
      this.onPauseClicked = __bind(this.onPauseClicked, this);
      this.onPlayClicked = __bind(this.onPlayClicked, this);
      this.getTimeFormatStr = __bind(this.getTimeFormatStr, this);
      this.updateMouseFollowTime = __bind(this.updateMouseFollowTime, this);
      this.updateTime = __bind(this.updateTime, this);
      this.updateTimeline = __bind(this.updateTimeline, this);
      this.onLineMouseLeave = __bind(this.onLineMouseLeave, this);
      this.onLineMouseEnter = __bind(this.onLineMouseEnter, this);
      this.onLineClicked = __bind(this.onLineClicked, this);
      this.createPlayer = __bind(this.createPlayer, this);
      this.ready = __bind(this.ready, this);
      this.init = __bind(this.init, this);
    }

    SoundHelper.prototype.init = function() {
      return this.ready();
    };

    SoundHelper.prototype.ready = function() {
      this.element = $(".debug-container");
      return this.createPlayer();
    };

    SoundHelper.prototype.createPlayer = function() {
      var $el;
      $el = $("                <div class='mouse-follow-time'>                    <div class='time-holder'>00:00</div>                </div>                <div class='sound-timeline'>                    <div class='controls'>                        <div class='play ctrl'>Play</div>                        <div class='pause ctrl'>Pause</div>                        <div class='stop ctrl'>Stop</div>                    </div>                    <div class='timeline'>                        <div class='base-line'></div>                        <div class='time-position-line'></div>                    </div>                    <div class='time'>                        <div class='time-holder'>00:00 / 00:00</div>                    </div>                </div>            ");
      this.element.append($el);
      this.mouseFollowTime = this.element.find(".mouse-follow-time");
      this.mouseFollowTime.addClass("hide");
      this.element.find(".play").on("click", this.onPlayClicked);
      this.element.find(".pause").on("click", this.onPauseClicked);
      this.element.find(".stop").on("click", this.onStopClicked);
      this.element.find(".timeline").on("click", this.onLineClicked);
      this.element.find(".timeline").on("mouseenter", this.onLineMouseEnter);
      return this.element.find(".timeline").on("mouseleave", this.onLineMouseLeave);
    };

    SoundHelper.prototype.onLineClicked = function(e) {
      var $target, mPos, position, soundDuration, timelineW;
      e.preventDefault();
      $target = $(e.target);
      mPos = Model.mouseX - $target.offset().left;
      soundDuration = Sound.instance.getDuration();
      timelineW = this.element.find(".timeline").width();
      position = (mPos / timelineW) * soundDuration;
      return Sound.instance.setPosition(position);
    };

    SoundHelper.prototype.onLineMouseEnter = function(e) {
      e.preventDefault();
      return this.mouseFollowTime.removeClass("hide");
    };

    SoundHelper.prototype.onLineMouseLeave = function(e) {
      e.preventDefault();
      return this.mouseFollowTime.addClass("hide");
    };

    SoundHelper.prototype.updateTimeline = function(soundCurrentPos) {
      var $positionLine, linePosX, soundCurrentPosition, soundDuration, timelineW;
      $positionLine = this.element.find(".time-position-line");
      timelineW = this.element.find(".timeline").width();
      soundDuration = Sound.instance.getDuration();
      soundCurrentPosition = soundCurrentPos;
      linePosX = (soundCurrentPosition / soundDuration) * timelineW;
      return $positionLine.css("left", linePosX);
    };

    SoundHelper.prototype.updateTime = function() {
      var currentTimeStr, durationTimeStr, soundCurrentPosition, soundDuration, time;
      soundDuration = Sound.instance.getDuration();
      soundCurrentPosition = Sound.instance.getPosition();
      currentTimeStr = this.getTimeFormatStr(soundCurrentPosition);
      durationTimeStr = this.getTimeFormatStr(soundDuration);
      time = currentTimeStr + " / " + durationTimeStr + " / " + Math.round(Sound.instance.getPosition());
      return this.element.find(".time .time-holder").text(time);
    };

    SoundHelper.prototype.updateMouseFollowTime = function() {
      var $target, $timeline, currentDuration, currentTimeStr, mPos, posX, posY, soundDuration, timelineW;
      $target = this.element.find(".mouse-follow-time");
      posX = Model.mouseX + 12;
      posY = Model.mouseY - 6;
      $target.css({
        "left": posX + "px",
        "top": posY + "px"
      });
      $timeline = this.element.find(".timeline");
      mPos = Model.mouseX - $timeline.offset().left;
      soundDuration = Sound.instance.getDuration();
      timelineW = $timeline.width();
      currentDuration = (mPos / timelineW) * soundDuration;
      currentTimeStr = this.getTimeFormatStr(currentDuration);
      return $target.find(".time-holder").text(currentTimeStr);
    };

    SoundHelper.prototype.getTimeFormatStr = function(milliseconds) {
      var minutes, seconds, str, temp;
      temp = Math.floor(milliseconds / 1000);
      seconds = (temp % 60).toString();
      minutes = (Math.floor((temp %= 3600) / 60)).toString();
      seconds = seconds.length < 2 ? "0" + seconds : seconds;
      minutes = minutes.length < 2 ? "0" + minutes : minutes;
      str = minutes + ":" + seconds;
      return str;
    };

    SoundHelper.prototype.onPlayClicked = function() {
      return Sound.play();
    };

    SoundHelper.prototype.onPauseClicked = function() {
      return Sound.pause();
    };

    SoundHelper.prototype.onStopClicked = function() {
      return Sound.stop();
    };

    SoundHelper.prototype.onUpdate = function() {
      var soundCurrentPosition;
      soundCurrentPosition = Sound.instance.getPosition();
      this.updateTimeline(soundCurrentPosition);
      this.updateTime();
      if (!this.mouseFollowTime.hasClass("hide")) {
        return this.updateMouseFollowTime();
      }
    };

    SoundHelper.prototype.destroy = function() {};

    return SoundHelper;

  })();
  return SoundHelper;
});
