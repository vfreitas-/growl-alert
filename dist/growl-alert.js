'use strict';
(function(window) {
  var animationProp, extend, htmlTemplate, setMessage;
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

//# sourceMappingURL=data:application/json;base64,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QXJFTztFQXVFZixNQUFNLENBQUMsS0FBSyxDQUFDLFFBQWIsR0FDQztJQUFBLE9BQUEsRUFBTyxlQUFQO0lBQ0EsV0FBQSxFQUFhLHVCQURiO0lBRUEsWUFBQSxFQUFjLHdCQUZkO0lBR0EsV0FBQSxFQUFhLGlCQUhiO0lBSUEsSUFBQSxFQUFNLFNBSk47SUFLQSxJQUFBLEVBQU0sK0JBTE47SUFNQSxRQUFBLEVBQVUsS0FOVjtJQU9BLGVBQUEsRUFBaUIsSUFQakI7SUFRQSxnQkFBQSxFQUFrQixNQVJsQjtJQVNBLGlCQUFBLEVBQW1CLE1BVG5COztFQVdELE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBYixHQUF1QixTQUFDLElBQUQ7V0FDdEIsS0FBQSxDQUFNLFVBQUEsQ0FBVyxJQUFYLEVBQWlCLFNBQWpCLENBQU47RUFEc0I7RUFHdkIsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFiLEdBQXFCLFNBQUMsSUFBRDtXQUNwQixLQUFBLENBQU0sVUFBQSxDQUFXLElBQVgsRUFBaUIsT0FBakIsQ0FBTjtFQURvQjtFQUdyQixNQUFNLENBQUMsS0FBSyxDQUFDLE9BQWIsR0FBdUIsU0FBQyxJQUFEO1dBQ3RCLEtBQUEsQ0FBTSxVQUFBLENBQVcsSUFBWCxFQUFpQixTQUFqQixDQUFOO0VBRHNCO0VBR3ZCLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBYixHQUFvQixTQUFDLElBQUQ7V0FDbkIsS0FBQSxDQUFNLFVBQUEsQ0FBVyxJQUFYLEVBQWlCLE1BQWpCLENBQU47RUFEbUI7U0FHcEIsTUFBTSxDQUFDO0FBeElMLENBQUEsQ0FBSCxDQUFJLE1BQUoiLCJmaWxlIjoiZ3Jvd2wtYWxlcnQuanMiLCJzb3VyY2VSb290IjoiL3NvdXJjZS8iLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIHN0cmljdCc7XG5cbmRvICh3aW5kb3cpIC0+XG5cblx0aHRtbFRlbXBsYXRlID0gXCJcIlwiXG5cdFx0PGRpdiBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX2Nsb3NlXCI+PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX2ljb25cIj48L2Rpdj5cblx0XHQ8cCBjbGFzcz1cImFsZXJ0LW1lc3NhZ2VfX3RleHRcIj48L3A+XG5cdFx0XCJcIlwiXG5cblx0ZXh0ZW5kID0gLT5cblx0XHRpID0gMVxuXHRcdHdoaWxlIGkgPCBhcmd1bWVudHMubGVuZ3RoXG5cdFx0XHRmb3Iga2V5IG9mIGFyZ3VtZW50c1tpXVxuXHRcdFx0XHRpZiBhcmd1bWVudHNbaV0uaGFzT3duUHJvcGVydHkoa2V5KVxuXHRcdFx0XHRcdGFyZ3VtZW50c1swXVtrZXldID0gYXJndW1lbnRzW2ldW2tleV1cblx0XHRcdGkrK1xuXHRcdGFyZ3VtZW50c1swXVxuXG5cdGFuaW1hdGlvblByb3AgPSBkbyAtPlxuXHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZmFrZScpXG5cdFx0YW5pbWF0aW9ucyA9XG5cdFx0XHQnYW5pbWF0aW9uJzogJ2FuaW1hdGlvbmVuZCdcblx0XHRcdCdPQW5pbWF0aW9uJzogJ29BbmltYXRpb25FbmQnXG5cdFx0XHQnTW96QW5pbWF0aW9uJzogJ2FuaW1hdGlvbmVuZCdcblx0XHRcdCdXZWJraXRBbmltYXRpb24nOiAnd2Via2l0QW5pbWF0aW9uRW5kJ1xuXHRcdGZvciBhIG9mIGFuaW1hdGlvbnNcblx0XHRcdGlmIGVsLnN0eWxlW2FdICE9IHVuZGVmaW5lZFxuXHRcdFx0XHRyZXR1cm4gYW5pbWF0aW9uc1thXVxuXG5cdHNldE1lc3NhZ2UgPSAocGFyYW0sIHR5cGUpIC0+XG5cdFx0aWYgdHlwZW9mIHBhcmFtID09ICdzdHJpbmcnXG5cdFx0XHRvcHRzID1cblx0XHRcdFx0dGV4dDogcGFyYW1cblx0XHRcdFx0dHlwZTogdHlwZVxuXHRcdFx0cmV0dXJuIG9wdHNcblx0XHRlbHNlIGlmIHBhcmFtICE9IG51bGwgJiYgdHlwZW9mIHBhcmFtID09ICdvYmplY3QnXG5cdFx0XHRyZXR1cm4gZXh0ZW5kKHBhcmFtLCB7XG5cdFx0XHRcdHR5cGU6IHR5cGVcblx0XHRcdH0pXG5cdFx0ZWxzZVxuXHRcdFx0cmV0dXJuIHsgdHlwZTogdHlwZSB9XG5cblx0d2luZG93Lmdyb3dsID0gKG9wdHMpIC0+XG5cblx0XHQkZWwgPSB1bmRlZmluZWRcblx0XHQkY29udGFpbmVyID0gdW5kZWZpbmVkXG5cblx0XHRjb25maWcgPSBleHRlbmQoZ3Jvd2wuZGVmYXVsdHMsIG9wdHMpXG5cblx0XHR0eXBlQ2xhc3MgPVxuXHRcdFx0c3VjY2VzczogJ2FsZXJ0LW1lc3NhZ2UtLXN1Y2Nlc3MnXG5cdFx0XHRpbmZvOiAnYWxlcnQtbWVzc2FnZS0taW5mbydcblx0XHRcdHdhcm5pbmc6ICdhbGVydC1tZXNzYWdlLS13YXJuaW5nJ1xuXHRcdFx0ZXJyb3I6ICdhbGVydC1tZXNzYWdlLS1lcnJvcidcblxuXHRcdGNsb3NlQ2xhc3MgPSAnYWxlcnQtbWVzc2FnZV9fY2xvc2UnXG5cdFx0Y29udGFpbmVyQ2xhc3MgPSAnY29udGFpbmVyLWFsZXJ0LW1lc3NhZ2UnXG5cdFx0ZmFkZUF3YXlUaW1lb3V0ID0gdW5kZWZpbmVkXG5cblx0XHRib290c3RyYXAgPSAtPlxuXHRcdFx0JGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyMnICsgY29uZmlnLmNvbnRhaW5lcklkKVxuXG5cdFx0XHRpZiAkY29udGFpbmVyID09IG51bGxcblx0XHRcdFx0JGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cdFx0XHRcdCRjb250YWluZXIuc2V0QXR0cmlidXRlKCdpZCcsIGNvbmZpZy5jb250YWluZXJJZClcblx0XHRcdFx0JGNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgY29udGFpbmVyQ2xhc3MpXG5cdFx0XHRcdGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKS5hcHBlbmRDaGlsZCgkY29udGFpbmVyKVxuXG5cdFx0XHQkZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRcdFx0JGVsLmlubmVySFRNTCA9IGh0bWxUZW1wbGF0ZVxuXHRcdFx0JGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBjb25maWcuY2xhc3MpXG5cdFx0XHQkY29udGFpbmVyLmluc2VydEJlZm9yZSgkZWwsICRjb250YWluZXIuZmlyc3RDaGlsZClcblx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKHR5cGVDbGFzc1tjb25maWcudHlwZV0pXG5cdFx0XHQkZWwucXVlcnlTZWxlY3RvcignLmFsZXJ0LW1lc3NhZ2VfX3RleHQnKS5pbm5lckhUTUwgPSBjb25maWcudGV4dFxuXHRcdFx0b3Blbk1lc3NhZ2UoKVxuXG5cdFx0XHRpZiBjb25maWcuZmFkZUF3YXkgYW5kICFpc05hTihjb25maWcuZmFkZUF3YXlUaW1lb3V0KVxuXHRcdFx0XHRmYWRlQXdheVRpbWVvdXQgPSBzZXRUaW1lb3V0KCgtPlxuXHRcdFx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdCksIGNvbmZpZy5mYWRlQXdheVRpbWVvdXQpXG5cdFx0XHRyZXR1cm5cblxuXHRcdG9wZW5NZXNzYWdlID0gLT5cblx0XHRcdCRlbC5jbGFzc0xpc3QuYWRkKGNvbmZpZy5hY3RpdmVDbGFzcylcblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94TG9hZGVkQ0IgaW5zdGFuY2VvZiBGdW5jdGlvblxuXHRcdFx0XHRjb25maWcuYWxlcnRCb3hMb2FkZWRDQigkZWwpXG5cdFx0XHRyZXR1cm5cblxuXHRcdGNsb3NlTWVzc2FnZSA9IC0+XG5cdFx0XHQkZWwuY2xhc3NMaXN0LmFkZChjb25maWcuY2xvc2luZ0NsYXNzKVxuXG5cdFx0XHQkZWwuYWRkRXZlbnRMaXN0ZW5lcihhbmltYXRpb25Qcm9wLCAtPlxuXHRcdFx0XHQkZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZCgkZWwpXG5cdFx0XHQpXG5cblx0XHRcdGNsZWFyVGltZW91dCBmYWRlQXdheVRpbWVvdXRcblxuXHRcdFx0aWYgY29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCIGluc3RhbmNlb2YgRnVuY3Rpb25cblx0XHRcdFx0Y29uZmlnLmFsZXJ0Qm94T25DbG9zZUNCKCRlbClcblx0XHRcdHJldHVyblxuXG5cdFx0Ym9vdHN0cmFwKClcblxuXHRcdCRlbC5xdWVyeVNlbGVjdG9yKCcuJyArIGNsb3NlQ2xhc3MpLmFkZEV2ZW50TGlzdGVuZXIgJ2NsaWNrJywgLT5cblx0XHRcdGNsb3NlTWVzc2FnZSgpXG5cdFx0XHRyZXR1cm5cblxuXHRcdCMgcmV0dXJuXG5cdFx0cmV0dXJuICRlbFxuXG5cdHdpbmRvdy5ncm93bC5kZWZhdWx0cyA9XG5cdFx0Y2xhc3M6ICdhbGVydC1tZXNzYWdlJ1xuXHRcdGFjdGl2ZUNsYXNzOiAnYWxlcnQtbWVzc2FnZS0tYWN0aXZlJ1xuXHRcdGNsb3NpbmdDbGFzczogJ2FsZXJ0LW1lc3NhZ2UtLWNsb3NpbmcnXG5cdFx0Y29udGFpbmVySWQ6ICdncm93bC1jb250YWluZXInXG5cdFx0dHlwZTogJ3N1Y2Nlc3MnXG5cdFx0dGV4dDogJ1dlbGNvbWUgdG8gdGhlIEFsZXJ0IE1lc3NhZ2UhJ1xuXHRcdGZhZGVBd2F5OiBmYWxzZVxuXHRcdGZhZGVBd2F5VGltZW91dDogNTAwMFxuXHRcdGFsZXJ0Qm94TG9hZGVkQ0I6IHVuZGVmaW5lZFxuXHRcdGFsZXJ0Qm94T25DbG9zZUNCOiB1bmRlZmluZWRcblxuXHR3aW5kb3cuZ3Jvd2wuc3VjY2VzcyA9IChvcHRzKSAtPlxuXHRcdGdyb3dsKHNldE1lc3NhZ2Uob3B0cywgJ3N1Y2Nlc3MnKSlcblxuXHR3aW5kb3cuZ3Jvd2wuZXJyb3IgPSAob3B0cykgLT5cblx0XHRncm93bChzZXRNZXNzYWdlKG9wdHMsICdlcnJvcicpKVxuXG5cdHdpbmRvdy5ncm93bC53YXJuaW5nID0gKG9wdHMpIC0+XG5cdFx0Z3Jvd2woc2V0TWVzc2FnZShvcHRzLCAnd2FybmluZycpKVxuXG5cdHdpbmRvdy5ncm93bC5pbmZvID0gKG9wdHMpIC0+XG5cdFx0Z3Jvd2woc2V0TWVzc2FnZShvcHRzLCAnaW5mbycpKVxuXG5cdHdpbmRvdy5ncm93bFxuIl19
