describe('E2E Test - Viewport 400px', () => {
  it('renders card list title', () => {
    cy.visit('/').get('h2').should('have.text', 'Card List')
  })

  it('renders user total cards', () => {
    cy.visit('/')
      .get('._1d-fMdkgFi9U4dornnqeHj')
      .should('have.text', 'Total cards')
  })

  it('renders filter cards', () => {
    cy.visit('/')
      .get('._2fIT-ka6vgAx61N2QerM_g > button')
      .should('have.text', 'Filter')
  })

  it('renders edit option', () => {
    cy.visit('/')
      .get(
        ':nth-child(1) > .m2hCQLTXcTBe8Nc7LqVkX > .h-YyT0M0YH83lbYSoXGHT > :nth-child(1)'
      )
      .should('have.text', 'Edit')
  })

  it('renders delete option', () => {
    cy.visit('/')
      .get(
        ':nth-child(1) > .m2hCQLTXcTBe8Nc7LqVkX > .h-YyT0M0YH83lbYSoXGHT > :nth-child(2)'
      )
      .should('have.text', 'Delete')
  })

  it('click edit option', () => {
    cy.visit('/')
      .get(
        ':nth-child(1) > .m2hCQLTXcTBe8Nc7LqVkX > .h-YyT0M0YH83lbYSoXGHT > :nth-child(1)'
      )
      .click()
      .get('.primary')
      .should('have.text', 'Edit Card')
      .get('.link')
      .should('have.text', 'Back')
  })

  it('click edit option and edit card', () => {
    cy.visit('/')
      .get(
        ':nth-child(1) > .m2hCQLTXcTBe8Nc7LqVkX > .h-YyT0M0YH83lbYSoXGHT > :nth-child(1)'
      )
      .click()
      .get('.primary')
      .click()
      .get('h3')
      .should('have.text', 'Card edited!')
  })

  it('click delete card', () => {
    cy.visit('/')
      .get(
        ':nth-child(1) > .m2hCQLTXcTBe8Nc7LqVkX > .h-YyT0M0YH83lbYSoXGHT > :nth-child(2)'
      )
      .click()
      .get('h3')
      .should('have.text', 'Card deleted!')
  })
})
