import {expect} from 'chai'
import sinon, {spy} from 'sinon'
import growl from './../src/index'
import { types } from './../src/vars'
import { animationEnd } from './../src/util'

const textClass = '.growl-alert__text'
const closeClass = '.growl-alert__close'
const growlClass = '.growl-alert'
const activeClass = 'growl-alert--active'
const closingClass = 'growl-alert--closing'
const containerId = '#growl-container'

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
        expect($(containerId)[0]).to.exist
    })

    afterEach(() => {
        if ($(containerId)[0]) {
            document.body.removeChild($(containerId)[0])
        }
    })

    it('should create a growl-alert message', () => {
        growl()

        expect(
            $(growlClass).get()
        ).to.have.lengthOf(1)
    })

    it('should push the alerts to the stack', () => {
        growl()
        growl()
        growl()

        expect(
            $(growlClass).get()
        ).to.have.lengthOf(3)
    })

    it('should show the given text', () => {
        growl({
            text: 'Testing'
        })

        expect(
            $(growlClass)[0].textContent.trim()
        ).to.be.equal('Testing')
    })

    it('should change the message type', () => {
        Object.keys(types).forEach(type => {
            growl({
                type
            })

            expect($(growlClass).first()[0].classList.contains(`growl-alert--${type}`))
        })
    })

    it('should change the message type through the shortcut functions', () => {
        Object.keys(types).forEach(type => {
            growl[type]()

            expect($(growlClass).first()[0].classList.contains(`growl-alert--${type}`))
        })
    })

    it('should close the alert', () => {
        let el = growl()
        $(el).find(closeClass)[0].click()

        expect(el.classList.contains(closingClass)).to.be.true

        const event = new CustomEvent('animationend')
        el.dispatchEvent(event)

        expect($(containerId).children().get()).to.have.lengthOf(0)
    })

    it('should call the opened callback', () => {
        let cb = spy()

        growl({
            opened: cb
        })

        expect(cb.calledOnce).to.be.true
    })

    it('should call the closed callback', () => {
        let cb = spy()

        let el = growl({
            closed: cb
        })

        $(el).find(closeClass)[0].click()

        const event = new CustomEvent('animationend')
        el.dispatchEvent(event)

        expect(cb.calledOnce).to.be.true
    })
})
