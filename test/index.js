import {expect} from 'chai'
import growl from './../src/index'

const textClass = 'alert-message__text'
const closeClass = 'alert-message__close'
const growlClass = '.alert-message'
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
        console.log($(containerId))
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

    it('should show the given text or the default one', () => {
        growl({
            text: 'Testing'
        })
        console.log($(growlClass).get())
        expect(
            $(growlClass)[0].textContent
        ).to.be.equal('Testing')
    })

})
