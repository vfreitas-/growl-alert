
/**
 * 
 */
export const types = {
    success: 'growl-alert--success',
    info: 'growl-alert--info',
    warning: 'growl-alert--warning',
    error: 'growl-alert--error'
}

/**
 * 
 */
export const classes = {
    alertClass: 'growl-alert',
    activeClass: 'growl-alert--active',
    closingClass: 'growl-alert--closing',
    textClass: 'growl-alert__text',
    closeClass: 'growl-alert__close',
    containerClass: 'container-growl-alert',
}

/**
 * 
 */
export const defaults = {
    activeClass: 'growl-alert--active',
    closingClass: 'growl-alert--closing',
    containerId: 'growl-container',
    type: 'success',
    text: 'Growl Alert',
    closeOnClick: false,
    fadeAway: false,
    fadeAwayTimeout: 5000,
    opened: void 0,
    closed: void 0
}

/**
 * 
 */
export const template = `
    <div class="growl-alert__close"></div>
    <div class="growl-alert__icon"></div>
    <p class="growl-alert__text"></p>
`