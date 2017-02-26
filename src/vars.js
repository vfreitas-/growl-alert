
/**
 * 
 */
export const types = {
    success: 'alert-message--success',
    info: 'alert-message--info',
    warning: 'alert-message--warning',
    error: 'alert-message--error'
}

/**
 * 
 */
export const defaults = {
    "class": 'alert-message',
    activeClass: 'alert-message--active',
    closingClass: 'alert-message--closing',
    containerId: 'growl-container',
    type: 'success',
    text: 'Simple notification',
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
    <div class="alert-message__close"></div>
    <div class="alert-message__icon"></div>
    <p class="alert-message__text"></p>
`