define [], () ->

    "use strict"
    
    class Util

        constructor: () ->

        CapitalizeFirstLetter: (string) =>
            return string.charAt(0).toUpperCase() + string.slice(1)

        RenderPartial: (rawPartial, contentData) =>
            return $(Mustache.render(rawPartial, contentData))

        JqueryObjToString: (jobj) =>
            return $('<div>').append($(jobj).clone()).html()

        DegreesToRadians: (degrees) =>
            return degrees * (Math.PI / 180)

        RadiansToDegrees: (radians) =>
            return radians * (180 / Math.PI)

        ToggleVisibility: (object3D, visible) =>
            object3D.traverse (object) =>
                object.visible = visible

        ConvertToSlug: (text, separator) =>
            separator = if separator? then separator else "-"
            return text.toLowerCase().replace(/[^\w ]+/g, "").replace RegExp(" +", "g"), separator

        RandomInt: (multiplier=10000000) =>
            if multiplier? then multiplier else 10000000
            return Math.round(Math.random()*multiplier) + 1

        Limit: (min, max, value) =>
            return Math.max(min, Math.min(max, value))

        ConvertToClassName: (text) =>
            tArray = text.split("-")
            txt = ""
            if tArray.length > 1
                for t in tArray
                    txt += @CapitalizeFirstLetter(t)
            else
                txt = @CapitalizeFirstLetter(tArray[0])    
            return txt

        ValidateEmail: (email)=>
            re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return re.test(email)

        IsInt: (n) =>
            return n % 1 is 0

        ToType: (obj) =>
            return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()

        RGBtoUnit: (value) =>
            return (value/255)*1

        UnitToRGB: (value) =>
            return (value/1)*255

        HexString: (hex)=>
            return ( '000000' + hex.toString( 16 ) ).slice( - 6 )

        guid: =>
            s4 = ->
                Math.floor((1 + Math.random()) * 0x10000).toString(16).substring 1
            s4() + s4()

        HexToRgb: (hex, unit) =>
            unit = if unit? then unit else false
            result = if hex.charAt(0) is "#" then hex.substring(1,7) else hex
            r = parseInt(result.substring(0,2), 16)
            b = parseInt(result.substring(2,4), 16)
            g = parseInt(result.substring(4,6), 16)
            if unit
                r = @RGBtoUnit r
                b = @RGBtoUnit b
                g = @RGBtoUnit g
            return {
                r: r
                g: g
                b: b
            }

        RgbToHex: (r, g, b) =>
            return "#" + @ComponentToHex(r) + @ComponentToHex(g) + @ComponentToHex(b)

        ComponentToHex: (c)=>
            hex = c.toString(16)
            return if hex.length is 1 then "0" + hex else hex

        Map: (value, min1, max1, min2, max2) =>
            return @Lerp(min2, max2, @Norm(value, min1, max1))

        Lerp: (min, max, amt) =>
            return min + (max - min) * amt

        Norm: (value, min, max) =>
            return (value - min) / (max - min)

        # Not safe always (be careful with that)
        ToFixed: (number, factor) =>
            return Math.round(number * factor)/factor

        SecondsToMinutes: (time) =>
            minutes = Math.floor(time / 60)
            seconds = Math.round(time - minutes * 60)
            minutes = minutes.toString()
            seconds = seconds.toString()
            if minutes.length is 1 then minutes = "0" + minutes
            if seconds.length is 1 then seconds = "0" + seconds
            return minutes + ":" + seconds

        GetImgNativeSize: (url) =>
            img = new Image()
            img.src = url
            return { width:img.width, height:img.height }

        Rand: (max, min, decimals) =>
            if min > max
                undefined
            randomNum = Math.random() * (max - min) + min
            d = Math.pow 10, decimals
            ~~((d * randomNum) + 0.5) / d

        IsEven: (value) =>
            if (value%2) is 0
                return true
            else
                return false

        GetUrlVars:(key) =>
            vars = {}
            parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/g, (m, key, value) ->
                cleanVal = value
                if value.indexOf("#") > 0
                    indexPos = value.indexOf("#")
                    cleanVal = value.slice(0, indexPos)
                vars[key] = cleanVal
                return
            )
            vars

        SetCookie: (cname, cvalue) =>
            document.cookie = cname + "=" + cvalue

        GetCookie: (cname) =>
            name = cname + "="
            ca = document.cookie.split(';')
            i = 0
            cookie = ""
            while i < ca.length
                c = ca[i].trim()
                if c.indexOf(name) is 0
                    cookie = c.substring name.length, c.length
                i++
            return cookie

        GetCanvas: (width, height) =>
            canvas = document.createElement('canvas')
            canvas.width = width
            canvas.height = height
            return canvas

        LaunchIntoFullscreen: (element) =>
            if(element.requestFullscreen)
                element.requestFullscreen()
            else if(element.mozRequestFullScreen)
                element.mozRequestFullScreen()
            else if(element.webkitRequestFullscreen)
                element.webkitRequestFullscreen()
            else if(element.msRequestFullscreen)
                element.msRequestFullscreen()

        ExitFullscreen: =>
            if document.exitFullscreen
                document.exitFullscreen()
            else if document.mozCancelFullScreen
                document.mozCancelFullScreen()
            else if document.webkitExitFullscreen
                document.webkitExitFullscreen()

    return Util
