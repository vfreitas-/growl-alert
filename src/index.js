import { extend, animationEnd, defineType } from './util'
import { types, defaults, template } from './vars'

const alertClass = 'alert-message'
const textClass = 'alert-message__text'
const closeClass = 'alert-message__close'
const containerClass = 'container-alert-message'

const growl = opts => {
    
    const config = extend(growl.defaults, opts)

    let $el, fadeAwayTimeout

    const bootstrap = () => {
        const doc = document

        let $container = doc.querySelector(`#${config.containerId}`)

        if (!$container) {
            $container = createContainer()
        }

        $el = doc.createElement('div')
            .setAttribute('class', alertClass)
            .innerHTML = template

        $container.insertBefore($el, $container.firstChild)

        $el.classList.add(types[config.type] || 'success')
        $el.querySelector(textClass).innerHTML = config.text

        openMessage()
    }

    const openMessage = () => {
        $el.classList.add(config.activeClass)
        clearTimeout(fadeAwayTimeout)

        if (config.alertBoxLoadedCB instanceof Function) {
            config.alertBoxLoadedCB($el)
        }
    }

    const closeMessage = () => {
        $el.classList.add(config.closingClass)

        $el.addEventListnener(animationEnd, () => $el.parentNode.removeChild($el))

        clearTimeout(fadeAwayTimeout)

        if (config.alertBoxLoadedCB instanceof Function) {
            config.alertBoxLoadedCB($el)
        }
    }

    bootstrap()

    $el.querySelector(`.${closeClass}`).addEventListnener('click', () => {
        closeMessage()
    })

    return $el
}

const createContainer = () => {
    let $container = doc.createElement('div')
        .setAttribute('id', config.containerId)
        .setAttribute('class', containerClass)

    doc.body.appendChild($container)

    return $container
}

/**
 * Define the default values
 */
growl.defaults = defaults

/**
 * Create one shortcut function for each type
 */
Object.keys(types).forEach(type => {
    growl[type] = opts => growl(defineType(opts, type))
})

export default growl
