
/**
 * 
 */
export const extend = () => {
    let i = 1, key

    while (i < arguments.length) {
        for (key in arguments[i]) {
            if (arguments[i].hasOwnProperty(key)) {
                arguments[0][key] = arguments[i][key]
            }
        }
        i++
    }
    return arguments[0]
}

/**
 * 
 */
export const animationEnd = (() => {
    let el = document.createElement('fake')

    let animations = {
      animation: 'animationend',
      OAnimation: 'oAnimationEnd',
      MozAnimation: 'animationend',
      WebkitAnimation: 'webkitAnimationEnd'
    }

    for (let a in animations) {
        if (el.style[a] !== void 0) {
            return animations[a]
        }
    }
})()

/**
 * 
 */
export const defineType = (param, type) => {
    if (typeof param === 'string') {
        let opts = {
            text: param,
            type
        }
        return opts
    } else if (param !== null && typeof param === 'object') {
        return extend(param, {
            type
        })
    } else {
        return { type }
    }
}