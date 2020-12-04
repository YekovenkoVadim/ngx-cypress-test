/// <reference types="cypress" />
import { navigateTo } from "../support/page_objects/navigationPage"
import { onFormLayoutsPage } from "../support/page_objects/formLayoutsPage";
import { onDatepickerPage } from "../support/page_objects/datepickerPage";
import { onSmartTablePage } from "../support/page_objects/smartTablePage";

const runOn = (browser, fn) => {
  if (Cypress.isBrowser(browser)) {
    fn()
  }
}

const ignoreOn = (browser, fn) => {
  if (!Cypress.isBrowser(browser)) {
    fn()
  }
}

describe("Test with Page Objects", () => {

    beforeEach("open application", () => {
      cy.openHomePage()
    });


    ignoreOn('firefox', () => {
      
      it.only("verify navigation across the pages", () => {
        navigateTo.formLayoutsPage();
        navigateTo.datePickerPage();
        navigateTo.smartTablePage();
        navigateTo.tooltipPage();
        navigateTo.toasterPage();
      });
    })

/*     it('should submit Inline and Basic form and select tomorrow date in the calendar', () => {
      navigateTo.formLayoutsPage();
      onFormLayoutsPage.submitInlineFormWithNameAndEmail("Vadim Yekovenko", "test@test.com");
      onFormLayoutsPage.submitBasicFormWithNameAndEmail("test@test.com", "password");
      navigateTo.datePickerPage()
      onDatepickerPage.selectCommonDatepickerDateFromToday(1);
      onDatepickerPage.selectDatepickerWithRangeFromToday(7, 14);
      navigateTo.smartTablePage()
      onSmartTablePage.addNewRecordWithFirstAndLastName('Vadym', 'Yekovenko')
      onSmartTablePage.updateAgeByFirstName("Vadym", '35');
      onSmartTablePage.deleteRowByIndex(1)
    }) */

});