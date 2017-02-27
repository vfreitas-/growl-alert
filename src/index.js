import './sass/index.scss'
import { extend, animationEnd, defineType } from './util'
import { types, classes, defaults, template } from './vars'

const growl = opts => {
    const doc = document
    const config = extend(growl.defaults, opts)

    let $el, fadeAwayTimeout

    const bootstrap = () => {
        let $container = doc.getElementById(config.containerId)

        if (!$container) {
            $container = createContainer()
        }

        $el = doc.createElement('div')
        $el.setAttribute('class', classes.alertClass)
        $el.innerHTML = template

        $container.insertBefore($el, $container.firstChild)
        $el.classList.add(types[config.type] || types['success'])

        $el.querySelector(`.${classes.textClass}`).textContent = config.text

        openMessage()

        if (config.closeOnClick) {
            $el.addEventListener('click touchstart', () => closeMessage())
        }

        if (config.fadaAway && !isNaN(config.fadeAwayTimeout)) {
            fadeAwayTimeout = setTimeout(() => {
                closeMessage()
            }, config.fadeAwayTimeout)
        }

        $el.querySelector(`.${classes.closeClass}`).addEventListener('click', () => {
            closeMessage()
        })
    }

    const createContainer = () => {

        let $container = doc.createElement('div')
        $container.setAttribute('id', config.containerId)
        $container.setAttribute('class', classes.containerClass)

        doc.body.appendChild($container)

        return $container
    }

    const openMessage = () => {
        $el.classList.add(classes.activeClass)
        clearTimeout(fadeAwayTimeout)

        if (config.opened instanceof Function) {
            config.opened($el)
        }
    }

    const closeMessage = () => {
        $el.classList.add(classes.closingClass)

        $el.addEventListnener(animationEnd, () => $el.parentNode.removeChild($el))

        clearTimeout(fadeAwayTimeout)

        if (config.closed instanceof Function) {
            config.closed($el)
        }
    }

    bootstrap()

    return $el
}

/**
 * Define the default values
 */
growl.defaults = defaults

/**
 * Create a shortcut function for each type of alert
 */
Object.keys(types).forEach(type => {
    growl[type] = opts => growl(defineType(opts, type))
})


export default growl
