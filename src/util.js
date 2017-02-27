
/**
 * 
 */
export const extend = obj => {
    [].forEach.call(
        [].slice.call(arguments, 1), source => {
            if (source) {
                for (let prop in source) {
                    obj[prop] = source[prop];
                }
            }
        }
    )

    return obj
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