import {expect} from 'chai'
import growl from './../src/index'

const alertClass = 'alert-message'
const textClass = 'alert-message__text'
const closeClass = 'alert-message__close'
const containerClass = 'container-alert-message'

describe('growl', () => {

    it('growl should be a function', () => {
        expect(growl).to.be.a.function
    })

    it('should have defaults property', () => {
        expect(growl).to.have.property('defaults')
    })

    it('should have all message types as a property', () => {
        expect(growl).to.have.property('success')
        expect(growl).to.have.property('error')
        expect(growl).to.have.property('warning')
        expect(growl).to.have.property('info')
    })

    it('should create the growl container', () => {
        growl()
        expect(document.getElementsByClassName(containerClass)).to.exist
    })

})
