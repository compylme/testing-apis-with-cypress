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

    assertValidSearchTerm(validSearchTerm){
        cy.get('input[data-aqa-id]').type(validSearchTerm)
        .should('have.value', validSearchTerm)
    }

    assertEmptySearchQuery(){
        cy.get('input[data-aqa-id]').type('{enter}')
        .should('have.value', '')
    }
}

export default Locator;