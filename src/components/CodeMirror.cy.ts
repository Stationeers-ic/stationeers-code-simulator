import CodeMirror from './CodeMirror.vue'

describe('<CodeMirror />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(CodeMirror)
  })
})