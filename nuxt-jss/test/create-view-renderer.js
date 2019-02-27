import { Nuxt, Builder } from 'nuxt'
import config from './fixture/nuxt.config'
import { default as createViewRenderer } from '../create-view-renderer'

jest.setTimeout(10000)

const nuxt = new Nuxt(config)
const viewRenderer = createViewRenderer(nuxt)

describe('createViewRenderer', () => {
  beforeAll(async () => {
    await new Builder(nuxt).build()
  })

  it('creates a view renderer', () => {
    expect(viewRenderer).toBeInstanceOf(Function)
  })

  it('renders the page', (done) => {
    viewRenderer((err, { html } = {}) => {
      expect(err).toBe(null)
      expect(typeof html).toEqual('string')
      done()
    }, '/')
  })
})
