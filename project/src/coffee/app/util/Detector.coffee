define [], () ->
	
	class Detector

		canvas: undefined
		webgl: undefined

		constructor: () ->
			@canvas = !!window.CanvasRenderingContext2D

		webgl: =>
			isEnable = false
			@canvas = document.createElement("canvas")
			context = !!window.WebGLRenderingContext and (@canvas.getContext("webgl") or @canvas.getContext("experimental-webgl"))
			if context?
				isEnable = true
			else
				isEnable = false
			return isEnable

		displayMessage: (el)=>

			mes = "One day, just maybe...<br>
			Your browser will support WebGL.<br>
			<br>
			Fortunately you can enjoy our wishes on <a href='https://www.google.com/intl/en/chrome/browser/'>Chrome</a> or <a href='http://www.mozilla.org/en-US/firefox/new/'>Firefox</a>."

			el.append("<p>"+mes+"</p>")

	return Detector
