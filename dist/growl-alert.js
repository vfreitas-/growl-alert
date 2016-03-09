'use strict';
(function(window) {
  var extend, htmlTemplate;
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
  return window.growl = function(opts) {
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
    $el;
  };
})(window);

//# sourceMappingURL=data:application/json;base64,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Q0MsTUFBTSxDQUFDLGdCQUFQLENBQXdCLEtBQXhCLEVBQStCLEdBQS9CLEVBREQ7O0lBSmE7SUFRZCxZQUFBLEdBQWUsU0FBQTtNQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBZixDQUEyQixHQUEzQjtNQUNBLFlBQUEsQ0FBYSxlQUFiO01BRUEsSUFBRyxNQUFNLENBQUMsaUJBQVAsWUFBb0MsUUFBdkM7UUFDQyxNQUFNLENBQUMsaUJBQVAsQ0FBeUIsS0FBekIsRUFBZ0MsR0FBaEMsRUFERDs7SUFKYztJQVFmLFNBQUEsQ0FBQTtJQUVBLEdBQUcsQ0FBQyxhQUFKLENBQWtCLEdBQUEsR0FBTSxVQUF4QixDQUFtQyxDQUFDLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxTQUFBO01BQzdELFlBQUEsQ0FBQTtJQUQ2RCxDQUE5RDtJQUtBO0VBMUVjO0FBakJiLENBQUEsQ0FBSCxDQUFJLE1BQUoiLCJmaWxlIjoiZ3Jvd2wtYWxlcnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmRvICh3aW5kb3cpIC0+XG5cblx0aHRtbFRlbXBsYXRlID0gXCJcIlwiXG5cdFx0PGRpdiBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX2Nsb3NlXCI+PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX2ljb25cIj48L2Rpdj5cblx0XHQ8cCBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX3RleHRcIj48L3A+XG5cdFx0XCJcIlwiXG5cblx0ZXh0ZW5kID0gLT5cblx0XHRpID0gMVxuXHRcdHdoaWxlIGkgPCBhcmd1bWVudHMubGVuZ3RoXG5cdFx0XHRmb3Iga2V5IG9mIGFyZ3VtZW50c1tpXVxuXHRcdFx0XHRpZiBhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KVxuXHRcdFx0XHRcdGFyZ3VtZW50c1swXVtrZXldID0gYXJndW1lbnRzW2ldW2tleV1cblx0XHRcdGkrK1xuXHRcdGFyZ3VtZW50c1swXVxuXG5cdHdpbmRvdy5ncm93bCA9IChvcHRzKSAtPlxuXG5cdFx0JGVsID0gdW5kZWZpbmVkXG5cdFx0JGNvbnRhaW5lciA9IHVuZGVmaW5lZFxuXG5cdFx0Y29uZmlnID0gZXh0ZW5kKHtcblx0XHRcdGNsYXNzOiAnYWxlcnQtbWVzc2FnZSdcblx0XHRcdGFjdGl2ZUNsYXNzOiAnYWxlcnQtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdFx0Y29udGFpbmVySWQ6ICdncm93bC1jb250YWluZXInXG5cdFx0XHR0eXBlOiAnc3VjY2Vzcydcblx0XHRcdHRleHQ6ICdXZWxjb21lIHRvIHRoZSBBbGVydCBNZXNzYWdlISdcblx0XHRcdGZhZGVBd2F5OiBmYWxzZVxuXHRcdFx0ZmFkZUF3YXlUaW1lb3V0OiA1MDAwXG5cdFx0XHRhbGVydEJveExvYWRlZENCOiB1bmRlZmluZWRcblx0XHRcdGFsZXJ0Qm94T25DbG9zZUNCOiB1bmRlZmluZWRcblx0XHR9LCBvcHRzKVxuXG5cdFx0dHlwZUNsYXNzID1cblx0XHRcdHN1Y2Nlc3M6ICdhbGVydC1tZXNzYWdlLS1zdWNjZXNzJ1xuXHRcdFx0aW5mbzogJ2FsZXJ0LW1lc3NhZ2UtLWluZm8nXG5cdFx0XHR3YXJuaW5nOiAnYWxlcnQtbWVzc2FnZS0td2FybmluZydcblx0XHRcdGVycm9yOiAnYWxlcnQtbWVzc2FnZS0tZXJyb3InXG5cblx0XHRjbG9zZUNsYXNzID0gJ2FsZXJ0LW1lc3NhZ2VfX2Nsb3NlJ1xuXHRcdGNvbnRhaW5lckNsYXNzID0gJ2NvbnRhaW5lci1hbGVydC1tZXNzYWdlJ1xuXHRcdGZhZGVBd2F5VGltZW91dCA9IHVuZGVmaW5lZFxuXG5cdFx0Ym9vdHN0cmFwID0gLT5cblx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNvbmZpZy5jb250YWluZXJJZClcblxuXHRcdFx0aWYgJGNvbnRhaW5lciA9PSBudWxsXG5cdFx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZSAnaWQnLCBjb25maWcuY29udGFpbmVySWRcblx0XHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29udGFpbmVyQ2xhc3Ncblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkICRjb250YWluZXJcblxuXHRcdFx0JGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdCRlbC5pbm5lckhUTUwgPSBodG1sVGVtcGxhdGVcblx0XHRcdCRlbC5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29uZmlnLmNsYXNzXG5cdFx0XHQkY29udGFpbmVyLmluc2VydEJlZm9yZSAkZWwsICRjb250YWluZXIuZmlyc3RDaGlsZFxuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQgdHlwZUNsYXNzW2NvbmZpZy50eXBlXVxuXHRcdFx0JGVsLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tZXNzYWdlX190ZXh0JykuaW5uZXJIVE1MID0gY29uZmlnLnRleHRcblx0XHRcdG9wZW5NZXNzYWdlKClcblxuXHRcdFx0aWYgY29uZmlnLmZhZGVBd2F5IGFuZCAhaXNOYU4oY29uZmlnLmZhZGVBd2F5VGltZW91dClcblx0XHRcdFx0ZmFkZUF3YXlUaW1lb3V0ID0gc2V0VGltZW91dCgoLT5cblx0XHRcdFx0XHRjbG9zZU1lc3NhZ2UoKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHQpLCBjb25maWcuZmFkZUF3YXlUaW1lb3V0KVxuXHRcdFx0cmV0dXJuXG5cblx0XHRvcGVuTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCBjb25maWcuYWN0aXZlQ2xhc3Ncblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94TG9hZGVkQ0IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXHRcdFx0XHRjb25maWcuYWxlcnRCb3hMb2FkZWRDQiAkc2VsZiwgJGVsXG5cdFx0XHRyZXR1cm5cblxuXHRcdGNsb3NlTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCAkZWxcblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0XHRcdFx0Y29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCICRzZWxmLCAkZWxcblx0XHRcdHJldHVyblxuXG5cdFx0Ym9vdHN0cmFwKClcblxuXHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsb3NlQ2xhc3MpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgcmV0dXJuXG5cdFx0JGVsXG5cblx0XHRyZXR1cm5cbiJdfQ==
