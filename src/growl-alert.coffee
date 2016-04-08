
do (window) ->
    'use strict';

    htmlTemplate = """
        <div class="alert-message__close"></div>
        <div class="alert-message__icon"></div>
        <p class="alert-message__text"></p>
        """

    extend = ->
        i = 1
        while i < arguments.length
            for key of arguments[i]
                if arguments[i].hasOwnProperty(key)
                    arguments[0][key] = arguments[i][key]
                i++
            arguments[0]

    animationProp = do ->
        el = document.createElement('fake')
        animations =
            'animation': 'animationend'
            'OAnimation': 'oAnimationEnd'
            'MozAnimation': 'animationend'
            'WebkitAnimation': 'webkitAnimationEnd'
        for a of animations
            if el.style[a] != undefined
                return animations[a]

    setMessage = (param, type) ->
        if typeof param == 'string'
            opts =
                text: param
                type: type
            return opts
        else if param != null && typeof param == 'object'
            return extend(param, {
                type: type
            })
        else
            return { type: type }

    window.growl = (opts) ->

        $el = undefined
        $container = undefined

        config = extend(growl.defaults, opts)

        typeClass =
            success: 'alert-message--success'
            info: 'alert-message--info'
            warning: 'alert-message--warning'
            error: 'alert-message--error'

        closeClass = 'alert-message__close'
        containerClass = 'container-alert-message'
        fadeAwayTimeout = undefined

        bootstrap = ->
            $container = document.querySelector('#' + config.containerId)

            if $container == null
                $container = document.createElement('div')
                $container.setAttribute('id', config.containerId)
                $container.setAttribute('class', containerClass)
                document.querySelector('body').appendChild($container)

            $el = document.createElement('div')
            $el.innerHTML = htmlTemplate
            $el.setAttribute('class', config.class)
            $container.insertBefore($el, $container.firstChild)
            $el.classList.add(typeClass[config.type])
            $el.querySelector('.alert-message__text').innerHTML = config.text
            openMessage()

            if config.closeOnClick
                $el.addEventListener('click touchstart', ->
                    closeMessage()
                )

            if config.fadeAway and !isNaN(config.fadeAwayTimeout)
                fadeAwayTimeout = setTimeout((->
                    closeMessage()
                    return
                ), config.fadeAwayTimeout)
            return

        openMessage = ->
            $el.classList.add(config.activeClass)
            clearTimeout fadeAwayTimeout

            if config.alertBoxLoadedCB instanceof Function
                config.alertBoxLoadedCB($el)
            return

        closeMessage = ->
            $el.classList.add(config.closingClass)

            $el.addEventListener(animationProp, ->
                $el.parentNode.removeChild($el)
            )

            clearTimeout fadeAwayTimeout

            if config.alertBoxOnCloseCB instanceof Function
                config.alertBoxOnCloseCB($el)
            return

        bootstrap()

        $el.querySelector('.' + closeClass).addEventListener 'click', ->
            closeMessage()
            return

        # return
        return $el

    window.growl.defaults =
        class: 'alert-message'
        activeClass: 'alert-message--active'
        closingClass: 'alert-message--closing'
        containerId: 'growl-container'
        type: 'success'
        text: 'Simple notification'
        closeOnClick: false
        fadeAway: false
        fadeAwayTimeout: 5000
        alertBoxLoadedCB: undefined
        alertBoxOnCloseCB: undefined

    window.growl.success = (opts) ->
        growl(setMessage(opts, 'success'))

    window.growl.error = (opts) ->
        growl(setMessage(opts, 'error'))

    window.growl.warning = (opts) ->
        growl(setMessage(opts, 'warning'))

    window.growl.info = (opts) ->
        growl(setMessage(opts, 'info'))

    window.growl
