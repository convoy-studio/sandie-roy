define([], function() {
  "use strict";
  var SoundHelper;
  SoundHelper = (function() {
    class SoundHelper {
      constructor() {
        this.init = this.init.bind(this);
        this.ready = this.ready.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        this.onLineClicked = this.onLineClicked.bind(this);
        this.onLineMouseEnter = this.onLineMouseEnter.bind(this);
        this.onLineMouseLeave = this.onLineMouseLeave.bind(this);
        this.updateTimeline = this.updateTimeline.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.updateMouseFollowTime = this.updateMouseFollowTime.bind(this);
        this.getTimeFormatStr = this.getTimeFormatStr.bind(this);
        this.onPlayClicked = this.onPlayClicked.bind(this);
        this.onPauseClicked = this.onPauseClicked.bind(this);
        this.onStopClicked = this.onStopClicked.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.destroy = this.destroy.bind(this);
      }

      init() {
        return this.ready();
      }

      ready() {
        this.element = $(".debug-container");
        return this.createPlayer();
      }

      createPlayer() {
        var $el;
        $el = $("<div class='mouse-follow-time'> <div class='time-holder'>00:00</div> </div> <div class='sound-timeline'> <div class='controls'> <div class='play ctrl'>Play</div> <div class='pause ctrl'>Pause</div> <div class='stop ctrl'>Stop</div> </div> <div class='timeline'> <div class='base-line'></div> <div class='time-position-line'></div> </div> <div class='time'> <div class='time-holder'>00:00 / 00:00</div> </div> </div>");
        this.element.append($el);
        this.mouseFollowTime = this.element.find(".mouse-follow-time");
        this.mouseFollowTime.addClass("hide");
        this.element.find(".play").on("click", this.onPlayClicked);
        this.element.find(".pause").on("click", this.onPauseClicked);
        this.element.find(".stop").on("click", this.onStopClicked);
        this.element.find(".timeline").on("click", this.onLineClicked);
        this.element.find(".timeline").on("mouseenter", this.onLineMouseEnter);
        return this.element.find(".timeline").on("mouseleave", this.onLineMouseLeave);
      }

      onLineClicked(e) {
        var $target, mPos, position, soundDuration, timelineW;
        e.preventDefault();
        $target = $(e.target);
        mPos = Model.mouseX - $target.offset().left;
        soundDuration = Sound.instance.getDuration();
        timelineW = this.element.find(".timeline").width();
        position = (mPos / timelineW) * soundDuration;
        return Sound.instance.setPosition(position);
      }

      onLineMouseEnter(e) {
        e.preventDefault();
        return this.mouseFollowTime.removeClass("hide");
      }

      onLineMouseLeave(e) {
        e.preventDefault();
        return this.mouseFollowTime.addClass("hide");
      }

      updateTimeline(soundCurrentPos) {
        var $positionLine, linePosX, soundCurrentPosition, soundDuration, timelineW;
        $positionLine = this.element.find(".time-position-line");
        timelineW = this.element.find(".timeline").width();
        soundDuration = Sound.instance.getDuration();
        soundCurrentPosition = soundCurrentPos;
        linePosX = (soundCurrentPosition / soundDuration) * timelineW;
        return $positionLine.css("left", linePosX);
      }

      updateTime() {
        var currentTimeStr, durationTimeStr, soundCurrentPosition, soundDuration, time;
        soundDuration = Sound.instance.getDuration();
        soundCurrentPosition = Sound.instance.getPosition();
        currentTimeStr = this.getTimeFormatStr(soundCurrentPosition);
        durationTimeStr = this.getTimeFormatStr(soundDuration);
        time = currentTimeStr + " / " + durationTimeStr + " / " + Math.round(Sound.instance.getPosition());
        return this.element.find(".time .time-holder").text(time);
      }

      updateMouseFollowTime() {
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
      }

      getTimeFormatStr(milliseconds) {
        var minutes, seconds, str, temp;
        temp = Math.floor(milliseconds / 1000);
        seconds = (temp % 60).toString();
        minutes = (Math.floor((temp %= 3600) / 60)).toString();
        seconds = seconds.length < 2 ? "0" + seconds : seconds;
        minutes = minutes.length < 2 ? "0" + minutes : minutes;
        str = minutes + ":" + seconds;
        return str;
      }

      onPlayClicked() {
        return Sound.play();
      }

      onPauseClicked() {
        return Sound.pause();
      }

      onStopClicked() {
        return Sound.stop();
      }

      onUpdate() {
        var soundCurrentPosition;
        soundCurrentPosition = Sound.instance.getPosition();
        this.updateTimeline(soundCurrentPosition);
        this.updateTime();
        if (!this.mouseFollowTime.hasClass("hide")) {
          return this.updateMouseFollowTime();
        }
      }

      destroy() {}

    };

    SoundHelper.prototype.element = void 0;

    SoundHelper.prototype.mouseFollowTime = void 0;

    return SoundHelper;

  }).call(this);
  return SoundHelper;
});
