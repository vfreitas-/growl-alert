'use strict';

do (window) ->

	htmlTemplate = """
		<div class="alert-message__close"></div>
		<div class="alert-message__icon"></div>
		<p class="alert-message__text"></p>
		"""

	extend = ->
		i = 1
		while i < arguments.length
			for key of arguments[i]
				if arguments[i].hasOwnProperty(key)
					arguments[0][key] = arguments[i][key]
			i++
		arguments[0]

	window.growl = (opts) ->

		$el = undefined
		$container = undefined

		config = extend({
			class: 'alert-message'
			activeClass: 'alert-message--active'
			containerId: 'growl-container'
			type: 'success'
			text: 'Welcome to the Alert Message!'
			fadeAway: false
			fadeAwayTimeout: 5000
			alertBoxLoadedCB: undefined
			alertBoxOnCloseCB: undefined
		}, opts)

		typeClass =
			success: 'alert-message--success'
			info: 'alert-message--info'
			warning: 'alert-message--warning'
			error: 'alert-message--error'

		closeClass = 'alert-message__close'
		containerClass = 'container-alert-message'
		fadeAwayTimeout = undefined

		bootstrap = ->
			$container = document.querySelector('#' + config.containerId)

			if $container == null
				$container = document.createElement('div')
				$container.setAttribute 'id', config.containerId
				$container.setAttribute 'class', containerClass
				document.querySelector('body').appendChild $container

			$el = document.createElement('div')
			$el.innerHTML = htmlTemplate
			$el.setAttribute 'class', config.class
			$container.insertBefore $el, $container.firstChild
			$el.classList.add typeClass[config.type]
			$el.querySelector('.alert-message__text').innerHTML = config.text
			openMessage()

			if config.fadeAway and !isNaN(config.fadeAwayTimeout)
				fadeAwayTimeout = setTimeout((->
					closeMessage()
					return
				), config.fadeAwayTimeout)
			return

		openMessage = ->
			$el.classList.add config.activeClass
			clearTimeout fadeAwayTimeout

			if config.alertBoxLoadedCB instanceof Function
				config.alertBoxLoadedCB $self, $el
			return

		closeMessage = ->
			$el.parentNode.removeChild $el
			clearTimeout fadeAwayTimeout

			if config.alertBoxOnCloseCB instanceof Function
				config.alertBoxOnCloseCB $self, $el
			return

		bootstrap()

		$el.querySelector('.' + closeClass).addEventListener 'click', ->
			closeMessage()
			return

		# return
		$el

		return
