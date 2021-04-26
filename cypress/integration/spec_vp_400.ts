describe('E2E Test - Viewport 400px', () => {
  // Render
  it('renders card list title', () => {
    cy.visit('/').get('h2').should('have.text', 'Card List')
  })

  it('renders user total cards', () => {
    cy.visit('/')
      .get('._1d-fMdkgFi9U4dornnqeHj')
      .should('have.text', 'Total cards')
  })
})
