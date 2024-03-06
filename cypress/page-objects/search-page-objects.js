class Locator{
    getDropdownOptions(dropdown){
        return cy.get('ul[data-aqa-id="' +  dropdown +'-dropdown-menu"]')
    }
    
    chooseDropdownOption(dropdown, index){
        this.getDropdownOptions(dropdown)
        .children('li')
        .eq(index)
        .click()
    }
    
    getInputLocator(){
        return cy.get('input[data-aqa-id]')
    }
    
    chooseDropdown(dropdown){
        return cy.get('button[data-aqa-id="' + dropdown + '-dropdown-options"]')
    }
    
    getResultPrefix(){
        return cy.get('span[data-aqa-id="resource-filter-search-results-text"]')
    }
    
    getResultsComponent(){
        return cy.get(".sc-737e3ad0-0")
    }
    
    getResultModal(){
        return cy.get(".sc-737e3ad0-1")
    }

    resultMessage(){
        return "Showing results for your search of"
    }

    defaultResultMessage(){
        return "Showing companies with All Categories and All Merchants of All Ratings"
    }

    noResultMessage(){
        return "no results for your search of"
    }

    noResultModalText(){
        return "No Results"
    }
}

class Assertions {

    constructor(){
        this.locator = new Locator()
    }
    
    assertValidSearchTerm(validSearchTerm){
        cy.get('input[data-aqa-id]').type(validSearchTerm)
        .should('have.value', validSearchTerm)
    }

    assertInvalidSearchQuery(invalidQuery){
        cy.get('input[data-aqa-id]').type(invalidQuery)
        .should('have.value', invalidQuery)
    }

    assertQueryResults(validSearchTerm){
        this.locator.getInputLocator().type(validSearchTerm)
        this.locator.getResultPrefix().should('contain', this.locator.resultMessage())
        this.locator.getResultsComponent()
        .should('exist')
        .children('article')
        .should('have.length.greaterThan', 0)
    }

    assertEmptySearchQuery(defaultResultMessage){
        this.locator.getInputLocator().type('{enter}')
        this.locator.getResultPrefix().should('contain', defaultResultMessage)
        this.locator.getResultsComponent()
        .children('article')
        .should('have.length.greaterThan', 0)
    }

    assertClearedSearchInput(validSearchTerm){
        this.locator.getInputLocator().type(validSearchTerm)
        this.locator.getInputLocator().clear()
        this.locator.getInputLocator().should('have.value', '')
    }

    assertDropdownIsVisible(dropdown){
        this.locator.chooseDropdown(dropdown).should('be.visible')
    }

    assertDropdownOptions(dropdown, options){
        this.locator.chooseDropdown(dropdown).click()
        this.locator.getDropdownOptions(dropdown).children('li')
        .each((option, index) => {
            expect(option.text()).to.equal(options[index])
            cy.wrap(option).should('have.text', options[index])
        })
    }

    assertDropdownOptionsUsingInvoke(dropdown, options, property){
        this.locator.chooseDropdown(dropdown).click()
        this.locator.getDropdownOptions(dropdown).children('li')
        .each((option, index) => {
            const expectedtext = options[index]
            cy.wrap(option).invoke('prop', property).should('contain', expectedtext)
        })
    }

    assertDropdownOptionSelection(dropdown, index){
        this.locator.chooseDropdown(dropdown).click()
        .then (() => this.locator.chooseDropdownOption(dropdown, index))
        .then((selected) => {
            const selectedOption = selected.text()
            this.locator.getResultPrefix().should('contain', selectedOption)
        })
    }

    assertMultipleDropdownCombinations(dropdown1, dropdown2){
       let categoryValue, starRatingValue

        this.locator.chooseDropdown(dropdown1).click()
        .then (() => this.locator.chooseDropdownOption(dropdown1, 0))
        .then((selected) => {
            categoryValue = selected.text()
        })
        .then (() => this.locator.chooseDropdown(dropdown2).click())
        .then (() => this.locator.chooseDropdownOption(dropdown2, 1))
        .then((selected) => {
            starRatingValue = selected.text()
        })
        .then(() => {
            this.locator.getResultPrefix().should('contain', categoryValue)
            this.locator.getResultPrefix().should('contain', starRatingValue)
        })
    }



}

export  {Locator, Assertions}