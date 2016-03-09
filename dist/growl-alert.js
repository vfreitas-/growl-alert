'use strict';
(function(window) {
  var extend, htmlTemplate;
  htmlTemplate = "<div class=\"alert-message__close\"></div>\n<div class=\"alert-message__icon\"></div>\n<p class=\"alert-message__text\"></p>";
  extend = function() {
    var i, j, key, ref;
    for (i = j = 1, ref = arguments; 1 <= ref ? j < ref : j > ref; i = 1 <= ref ? ++j : --j) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          arguments[0][key] = arguments[i][key];
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

//# sourceMappingURL=data:application/json;base64,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REQ7O0lBSmE7SUFRZCxZQUFBLEdBQWUsU0FBQTtNQUNkLEdBQUcsQ0FBQyxVQUFVLENBQUMsV0FBZixDQUEyQixHQUEzQjtNQUNBLFlBQUEsQ0FBYSxlQUFiO01BRUEsSUFBRyxNQUFNLENBQUMsaUJBQVAsWUFBb0MsUUFBdkM7UUFDQyxNQUFNLENBQUMsaUJBQVAsQ0FBeUIsS0FBekIsRUFBZ0MsR0FBaEMsRUFERDs7SUFKYztJQVFmLFNBQUEsQ0FBQTtJQUVBLEdBQUcsQ0FBQyxhQUFKLENBQWtCLEdBQUEsR0FBTSxVQUF4QixDQUFtQyxDQUFDLGdCQUFwQyxDQUFxRCxPQUFyRCxFQUE4RCxTQUFBO01BQzdELFlBQUEsQ0FBQTtJQUQ2RCxDQUE5RDtJQUtBO0VBMUVjO0FBZmIsQ0FBQSxDQUFILENBQUksTUFBSiIsImZpbGUiOiJncm93bC1hbGVydC5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc3RyaWN0JztcblxuZG8gKHdpbmRvdykgLT5cblxuXHRodG1sVGVtcGxhdGUgPSBcIlwiXCJcblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fY2xvc2VcIj48L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9faWNvblwiPjwvZGl2PlxuXHRcdDxwIGNsYXNzPVwiYWxlcnQtbWVzc2FnZV9fdGV4dFwiPjwvcD5cblx0XHRcIlwiXCJcblxuXHRleHRlbmQgPSAtPlxuXHRcdGZvciBpIGluIFsxLi4uYXJndW1lbnRzXVxuXHRcdFx0Zm9yIGtleSBvZiBhcmd1bWVudHNbaV1cblx0XHRcdFx0aWYgYXJndW1lbnRzW2ldLmhhc093blByb3BlcnR5KGtleSlcblx0XHRcdFx0XHRhcmd1bWVudHNbMF1ba2V5XSA9IGFyZ3VtZW50c1tpXVtrZXldXG5cdFx0YXJndW1lbnRzWzBdXG5cblx0d2luZG93Lmdyb3dsID0gKG9wdHMpIC0+XG5cblx0XHQkZWwgPSB1bmRlZmluZWRcblx0XHQkY29udGFpbmVyID0gdW5kZWZpbmVkXG5cblx0XHRjb25maWcgPSBleHRlbmQoe1xuXHRcdFx0Y2xhc3M6ICdhbGVydC1tZXNzYWdlJ1xuXHRcdFx0YWN0aXZlQ2xhc3M6ICdhbGVydC1tZXNzYWdlLS1hY3RpdmUnXG5cdFx0XHRjb250YWluZXJJZDogJ2dyb3dsLWNvbnRhaW5lcidcblx0XHRcdHR5cGU6ICdzdWNjZXNzJ1xuXHRcdFx0dGV4dDogJ1dlbGNvbWUgdG8gdGhlIEFsZXJ0IE1lc3NhZ2UhJ1xuXHRcdFx0ZmFkZUF3YXk6IGZhbHNlXG5cdFx0XHRmYWRlQXdheVRpbWVvdXQ6IDUwMDBcblx0XHRcdGFsZXJ0Qm94TG9hZGVkQ0I6IHVuZGVmaW5lZFxuXHRcdFx0YWxlcnRCb3hPbkNsb3NlQ0I6IHVuZGVmaW5lZFxuXHRcdH0sIG9wdHMpXG5cblx0XHR0eXBlQ2xhc3MgPVxuXHRcdFx0c3VjY2VzczogJ2FsZXJ0LW1lc3NhZ2UtLXN1Y2Nlc3MnXG5cdFx0XHRpbmZvOiAnYWxlcnQtbWVzc2FnZS0taW5mbydcblx0XHRcdHdhcm5pbmc6ICdhbGVydC1tZXNzYWdlLS13YXJuaW5nJ1xuXHRcdFx0ZXJyb3I6ICdhbGVydC1tZXNzYWdlLS1lcnJvcidcblxuXHRcdGNsb3NlQ2xhc3MgPSAnYWxlcnQtbWVzc2FnZV9fY2xvc2UnXG5cdFx0Y29udGFpbmVyQ2xhc3MgPSAnY29udGFpbmVyLWFsZXJ0LW1lc3NhZ2UnXG5cdFx0ZmFkZUF3YXlUaW1lb3V0ID0gdW5kZWZpbmVkXG5cblx0XHRib290c3RyYXAgPSAtPlxuXHRcdFx0JGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY29uZmlnLmNvbnRhaW5lcklkKVxuXG5cdFx0XHRpZiAkY29udGFpbmVyID09IG51bGxcblx0XHRcdFx0JGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdCRjb250YWluZXIuc2V0QXR0cmlidXRlICdpZCcsIGNvbmZpZy5jb250YWluZXJJZFxuXHRcdFx0XHQkY29udGFpbmVyLnNldEF0dHJpYnV0ZSAnY2xhc3MnLCBjb250YWluZXJDbGFzc1xuXHRcdFx0XHRkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5JykuYXBwZW5kQ2hpbGQgJGNvbnRhaW5lclxuXG5cdFx0XHQkZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0JGVsLmlubmVySFRNTCA9IGh0bWxUZW1wbGF0ZVxuXHRcdFx0JGVsLnNldEF0dHJpYnV0ZSAnY2xhc3MnLCBjb25maWcuY2xhc3Ncblx0XHRcdCRjb250YWluZXIuaW5zZXJ0QmVmb3JlICRlbCwgJGNvbnRhaW5lci5maXJzdENoaWxkXG5cdFx0XHQkZWwuY2xhc3NMaXN0LmFkZCB0eXBlQ2xhc3NbY29uZmlnLnR5cGVdXG5cdFx0XHQkZWwucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1lc3NhZ2VfX3RleHQnKS5pbm5lckhUTUwgPSBjb25maWcudGV4dFxuXHRcdFx0b3Blbk1lc3NhZ2UoKVxuXG5cdFx0XHRpZiBjb25maWcuZmFkZUF3YXkgYW5kICFpc05hTihjb25maWcuZmFkZUF3YXlUaW1lb3V0KVxuXHRcdFx0XHRmYWRlQXdheVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgtPlxuXHRcdFx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdCksIGNvbmZpZy5mYWRlQXdheVRpbWVvdXQpXG5cdFx0XHRyZXR1cm5cblxuXHRcdG9wZW5NZXNzYWdlID0gLT5cblx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkIGNvbmZpZy5hY3RpdmVDbGFzc1xuXHRcdFx0Y2xlYXJUaW1lb3V0IGZhZGVBd2F5VGltZW91dFxuXG5cdFx0XHRpZiBjb25maWcuYWxlcnRCb3hMb2FkZWRDQiBpbnN0YW5jZW9mIEZ1bmN0aW9uXG5cdFx0XHRcdGNvbmZpZy5hbGVydEJveExvYWRlZENCICRzZWxmLCAkZWxcblx0XHRcdHJldHVyblxuXG5cdFx0Y2xvc2VNZXNzYWdlID0gLT5cblx0XHRcdCRlbC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkICRlbFxuXHRcdFx0Y2xlYXJUaW1lb3V0IGZhZGVBd2F5VGltZW91dFxuXG5cdFx0XHRpZiBjb25maWcuYWxlcnRCb3hPbkNsb3NlQ0IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXHRcdFx0XHRjb25maWcuYWxlcnRCb3hPbkNsb3NlQ0IgJHNlbGYsICRlbFxuXHRcdFx0cmV0dXJuXG5cblx0XHRib290c3RyYXAoKVxuXG5cdFx0JGVsLnF1ZXJ5U2VsZWN0b3IoJy4nICsgY2xvc2VDbGFzcykuYWRkRXZlbnRMaXN0ZW5lciAnY2xpY2snLCAtPlxuXHRcdFx0Y2xvc2VNZXNzYWdlKClcblx0XHRcdHJldHVyblxuXHRcdFx0XG5cdFx0IyByZXR1cm5cblx0XHQkZWxcblxuXHRcdHJldHVyblxuIl19
