
import {
    extend,
    animationEnd,
    defineType
} from './util'

import {
    types,
    defaults,
    template
} from './vars'


const growl = opts => {
    
    const config = extend(growl.defaults, opts)
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
