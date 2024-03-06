import {Assertions, Locator} from "../page-objects/search-page-objects"
import { validSearchTerm, starRatings, awardOptions, categoryOptions, sortByOptions, invalidSearchTerm, defaultResultMessage } from "../fixtures/test-fixtures.json"

describe('Testing the "Search Merchant" field functionality.', () => {

  const url = 'https://www.feefo.com/search-reviews/search-results'
  const assertions = new Assertions();
  const locator = new Locator();
  
  beforeEach(() => {
    cy.visit(url);
  });

  it('Verify search result input exists', () => {   
    locator.getInputLocator().should('exist')
  })

  it('Verify result prefix exists', () => {
    locator.getResultPrefix().should('exist')
  })

  it('Should accept text input', () => {
    assertions.assertValidSearchTerm(validSearchTerm)
  })

  it('Should return a message for Invalid queries', () => {
    assertions.assertInvalidSearchQuery(invalidSearchTerm)
  })

  it('Should return query results', () => {
    assertions.assertQueryResults(validSearchTerm)
  })

  it('Should handle empty search queries', () => {
    assertions.assertEmptySearchQuery(defaultResultMessage)
  })

  it('Should allow for clearing the search input', () => {
    assertions.assertClearedSearchInput(validSearchTerm)
  })

})

describe('Testing dropdown menus for categories, star ratings, award levels, and sorting options.', () => {
  const url = 'https://www.feefo.com/search-reviews/search-results'
  const locator = new Locator();
  const assertions = new Assertions();
  
  beforeEach(() => {
    cy.visit(url);
  });

  it('Should verify the star rating dropdown is visble', () => {
    assertions.assertDropdownIsVisible('star-rating')
  })

  it('Should verify the award level dropdown is visble', () => {
    assertions.assertDropdownIsVisible('award-level')
  })

  it('Should verify the sort by dropdown is visble', () => {
    assertions.assertDropdownIsVisible('sort-by')
  })

  it('Should verify the category dropdown is visble', () => {
    assertions.assertDropdownIsVisible('category')
  })

  it('Should have all the category options', () => {
    assertions.assertDropdownOptions('category', categoryOptions)
  })

  it('Should have all the Award level options', () => {
    assertions.assertDropdownOptions('award-level', awardOptions)
  })

  it('Should have all the star rating options', () => {
   assertions.assertDropdownOptionsUsingInvoke('star-rating', starRatings, 'outerHTML')
  })

  it('Should have all the Sort by options', () => {
    assertions.assertDropdownOptionsUsingInvoke('sort-by', sortByOptions, 'outerText')
  })

  // it('Should open the category dropdown', () => {
  //   locator.chooseDropdown('category').click()
  //   locator.getDropdownOptions('category')
  //     .children('li')
  //     .should('have.length.greaterThan', 0)
  // })

  it('Should select the first option in the category dropdown', () => {
    assertions.assertDropdownOptionSelection('category', 0)
  })

  it('Should select the last option in the award-level dropdown', () => {
    assertions.assertDropdownOptionSelection('award-level', awardOptions.length - 1)
  })

  it('Should return results for the selected award level', () =>
  {
    locator.chooseDropdown('award-level').click()
    locator.getResultsComponent().children('article')
    .should('have.length.greaterThan', 0)
  })

  it('Should be able to combine multiple dropdowns', () => {
    assertions.assertMultipleDropdownCombinations('category', 'star-rating')
  })
})