import expect from 'expect.js'
import Header from '../src/components/Header'
import { shallow, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
configure({ adapter: new Adapter() })

describe('Test Header', () => {
    it('component import should work', () => {
        expect(Header).not.to.be.equal(null)
    })

    it('render should work', () => {
        shallow(<Header/>)
    })

    it('header should contain title', () => {
        const html = shallow(<Header/>).html()
        expect(html).to.contain('A small place to discover languages in GitHub')
        expect(html).to.not.contain('A big place to discover languages in GitHub')
    })
})
