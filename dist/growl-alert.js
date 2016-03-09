'use strict';
(function(window) {
  var extend, htmlTemplate, setMessage;
  htmlTemplate = "<div class=\"alert-message__close\"></div>\n<div class=\"alert-message__icon\"></div>\n<p class=\"alert-message__text\"></p>";
  extend = function() {
    var i, key;
    i = 1;
    while (i < arguments.length) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
        }
      }
      i++;
    }
    return arguments[0];
  };
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
    config = extend({
      "class": 'alert-message',
      activeClass: 'alert-message--active',
      containerId: 'growl-container',
      type: 'success',
      text: 'Welcome to the Alert Message!',
      fadeAway: false,
      fadeAwayTimeout: 5000,
      alertBoxLoadedCB: void 0,
      alertBoxOnCloseCB: void 0
    }, opts);
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
        config.alertBoxLoadedCB($self, $el);
      }
    };
    closeMessage = function() {
      $el.parentNode.removeChild($el);
      clearTimeout(fadeAwayTimeout);
      if (config.alertBoxOnCloseCB instanceof Function) {
        config.alertBoxOnCloseCB($self, $el);
      }
    };
    bootstrap();
    $el.querySelector('.' + closeClass).addEventListener('click', function() {
      closeMessage();
    });
    return $el;
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

//# sourceMappingURL=data:application/json;base64,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QU0sQ0FBQyxLQUFLLENBQUMsT0FBYixHQUF1QixTQUFDLElBQUQ7V0FDdEIsS0FBQSxDQUFNLFVBQUEsQ0FBVyxJQUFYLEVBQWlCLFNBQWpCLENBQU47RUFEc0I7RUFHdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLEdBQW9CLFNBQUMsSUFBRDtXQUNuQixLQUFBLENBQU0sVUFBQSxDQUFXLElBQVgsRUFBaUIsTUFBakIsQ0FBTjtFQURtQjtTQUdwQixNQUFNLENBQUM7QUF2SEwsQ0FBQSxDQUFILENBQUksTUFBSiIsImZpbGUiOiJncm93bC1hbGVydC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZG8gKHdpbmRvdykgLT5cblxuXHRodG1sVGVtcGxhdGUgPSBcIlwiXCJcblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fY2xvc2VcIj48L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9faWNvblwiPjwvZGl2PlxuXHRcdDxwIGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fdGV4dFwiPjwvcD5cblx0XHRcIlwiXCJcblxuXHRleHRlbmQgPSAtPlxuXHRcdGkgPSAxXG5cdFx0d2hpbGUgaSA8IGFyZ3VtZW50cy5sZW5ndGhcblx0XHRcdGZvciBrZXkgb2YgYXJndW1lbnRzW2ldXG5cdFx0XHRcdGlmIGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpXG5cdFx0XHRcdFx0YXJndW1lbnRzWzBdW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XVxuXHRcdFx0aSsrXG5cdFx0YXJndW1lbnRzWzBdXG5cblx0c2V0TWVzc2FnZSA9IChwYXJhbSwgdHlwZSkgLT5cblx0XHRpZiB0eXBlb2YgcGFyYW0gPT0gJ3N0cmluZydcblx0XHRcdG9wdHMgPVxuXHRcdFx0XHR0ZXh0OiBwYXJhbVxuXHRcdFx0XHR0eXBlOiB0eXBlXG5cdFx0XHRyZXR1cm4gb3B0c1xuXHRcdGVsc2UgaWYgcGFyYW0gIT0gbnVsbCAmJiB0eXBlb2YgcGFyYW0gPT0gJ29iamVjdCdcblx0XHRcdHJldHVybiBleHRlbmQocGFyYW0sIHtcblx0XHRcdFx0dHlwZTogdHlwZVxuXHRcdFx0fSlcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4geyB0eXBlOiB0eXBlIH1cblxuXG5cdHdpbmRvdy5ncm93bCA9IChvcHRzKSAtPlxuXG5cdFx0JGVsID0gdW5kZWZpbmVkXG5cdFx0JGNvbnRhaW5lciA9IHVuZGVmaW5lZFxuXG5cdFx0Y29uZmlnID0gZXh0ZW5kKHtcblx0XHRcdGNsYXNzOiAnYWxlcnQtbWVzc2FnZSdcblx0XHRcdGFjdGl2ZUNsYXNzOiAnYWxlcnQtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdFx0Y29udGFpbmVySWQ6ICdncm93bC1jb250YWluZXInXG5cdFx0XHR0eXBlOiAnc3VjY2Vzcydcblx0XHRcdHRleHQ6ICdXZWxjb21lIHRvIHRoZSBBbGVydCBNZXNzYWdlISdcblx0XHRcdGZhZGVBd2F5OiBmYWxzZVxuXHRcdFx0ZmFkZUF3YXlUaW1lb3V0OiA1MDAwXG5cdFx0XHRhbGVydEJveExvYWRlZENCOiB1bmRlZmluZWRcblx0XHRcdGFsZXJ0Qm94T25DbG9zZUNCOiB1bmRlZmluZWRcblx0XHR9LCBvcHRzKVxuXG5cdFx0dHlwZUNsYXNzID1cblx0XHRcdHN1Y2Nlc3M6ICdhbGVydC1tZXNzYWdlLS1zdWNjZXNzJ1xuXHRcdFx0aW5mbzogJ2FsZXJ0LW1lc3NhZ2UtLWluZm8nXG5cdFx0XHR3YXJuaW5nOiAnYWxlcnQtbWVzc2FnZS0td2FybmluZydcblx0XHRcdGVycm9yOiAnYWxlcnQtbWVzc2FnZS0tZXJyb3InXG5cblx0XHRjbG9zZUNsYXNzID0gJ2FsZXJ0LW1lc3NhZ2VfX2Nsb3NlJ1xuXHRcdGNvbnRhaW5lckNsYXNzID0gJ2NvbnRhaW5lci1hbGVydC1tZXNzYWdlJ1xuXHRcdGZhZGVBd2F5VGltZW91dCA9IHVuZGVmaW5lZFxuXG5cdFx0Ym9vdHN0cmFwID0gLT5cblx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNvbmZpZy5jb250YWluZXJJZClcblxuXHRcdFx0aWYgJGNvbnRhaW5lciA9PSBudWxsXG5cdFx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZSAnaWQnLCBjb25maWcuY29udGFpbmVySWRcblx0XHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29udGFpbmVyQ2xhc3Ncblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkICRjb250YWluZXJcblxuXHRcdFx0JGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdCRlbC5pbm5lckhUTUwgPSBodG1sVGVtcGxhdGVcblx0XHRcdCRlbC5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29uZmlnLmNsYXNzXG5cdFx0XHQkY29udGFpbmVyLmluc2VydEJlZm9yZSAkZWwsICRjb250YWluZXIuZmlyc3RDaGlsZFxuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQgdHlwZUNsYXNzW2NvbmZpZy50eXBlXVxuXHRcdFx0JGVsLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tZXNzYWdlX190ZXh0JykuaW5uZXJIVE1MID0gY29uZmlnLnRleHRcblx0XHRcdG9wZW5NZXNzYWdlKClcblxuXHRcdFx0aWYgY29uZmlnLmZhZGVBd2F5IGFuZCAhaXNOYU4oY29uZmlnLmZhZGVBd2F5VGltZW91dClcblx0XHRcdFx0ZmFkZUF3YXlUaW1lb3V0ID0gc2V0VGltZW91dCgoLT5cblx0XHRcdFx0XHRjbG9zZU1lc3NhZ2UoKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHQpLCBjb25maWcuZmFkZUF3YXlUaW1lb3V0KVxuXHRcdFx0cmV0dXJuXG5cblx0XHRvcGVuTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCBjb25maWcuYWN0aXZlQ2xhc3Ncblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94TG9hZGVkQ0IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXHRcdFx0XHRjb25maWcuYWxlcnRCb3hMb2FkZWRDQiAkc2VsZiwgJGVsXG5cdFx0XHRyZXR1cm5cblxuXHRcdGNsb3NlTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCAkZWxcblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0XHRcdFx0Y29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCICRzZWxmLCAkZWxcblx0XHRcdHJldHVyblxuXG5cdFx0Ym9vdHN0cmFwKClcblxuXHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsb3NlQ2xhc3MpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgcmV0dXJuXG5cdFx0cmV0dXJuICRlbFxuXG5cdHdpbmRvdy5ncm93bC5zdWNjZXNzID0gKG9wdHMpIC0+XG5cdFx0Z3Jvd2woc2V0TWVzc2FnZShvcHRzLCAnc3VjY2VzcycpKVxuXG5cdHdpbmRvdy5ncm93bC5lcnJvciA9IChvcHRzKSAtPlxuXHRcdGdyb3dsKHNldE1lc3NhZ2Uob3B0cywgJ2Vycm9yJykpXG5cblx0d2luZG93Lmdyb3dsLndhcm5pbmcgPSAob3B0cykgLT5cblx0XHRncm93bChzZXRNZXNzYWdlKG9wdHMsICd3YXJuaW5nJykpXG5cblx0d2luZG93Lmdyb3dsLmluZm8gPSAob3B0cykgLT5cblx0XHRncm93bChzZXRNZXNzYWdlKG9wdHMsICdpbmZvJykpXG5cblx0d2luZG93Lmdyb3dsXG4iXX0=
