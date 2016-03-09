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
      $el.parentNode.removeChild($el);
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
    containerId: 'growl-container',
    type: 'success',
    text: 'Welcome to the Alert Message!',
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

//# sourceMappingURL=data:application/json;base64,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QixPQUFqQixDQUFOO0VBRG9CO0VBR3JCLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBYixHQUF1QixTQUFDLElBQUQ7V0FDdEIsS0FBQSxDQUFNLFVBQUEsQ0FBVyxJQUFYLEVBQWlCLFNBQWpCLENBQU47RUFEc0I7RUFHdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFiLEdBQW9CLFNBQUMsSUFBRDtXQUNuQixLQUFBLENBQU0sVUFBQSxDQUFXLElBQVgsRUFBaUIsTUFBakIsQ0FBTjtFQURtQjtTQUdwQixNQUFNLENBQUM7QUF2SEwsQ0FBQSxDQUFILENBQUksTUFBSiIsImZpbGUiOiJncm93bC1hbGVydC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZG8gKHdpbmRvdykgLT5cblxuXHRodG1sVGVtcGxhdGUgPSBcIlwiXCJcblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fY2xvc2VcIj48L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9faWNvblwiPjwvZGl2PlxuXHRcdDxwIGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fdGV4dFwiPjwvcD5cblx0XHRcIlwiXCJcblxuXHRleHRlbmQgPSAtPlxuXHRcdGkgPSAxXG5cdFx0d2hpbGUgaSA8IGFyZ3VtZW50cy5sZW5ndGhcblx0XHRcdGZvciBrZXkgb2YgYXJndW1lbnRzW2ldXG5cdFx0XHRcdGlmIGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpXG5cdFx0XHRcdFx0YXJndW1lbnRzWzBdW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XVxuXHRcdFx0aSsrXG5cdFx0YXJndW1lbnRzWzBdXG5cblx0c2V0TWVzc2FnZSA9IChwYXJhbSwgdHlwZSkgLT5cblx0XHRpZiB0eXBlb2YgcGFyYW0gPT0gJ3N0cmluZydcblx0XHRcdG9wdHMgPVxuXHRcdFx0XHR0ZXh0OiBwYXJhbVxuXHRcdFx0XHR0eXBlOiB0eXBlXG5cdFx0XHRyZXR1cm4gb3B0c1xuXHRcdGVsc2UgaWYgcGFyYW0gIT0gbnVsbCAmJiB0eXBlb2YgcGFyYW0gPT0gJ29iamVjdCdcblx0XHRcdHJldHVybiBleHRlbmQocGFyYW0sIHtcblx0XHRcdFx0dHlwZTogdHlwZVxuXHRcdFx0fSlcblx0XHRlbHNlXG5cdFx0XHRyZXR1cm4geyB0eXBlOiB0eXBlIH1cblxuXHR3aW5kb3cuZ3Jvd2wgPSAob3B0cykgLT5cblxuXHRcdCRlbCA9IHVuZGVmaW5lZFxuXHRcdCRjb250YWluZXIgPSB1bmRlZmluZWRcblxuXHRcdGNvbmZpZyA9IGV4dGVuZChncm93bC5kZWZhdWx0cywgb3B0cylcblxuXHRcdHR5cGVDbGFzcyA9XG5cdFx0XHRzdWNjZXNzOiAnYWxlcnQtbWVzc2FnZS0tc3VjY2Vzcydcblx0XHRcdGluZm86ICdhbGVydC1tZXNzYWdlLS1pbmZvJ1xuXHRcdFx0d2FybmluZzogJ2FsZXJ0LW1lc3NhZ2UtLXdhcm5pbmcnXG5cdFx0XHRlcnJvcjogJ2FsZXJ0LW1lc3NhZ2UtLWVycm9yJ1xuXG5cdFx0Y2xvc2VDbGFzcyA9ICdhbGVydC1tZXNzYWdlX19jbG9zZSdcblx0XHRjb250YWluZXJDbGFzcyA9ICdjb250YWluZXItYWxlcnQtbWVzc2FnZSdcblx0XHRmYWRlQXdheVRpbWVvdXQgPSB1bmRlZmluZWRcblxuXHRcdGJvb3RzdHJhcCA9IC0+XG5cdFx0XHQkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignIycgKyBjb25maWcuY29udGFpbmVySWQpXG5cblx0XHRcdGlmICRjb250YWluZXIgPT0gbnVsbFxuXHRcdFx0XHQkY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2lkJywgY29uZmlnLmNvbnRhaW5lcklkKVxuXHRcdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjb250YWluZXJDbGFzcylcblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkKCRjb250YWluZXIpXG5cblx0XHRcdCRlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHQkZWwuaW5uZXJIVE1MID0gaHRtbFRlbXBsYXRlXG5cdFx0XHQkZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGNvbmZpZy5jbGFzcylcblx0XHRcdCRjb250YWluZXIuaW5zZXJ0QmVmb3JlKCRlbCwgJGNvbnRhaW5lci5maXJzdENoaWxkKVxuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQodHlwZUNsYXNzW2NvbmZpZy50eXBlXSlcblx0XHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuYWxlcnQtbWVzc2FnZV9fdGV4dCcpLmlubmVySFRNTCA9IGNvbmZpZy50ZXh0XG5cdFx0XHRvcGVuTWVzc2FnZSgpXG5cblx0XHRcdGlmIGNvbmZpZy5mYWRlQXdheSBhbmQgIWlzTmFOKGNvbmZpZy5mYWRlQXdheVRpbWVvdXQpXG5cdFx0XHRcdGZhZGVBd2F5VGltZW91dCA9IHNldFRpbWVvdXQoKC0+XG5cdFx0XHRcdFx0Y2xvc2VNZXNzYWdlKClcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0KSwgY29uZmlnLmZhZGVBd2F5VGltZW91dClcblx0XHRcdHJldHVyblxuXG5cdFx0b3Blbk1lc3NhZ2UgPSAtPlxuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQoY29uZmlnLmFjdGl2ZUNsYXNzKVxuXHRcdFx0Y2xlYXJUaW1lb3V0IGZhZGVBd2F5VGltZW91dFxuXG5cdFx0XHRpZiBjb25maWcuYWxlcnRCb3hMb2FkZWRDQiBpbnN0YW5jZW9mIEZ1bmN0aW9uXG5cdFx0XHRcdGNvbmZpZy5hbGVydEJveExvYWRlZENCKCRlbClcblx0XHRcdHJldHVyblxuXG5cdFx0Y2xvc2VNZXNzYWdlID0gLT5cblx0XHRcdCRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKCRlbClcblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0XHRcdFx0Y29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCKCRlbClcblx0XHRcdHJldHVyblxuXG5cdFx0Ym9vdHN0cmFwKClcblxuXHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsb3NlQ2xhc3MpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgcmV0dXJuXG5cdFx0cmV0dXJuICRlbFxuXG5cdHdpbmRvdy5ncm93bC5kZWZhdWx0cyA9XG5cdFx0Y2xhc3M6ICdhbGVydC1tZXNzYWdlJ1xuXHRcdGFjdGl2ZUNsYXNzOiAnYWxlcnQtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdGNvbnRhaW5lcklkOiAnZ3Jvd2wtY29udGFpbmVyJ1xuXHRcdHR5cGU6ICdzdWNjZXNzJ1xuXHRcdHRleHQ6ICdXZWxjb21lIHRvIHRoZSBBbGVydCBNZXNzYWdlISdcblx0XHRmYWRlQXdheTogZmFsc2Vcblx0XHRmYWRlQXdheVRpbWVvdXQ6IDUwMDBcblx0XHRhbGVydEJveExvYWRlZENCOiB1bmRlZmluZWRcblx0XHRhbGVydEJveE9uQ2xvc2VDQjogdW5kZWZpbmVkXG5cblx0d2luZG93Lmdyb3dsLnN1Y2Nlc3MgPSAob3B0cykgLT5cblx0XHRncm93bChzZXRNZXNzYWdlKG9wdHMsICdzdWNjZXNzJykpXG5cblx0d2luZG93Lmdyb3dsLmVycm9yID0gKG9wdHMpIC0+XG5cdFx0Z3Jvd2woc2V0TWVzc2FnZShvcHRzLCAnZXJyb3InKSlcblxuXHR3aW5kb3cuZ3Jvd2wud2FybmluZyA9IChvcHRzKSAtPlxuXHRcdGdyb3dsKHNldE1lc3NhZ2Uob3B0cywgJ3dhcm5pbmcnKSlcblxuXHR3aW5kb3cuZ3Jvd2wuaW5mbyA9IChvcHRzKSAtPlxuXHRcdGdyb3dsKHNldE1lc3NhZ2Uob3B0cywgJ2luZm8nKSlcblxuXHR3aW5kb3cuZ3Jvd2xcbiJdfQ==
