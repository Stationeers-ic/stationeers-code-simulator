import Header from '../components/Header.vue'

describe('<Header />', () => {
  it('renders', () => {

    // see: https://on.cypress.io/mounting-vue
    cy.mount(Header)
  })
})
