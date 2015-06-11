define [], () ->

    "use strict"
    
    class GlobalModel

        routing: undefined
        isDesktop: undefined
        browser: undefined
        browserVersion: undefined
        isOldBrowser: false
        content: undefined
        parentEl: undefined
        interfaceEl: undefined
        env: undefined
        debugMode: undefined
        debugScene: false
        debugData: undefined
        oldHash: undefined
        newHash: undefined
        windowW: 0
        windowH: 0
        colorState: "white"
        gridPartW: 214
        gridMargin: 15

        personBaseSize:
            w:400
            h:320

        mobile: 750

        constructor: () ->

    return GlobalModel 
