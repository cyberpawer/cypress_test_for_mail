describe('Temperature test', () => {
    it('Fails if one of the visible daily daytime temperature is NOT negative', () => {
      cy.visit('https://yandex.ru/')
//Workaround to avoid opening in new tab
      cy.get('.weather__header > h1 > .home-link').then(function ($e) {
        const href = $e.prop('href')
        cy.visit(href)
        cy.url()
        .should('contains', 'pogoda')
      })
//Searh input. You can specify 'location' in cypress.json
      cy.get('.mini-suggest-form')
      .type(Cypress.env('location'))
//1st popup suggestion
      cy.xpath('//div[contains(@class,"popup")]/ul/li[1]')
      .click()
      
//Visible daily daytime temperatures
      cy.xpath('//div[contains(@class,"temp_day")]/span[2]')
      .filter(':visible')
      .each(($el, index, $list) => {
        cy.wrap($el).invoke('text')
        .should('contains', '−')
    })
  })
})