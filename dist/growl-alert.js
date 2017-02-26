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
    opened: void 0,
    closed: void 0
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
    var doc = document;
    var config = extend(growl.defaults, opts);

    var $el, fadeAwayTimeout;

    var bootstrap = function () {
        var $container = doc.querySelector(("#" + (config.containerId)));

        if (!$container) {
            $container = createContainer();
        }

        $el = doc.createElement('div');
        $el.setAttribute('class', alertClass);
        $el.innerHTML = template;

        $container.insertBefore($el, $container.firstChild);

        $el.classList.add(types[config.type] || 'success');

        $el.querySelector(("." + textClass)).innerHTML = config.text;

        openMessage();

        if (config.closeOnClick) {
            $el.addEventListener('click touchstart', function () { return closeMessage(); });
        }

        if (config.fadaAway && !isNaN(config.fadeAwayTimeout)) {
            fadeAwayTimeout = setTimeout(function () {
                closeMessage();
            }, config.fadeAwayTimeout);
        }

        $el.querySelector(("." + closeClass)).addEventListener('click', function () {
            closeMessage();
        });
    };

    var createContainer = function () {

        var $container = doc.createElement('div');
        $container.setAttribute('id', config.containerId);
        $container.setAttribute('class', containerClass);

        doc.body.appendChild($container);

        return $container
    };

    var openMessage = function () {
        $el.classList.add(config.activeClass);
        clearTimeout(fadeAwayTimeout);

        if (config.opened instanceof Function) {
            config.opened($el);
        }
    };

    var closeMessage = function () {
        $el.classList.add(config.closingClass);

        $el.addEventListnener(animationEnd, function () { return $el.parentNode.removeChild($el); });

        clearTimeout(fadeAwayTimeout);

        if (config.closed instanceof Function) {
            config.closed($el);
        }
    };

    bootstrap();

    return $el
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
