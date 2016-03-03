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
          i++;
        }
      }
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

//# sourceMappingURL=data:application/json;base64,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QU0sQ0FBQyxnQkFBUCxDQUF3QixLQUF4QixFQUErQixHQUEvQixFQUREOztJQUphO0lBUWQsWUFBQSxHQUFlLFNBQUE7TUFDZCxHQUFHLENBQUMsVUFBVSxDQUFDLFdBQWYsQ0FBMkIsR0FBM0I7TUFDQSxZQUFBLENBQWEsZUFBYjtNQUVBLElBQUcsTUFBTSxDQUFDLGlCQUFQLFlBQW9DLFFBQXZDO1FBQ0MsTUFBTSxDQUFDLGlCQUFQLENBQXlCLEtBQXpCLEVBQWdDLEdBQWhDLEVBREQ7O0lBSmM7SUFRZixTQUFBLENBQUE7SUFFQSxHQUFHLENBQUMsYUFBSixDQUFrQixHQUFBLEdBQU0sVUFBeEIsQ0FBbUMsQ0FBQyxnQkFBcEMsQ0FBcUQsT0FBckQsRUFBOEQsU0FBQTtNQUM3RCxZQUFBLENBQUE7SUFENkQsQ0FBOUQ7SUFJQTtFQXpFYztBQWpCYixDQUFBLENBQUgsQ0FBSSxNQUFKIiwiZmlsZSI6Imdyb3dsLWFsZXJ0LmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiZG8gKHdpbmRvdykgLT5cblxuXHRodG1sVGVtcGxhdGUgPSBcIlwiXCJcblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fY2xvc2VcIj48L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9faWNvblwiPjwvZGl2PlxuXHRcdDxwIGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fdGV4dFwiPjwvcD5cblx0XHRcIlwiXCJcblxuXHRleHRlbmQgPSAtPlxuXHRcdGkgPSAxXG5cdFx0d2hpbGUgaSA8IGFyZ3VtZW50cy5sZW5ndGhcblx0XHRcdGZvciBrZXkgb2YgYXJndW1lbnRzW2ldXG5cdFx0XHRcdGlmIGFyZ3VtZW50c1tpXS5oYXNPd25Qcm9wZXJ0eShrZXkpXG5cdFx0XHRcdFx0YXJndW1lbnRzWzBdW2tleV0gPSBhcmd1bWVudHNbaV1ba2V5XVxuXHRcdFx0XHRcdGkrK1xuXHRcdGFyZ3VtZW50c1swXVxuXG5cdHdpbmRvdy5ncm93bCA9IChvcHRzKSAtPlxuXG5cdFx0JGVsID0gdW5kZWZpbmVkXG5cdFx0JGNvbnRhaW5lciA9IHVuZGVmaW5lZFxuXG5cdFx0Y29uZmlnID0gZXh0ZW5kKHtcblx0XHRcdGNsYXNzOiAnYWxlcnQtbWVzc2FnZSdcblx0XHRcdGFjdGl2ZUNsYXNzOiAnYWxlcnQtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdFx0Y29udGFpbmVySWQ6ICdncm93bC1jb250YWluZXInXG5cdFx0XHR0eXBlOiAnc3VjY2Vzcydcblx0XHRcdHRleHQ6ICdXZWxjb21lIHRvIHRoZSBBbGVydCBNZXNzYWdlISdcblx0XHRcdGZhZGVBd2F5OiBmYWxzZVxuXHRcdFx0ZmFkZUF3YXlUaW1lb3V0OiA1MDAwXG5cdFx0XHRhbGVydEJveExvYWRlZENCOiB1bmRlZmluZWRcblx0XHRcdGFsZXJ0Qm94T25DbG9zZUNCOiB1bmRlZmluZWRcblx0XHR9LCBvcHRzKVxuXG5cdFx0dHlwZUNsYXNzID1cblx0XHRcdHN1Y2Nlc3M6ICdhbGVydC1tZXNzYWdlLS1zdWNjZXNzJ1xuXHRcdFx0aW5mbzogJ2FsZXJ0LW1lc3NhZ2UtLWluZm8nXG5cdFx0XHR3YXJuaW5nOiAnYWxlcnQtbWVzc2FnZS0td2FybmluZydcblx0XHRcdGVycm9yOiAnYWxlcnQtbWVzc2FnZS0tZXJyb3InXG5cblx0XHRjbG9zZUNsYXNzID0gJ2FsZXJ0LW1lc3NhZ2VfX2Nsb3NlJ1xuXHRcdGNvbnRhaW5lckNsYXNzID0gJ2NvbnRhaW5lci1hbGVydC1tZXNzYWdlJ1xuXHRcdGZhZGVBd2F5VGltZW91dCA9IHVuZGVmaW5lZFxuXG5cdFx0Ym9vdHN0cmFwID0gLT5cblx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjJyArIGNvbmZpZy5jb250YWluZXJJZClcblxuXHRcdFx0aWYgJGNvbnRhaW5lciA9PSBudWxsXG5cdFx0XHRcdCRjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZSAnaWQnLCBjb25maWcuY29udGFpbmVySWRcblx0XHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29udGFpbmVyQ2xhc3Ncblx0XHRcdFx0ZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmFwcGVuZENoaWxkICRjb250YWluZXJcblxuXHRcdFx0JGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jylcblx0XHRcdCRlbC5pbm5lckhUTUwgPSBodG1sVGVtcGxhdGVcblx0XHRcdCRlbC5zZXRBdHRyaWJ1dGUgJ2NsYXNzJywgY29uZmlnLmNsYXNzXG5cdFx0XHQkY29udGFpbmVyLmluc2VydEJlZm9yZSAkZWwsICRjb250YWluZXIuZmlyc3RDaGlsZFxuXHRcdFx0JGVsLmNsYXNzTGlzdC5hZGQgdHlwZUNsYXNzW2NvbmZpZy50eXBlXVxuXHRcdFx0JGVsLnF1ZXJ5U2VsZWN0b3IoJy5hbGVydC1tZXNzYWdlX190ZXh0JykuaW5uZXJIVE1MID0gY29uZmlnLnRleHRcblx0XHRcdG9wZW5NZXNzYWdlKClcblxuXHRcdFx0aWYgY29uZmlnLmZhZGVBd2F5IGFuZCAhaXNOYU4oY29uZmlnLmZhZGVBd2F5VGltZW91dClcblx0XHRcdFx0ZmFkZUF3YXlUaW1lb3V0ID0gc2V0VGltZW91dCgoLT5cblx0XHRcdFx0XHRjbG9zZU1lc3NhZ2UoKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHQpLCBjb25maWcuZmFkZUF3YXlUaW1lb3V0KVxuXHRcdFx0cmV0dXJuXG5cblx0XHRvcGVuTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCBjb25maWcuYWN0aXZlQ2xhc3Ncblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94TG9hZGVkQ0IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXHRcdFx0XHRjb25maWcuYWxlcnRCb3hMb2FkZWRDQiAkc2VsZiwgJGVsXG5cdFx0XHRyZXR1cm5cblxuXHRcdGNsb3NlTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCAkZWxcblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0XHRcdFx0Y29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCICRzZWxmLCAkZWxcblx0XHRcdHJldHVyblxuXG5cdFx0Ym9vdHN0cmFwKClcblxuXHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsb3NlQ2xhc3MpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRyZXR1cm5cblx0XHQjIHJldHVyblxuXHRcdCRlbFxuXG5cdFx0cmV0dXJuXG4iXX0=
