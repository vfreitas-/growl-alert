(function(window) {
  'use strict';
  var animationProp, extend, htmlTemplate, setMessage;
  htmlTemplate = "<div class=\"alert-message__close\"></div>\n<div class=\"alert-message__icon\"></div>\n<p class=\"alert-message__text\"></p>";
  extend = function() {
    var i, key, results;
    i = 1;
    results = [];
    while (i < arguments.length) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
        i++;
      }
      results.push(arguments[0]);
    }
    return results;
  };
  animationProp = (function() {
    var a, animations, el;
    el = document.createElement('fake');
    animations = {
      'animation': 'animationend',
      'OAnimation': 'oAnimationEnd',
      'MozAnimation': 'animationend',
      'WebkitAnimation': 'webkitAnimationEnd'
    };
    for (a in animations) {
      if (el.style[a] !== void 0) {
        return animations[a];
      }
    }
  })();
  setMessage = function(param, type) {
    var opts;
    if (typeof param === 'string') {
      opts = {
        text: param,
        type: type
      };
      return opts;
    } else if (param !== null && typeof param === 'object') {
      return extend(param, {
        type: type
      });
    } else {
      return {
        type: type
      };
    }
  };
  window.growl = function(opts) {
    var $container, $el, bootstrap, closeClass, closeMessage, config, containerClass, fadeAwayTimeout, openMessage, typeClass;
    $el = void 0;
    $container = void 0;
    config = extend(growl.defaults, opts);
    typeClass = {
      success: 'alert-message--success',
      info: 'alert-message--info',
      warning: 'alert-message--warning',
      error: 'alert-message--error'
    };
    closeClass = 'alert-message__close';
    containerClass = 'container-alert-message';
    fadeAwayTimeout = void 0;
    bootstrap = function() {
      $container = document.querySelector('#' + config.containerId);
      if ($container === null) {
        $container = document.createElement('div');
        $container.setAttribute('id', config.containerId);
        $container.setAttribute('class', containerClass);
        document.querySelector('body').appendChild($container);
      }
      $el = document.createElement('div');
      $el.innerHTML = htmlTemplate;
      $el.setAttribute('class', config["class"]);
      $container.insertBefore($el, $container.firstChild);
      $el.classList.add(typeClass[config.type]);
      $el.querySelector('.alert-message__text').innerHTML = config.text;
      openMessage();
      if (config.closeOnClick) {
        $el.addEventListener('click touchstart', function() {
          return closeMessage();
        });
      }
      if (config.fadeAway && !isNaN(config.fadeAwayTimeout)) {
        fadeAwayTimeout = setTimeout((function() {
          closeMessage();
        }), config.fadeAwayTimeout);
      }
    };
    openMessage = function() {
      $el.classList.add(config.activeClass);
      clearTimeout(fadeAwayTimeout);
      if (config.alertBoxLoadedCB instanceof Function) {
        config.alertBoxLoadedCB($el);
      }
    };
    closeMessage = function() {
      $el.classList.add(config.closingClass);
      $el.addEventListener(animationProp, function() {
        return $el.parentNode.removeChild($el);
      });
      clearTimeout(fadeAwayTimeout);
      if (config.alertBoxOnCloseCB instanceof Function) {
        config.alertBoxOnCloseCB($el);
      }
    };
    bootstrap();
    $el.querySelector('.' + closeClass).addEventListener('click', function() {
      closeMessage();
    });
    return $el;
  };
  window.growl.defaults = {
    "class": 'alert-message',
    activeClass: 'alert-message--active',
    closingClass: 'alert-message--closing',
    containerId: 'growl-container',
    type: 'success',
    text: 'Simple notification',
    closeOnClick: false,
    fadeAway: false,
    fadeAwayTimeout: 5000,
    alertBoxLoadedCB: void 0,
    alertBoxOnCloseCB: void 0
  };
  window.growl.success = function(opts) {
    return growl(setMessage(opts, 'success'));
  };
  window.growl.error = function(opts) {
    return growl(setMessage(opts, 'error'));
  };
  window.growl.warning = function(opts) {
    return growl(setMessage(opts, 'warning'));
  };
  window.growl.info = function(opts) {
    return growl(setMessage(opts, 'info'));
  };
  return window.growl;
})(window);
