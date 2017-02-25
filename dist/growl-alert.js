(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global.growl = factory());
}(this, (function () { 'use strict';

var arguments$1 = arguments;

/**
 * 
 */
var extend = function () {
    var i = 1, key;

    while (i < arguments$1.length) {
        for (key in arguments$1[i]) {
            if (arguments$1[i].hasOwnProperty(key)) {
                arguments$1[0][key] = arguments$1[i][key];
            }
        }
        i++;
    }
    return arguments$1[0]
};

/**
 * 
 */
var animationEnd = (function () {
    var el = document.createElement('fake');

    var animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd'
    };

    for (var a in animations) {
        if (el.style[a] !== void 0) {
            return animations[a]
        }
    }
})();

/**
 * 
 */
var defineType = function (param, type) {
    if (typeof param === 'string') {
        var opts = {
            text: param,
            type: type
        };
        return opts
    } else if (param !== null && typeof param === 'object') {
        return extend(param, {
            type: type
        })
    } else {
        return { type: type }
    }
};

/**
 * 
 */
var types = {
    success: 'alert-message--success',
    info: 'alert-message--info',
    warning: 'alert-message--warning',
    error: 'alert-message--error'
};

/**
 * 
 */
var defaults = {
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

/**
 * 
 */
var template = "\n    <div class=\"alert-message__close\"></div>\n    <div class=\"alert-message__icon\"></div>\n    <p class=\"alert-message__text\"></p>\n";

var alertClass = 'alert-message';
var textClass = 'alert-message__text';
var closeClass = 'alert-message__close';
var containerClass = 'container-alert-message';

var growl = function (opts) {
    
    var config = extend(growl.defaults, opts);

    var $el, fadeAwayTimeout;

    var bootstrap = function () {
        var doc = document;

        var $container = doc.querySelector(("#" + (config.containerId)));

        if (!$container) {
            $container = createContainer();
        }

        $el = doc.createElement('div')
            .setAttribute('class', alertClass)
            .innerHTML = template;

        $container.insertBefore($el, $container.firstChild);

        $el.classList.add(types[config.type] || 'success');
        $el.querySelector(textClass).innerHTML = config.text;

        openMessage();
    };

    var openMessage = function () {
        $el.classList.add(config.activeClass);
        clearTimeout(fadeAwayTimeout);

        if (config.alertBoxLoadedCB instanceof Function) {
            config.alertBoxLoadedCB($el);
        }
    };

    var closeMessage = function () {
        $el.classList.add(config.closingClass);

        $el.addEventListnener(animationEnd, function () { return $el.parentNode.removeChild($el); });

        clearTimeout(fadeAwayTimeout);

        if (config.alertBoxLoadedCB instanceof Function) {
            config.alertBoxLoadedCB($el);
        }
    };

    bootstrap();

    $el.querySelector(("." + closeClass)).addEventListnener('click', function () {
        closeMessage();
    });

    return $el
};

var createContainer = function () {
    var $container = doc.createElement('div')
        .setAttribute('id', config.containerId)
        .setAttribute('class', containerClass);

    doc.body.appendChild($container);

    return $container
};

/**
 * Define the default values
 */
growl.defaults = defaults;

/**
 * Create one shortcut function for each type
 */
Object.keys(types).forEach(function (type) {
    growl[type] = function (opts) { return growl(defineType(opts, type)); };
});

return growl;

})));
//# sourceMappingURL=growl-alert.js.map
