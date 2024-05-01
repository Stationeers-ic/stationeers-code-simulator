import NotFound from './NotFound.vue'

describe('<NotFound />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(NotFound)
  })
})