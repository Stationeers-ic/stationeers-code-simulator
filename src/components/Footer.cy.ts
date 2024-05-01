import Footer from './Footer.vue'

describe('<Footer />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(Footer)
  })
})