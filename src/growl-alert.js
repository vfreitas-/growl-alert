
//TODO transpile to coffeescript
//TODO
;+function(window) {

	window.growl = function(opts) {

		var $el, $container;

		var config = extend({
			//el
			class: 'alert-message',
			activeClass: 'alert-message--active',
			containerId: 'growl-container',

			//informations
			type: 'success',
			text: 'Welcome to the Alert Message!',

			//execution options
			fadeAway: false,
			fadeAwayTimeout: 5000, //5 seconds

			//callbacks
			alertBoxLoadedCB: undefined,
			alertBoxOnCloseCB: undefined
		}, opts);

		var typeClass = {
			success: 'alert-message--success',
			info: 'alert-message--info',
			warning: 'alert-message--warning',
			error: 'alert-message--error'
		};

		var closeClass = 'alert-message__close'
		  , containerClass = 'container-alert-message';

		var fadeAwayTimeout;

		bootstrap();

		function bootstrap() {
			var $container = document.querySelector('#' + config.containerId);

			if($container === null) {
				$container = document.createElement('div');
				$container.setAttribute('id', config.containerId);
				$container.setAttribute('class', containerClass);
				document.querySelector('body')
					.appendChild($container);
			}

			$el = document.createElement('div');
			$el.innerHTML = htmlTemplate;
			$el.setAttribute('class', config.class);
			$container.insertBefore($el, $container.firstChild);

			$el.classList.add(typeClass[config.type]);
			$el.querySelector('.alert-message__text')
				.innerHTML = config.text;

			openMessage();

			if(config.fadeAway && !isNaN(config.fadeAwayTimeout)) {
				fadeAwayTimeout = setTimeout(function() {
					closeMessage();
				}, config.fadeAwayTimeout);
			}
		}

		function openMessage() {
			$el.classList.add(config.activeClass);

			clearTimeout(fadeAwayTimeout);

			if(config.alertBoxLoadedCB instanceof Function)
				config.alertBoxLoadedCB($self, $el);
		}

		function closeMessage() {
			$el.parentNode.removeChild($el);

			clearTimeout(fadeAwayTimeout);

			if(config.alertBoxOnCloseCB instanceof Function)
				config.alertBoxOnCloseCB($self, $el);
		}

		$el.querySelector('.' + closeClass).addEventListener('click', function() {
			closeMessage();
		});

		function extend(){
			for(var i = 1; i < arguments.length; i++)
				for(var key in arguments[i])
					if(arguments[i].hasOwnProperty(key))
						arguments[0][key] = arguments[i][key];
			return arguments[0];
		}

		return $el;
	}


	var htmlTemplate = ' \
			<div class="alert-message__close"></div> \
			<div class="alert-message__icon"></div> \
			<p class="alert-message__text"></p> \
	';

}(window);
