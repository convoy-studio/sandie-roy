define [], () ->

    "use strict"
    
    class SoundHelper

        element: undefined
        mouseFollowTime: undefined

        constructor: () ->

        init: =>
            @ready()

        ready: =>
            @element = $(".debug-container")
            @createPlayer()

        createPlayer: =>
            $el = $("
                <div class='mouse-follow-time'>
                    <div class='time-holder'>00:00</div>
                </div>
                <div class='sound-timeline'>
                    <div class='controls'>
                        <div class='play ctrl'>Play</div>
                        <div class='pause ctrl'>Pause</div>
                        <div class='stop ctrl'>Stop</div>
                    </div>
                    <div class='timeline'>
                        <div class='base-line'></div>
                        <div class='time-position-line'></div>
                    </div>
                    <div class='time'>
                        <div class='time-holder'>00:00 / 00:00</div>
                    </div>
                </div>
            ")
            @element.append $el

            @mouseFollowTime = @element.find(".mouse-follow-time")
            @mouseFollowTime.addClass("hide")

            @element.find(".play").on "click", @onPlayClicked
            @element.find(".pause").on "click", @onPauseClicked
            @element.find(".stop").on "click", @onStopClicked

            @element.find(".timeline").on "click", @onLineClicked
            @element.find(".timeline").on "mouseenter", @onLineMouseEnter
            @element.find(".timeline").on "mouseleave", @onLineMouseLeave

        onLineClicked: (e) =>
            e.preventDefault()
            $target = $(e.target)
            mPos = Model.mouseX - $target.offset().left
            soundDuration = Sound.instance.getDuration()
            timelineW = @element.find(".timeline").width()
            position = (mPos / timelineW) * soundDuration
            Sound.instance.setPosition(position)

        onLineMouseEnter: (e) =>
            e.preventDefault()
            @mouseFollowTime.removeClass("hide")

        onLineMouseLeave: (e) =>
            e.preventDefault()
            @mouseFollowTime.addClass("hide")

        updateTimeline: (soundCurrentPos) =>
            $positionLine = @element.find(".time-position-line")
            timelineW = @element.find(".timeline").width()
            soundDuration = Sound.instance.getDuration()
            soundCurrentPosition = soundCurrentPos
            linePosX = (soundCurrentPosition / soundDuration) * timelineW
            $positionLine.css "left", linePosX

        updateTime: =>
            soundDuration = Sound.instance.getDuration()
            soundCurrentPosition = Sound.instance.getPosition()

            currentTimeStr = @getTimeFormatStr(soundCurrentPosition)
            durationTimeStr = @getTimeFormatStr(soundDuration)

            time = currentTimeStr + " / " + durationTimeStr + " / " + Math.round(Sound.instance.getPosition())
            @element.find(".time .time-holder").text(time)

        updateMouseFollowTime: =>
            $target = @element.find(".mouse-follow-time")
            posX = Model.mouseX + 12
            posY = Model.mouseY - 6
            $target.css
                "left": posX+"px"
                "top": posY+"px"

            $timeline = @element.find(".timeline")
            mPos = Model.mouseX - $timeline.offset().left
            soundDuration = Sound.instance.getDuration()
            timelineW = $timeline.width()
            currentDuration = (mPos / timelineW) * soundDuration
            currentTimeStr = @getTimeFormatStr(currentDuration)
            $target.find(".time-holder").text(currentTimeStr)

        getTimeFormatStr: (milliseconds) =>
            temp = Math.floor(milliseconds / 1000)
            seconds = (temp % 60).toString()
            minutes = (Math.floor((temp %= 3600) / 60)).toString()
            seconds = if seconds.length < 2 then "0"+seconds else seconds
            minutes = if minutes.length < 2 then "0"+minutes else minutes
            str = minutes + ":" + seconds
            return str

        onPlayClicked: =>
            Sound.play()

        onPauseClicked: =>
            Sound.pause()

        onStopClicked: =>
            Sound.stop()

        onUpdate: =>
            soundCurrentPosition = Sound.instance.getPosition()
            @updateTimeline soundCurrentPosition
            @updateTime()

            if !@mouseFollowTime.hasClass("hide")
                @updateMouseFollowTime()

        destroy: =>

    return SoundHelper
