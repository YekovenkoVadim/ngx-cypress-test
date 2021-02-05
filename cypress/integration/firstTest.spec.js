/// <reference types="cypress" />

describe("Our first suite", () => {
  it("first test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //by Tag Name
    cy.get("input");

    //by ID
    cy.get("#inputEmail1");

    //by Class name
    cy.get(".input-full-width");

    //by Class value
    cy.get('[class="input-full-width size-medium shape-rectangle"]');

    //by Attribute name
    cy.get("[placeholder]");

    //by Attribute name and value
    cy.get('[placeholder="Email"]');

    //by Tag name and Attribute with value
    cy.get('input[placeholder="Email"]');

    //by two different Attribute
    cy.get('[placeholder="Email"][type="email"]');

    //by tag name, Attribute with value, ID and Class name
    cy.get('input[placeholder="Email"]#inputEmail1.input-full-width');

    //The most recommended way by Cypress
    cy.get('[data-cy="inputEmail1"]');
  });

  it("second test", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.get('[data-cy="signInButton"]');

    cy.contains('[status="primary"]', "Sign in");

    cy.contains('[status="warning"]', "Sign in");

    cy.get("#inputEmail3")
      .parents("form")
      .find("button")
      .should("contain", "Sign in")
      .parents("form")
      .find("nb-checkbox")
      .click();

    cy.contains("nb-card", "Horizontal form").find('[type="email"]');
  });

  it("then and wrap methods", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    /*      cy.contains("nb-card", "Using the Grid").find('[for="inputEmail1"]').should('contain','Email');
     cy.contains("nb-card", "Using the Grid").find('[for="inputPassword2"]').should("contain", "Password");
     cy.contains("nb-card", "Basic form").find('[for="exampleInputEmail1"]').should("contain", "Email address");
     cy.contains("nb-card", "Basic form").find('[for="exampleInputPassword1"]').should("contain", "Password"); */

    //selenium style
    /* const firstForm = cy.contains("nb-card", "Using the Grid");
const secondForm = cy.contains("nb-card", "Basic form");

firstForm.find('[for="inputEmail1"]').should("contain", "Email");
firstForm.find('[for="inputPassword2"]').should("contain", "Password");
secondForm.find('[for="exampleInputEmail1"]').should("contain", "Email address")
secondForm.find('[for="exampleInputPassword1"]').should("contain", "Password") */

    //cypress  style

    //".then" - is used for switching to jQuery format
    cy.contains("nb-card", "Using the Grid").then((firstForm) => {
      const emailLabelFirst = firstForm.find('[for="inputEmail1"]').text();
      const passwordLabelFirst = firstForm
        .find('[for="inputPassword2"]')
        .text();
      expect(emailLabelFirst).to.equal("Email");
      expect(passwordLabelFirst).to.equal("Password");

      cy.contains("nb-card", "Basic form").then((secondForm) => {
        const passwordLabelSecond = secondForm
          .find('[for="exampleInputPassword1"]')
          .text();
        expect(passwordLabelSecond).to.equal(passwordLabelFirst);

        // ".wrap" - is used to move back to CYpress format
        cy.wrap(firstForm)
          .find('[for="inputEmail1"]')
          .should("contain", "Email");
      });
    });
  });

  it("invoke command", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    //1
    cy.get('[for="exampleInputEmail1"]').should("contain", "Email address");

    //2
    cy.get('[for="exampleInputEmail1"]').then((label) => {
      expect(label.text()).to.equal("Email address");
    });
    //3 - Using Invoke
    cy.get('[for="exampleInputEmail1"]')
      .invoke("text")
      .then((text) => {
        expect(text).to.equal("Email address");
      });

    /* cy.get('[status="danger"]').parent('form').find('.custom-checkbox').click()
      cy.get('[status="danger"]').parent("form").find('[class="custom-checkbox checked"]').click(); */

    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class")
      //#1
      //.should('contain','checked')
      //#2
      .then((classValue) => {
        expect(classValue).to.contain("checked");
      });
    cy.contains("nb-card", "Basic form")
      .find("nb-checkbox")
      .click()
      .find(".custom-checkbox")
      .invoke("attr", "class");
  });
  //#3
  it("assert property", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();
    cy.contains("nb-card", "Common Datepicker")
      .find("input")
      .then((input) => {
        cy.wrap(input).click();
        cy.get("nb-base-calendar").contains("17").click();
        cy.wrap(input)
          .invoke("prop", "value")
          .should("contain", "Nov 17, 2020");
      });
  });

  it("tooltip", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Tooltip").click();

    cy.contains("nb-card", "Colored Tooltips").contains("Default").click();
    cy.get("nb-tooltip").should("contain", "This is a tooltip");
  });

  it("dialog", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Dialog").click();

    cy.contains("nb-card", "Open Dialog")
      .contains("Open Dialog with component")
      .click();

    cy.get("nb-card").should(
      "contain",
      "This is a title passed to the dialog component"
    );
  });

  it("dialog box", () => {
    cy.visit("/");
    cy.contains("Tables & Data").click();
    cy.contains("Smart Table").click();

    //1 - not good:
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", (confirm) => {
      expect(confirm).to.equal("Are you sure you want to delete?");
    });

    //2 - Good one:
    const stub = cy.stub();
    cy.on("window:confirm", stub);
    cy.get("tbody tr")
      .first()
      .find(".nb-trash")
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith(
          "Are you sure you want to delete?"
        );
      });

    //3 - Close the dialog box
    cy.get("tbody tr").first().find(".nb-trash").click();
    cy.on("window:confirm", () => false);
  });

  it("radio button", () => {
    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Form Layouts").click();

    cy.contains("nb-card", "Using the Grid")
      .find('[type="radio"]')
      .then((radioButtons) => {
        cy.wrap(radioButtons).eq(0).check({ force: true }).should("be.checked");

        cy.wrap(radioButtons).eq(1).check({ force: true });

        cy.wrap(radioButtons).first().should("not.be.checked");

        cy.wrap(radioButtons).eq(2).should("be.disabled");
      });
  });
  it("check boxes", () => {
    cy.visit("/");
    cy.contains("Modal & Overlays").click();
    cy.contains("Toastr").click();

    //cy.get('[type = "checkbox"]').check({force:true});
    cy.get('[type = "checkbox"]').eq(0).click({ force: true });
    cy.get('[type = "checkbox"]').eq(1).check({ force: true });
    cy.get('[type = "checkbox"]').eq(2).click({ force: true });
  });

  it("lists and drop-downs", () => {
    cy.visit("/");
    //1
    /* cy.get("nav nb-select").click();
    cy.get(".options-list").contains("Dark").click();
    cy.get("nav nb-select").should('contain','Dark')
    cy.get("nb-layout-header nav")
      .should("have.css","background-color","rgb(34, 43, 69)"); */
    //2
    cy.get("nav nb-select").then( dropdown => {
       cy.wrap(dropdown).click()
       cy.get(".options-list nb-option").each( (listItem, index) => {
          const itemText = listItem.text().trim()

          const colors = {
            "Light": "rgb(255, 255, 255)",
            "Dark": "rgb(34, 43, 69)",
            "Cosmic": "rgb(50, 50, 89)",
            "Corporate": "rgb(255, 255, 255)",
          };

          cy.wrap(listItem).click()
          cy.wrap(dropdown).should('contain', itemText)
          cy.get("nb-layout-header nav")
            .should("have.css", "background-color", colors[itemText])
          if( index < 3){
            cy.wrap(dropdown).click();
          }
       })
    })


  })
})

  it.only("web date pickers", () => {

    function selectDayFromCurrent(day) {
      let date = new Date();
      date.setDate(date.getDate() + day);
      let futureDay = date.getDate();
      console.log(futureDay);
      let futureMonth = date.toLocaleString("default", { month: "short" });
      let dateAssert =
        futureMonth + " " + futureDay + ", " + date.getFullYear();

      cy.get("nb-calendar-navigation")
        .invoke("attr", "ng-reflect-date")
        .then((dateAttribute) => {
          if (!dateAttribute.includes(futureMonth)) {
            cy.get('[data-name="chevron-right"]').click();
            selectDayFromCurrent(day);
          } else {
            cy.get("nb-calendar-day-picker").contains(futureDay).click();
          }
        });
        return dateAssert
    }

    cy.visit("/");
    cy.contains("Forms").click();
    cy.contains("Datepicker").click();

    cy.contains("nb-card", "Common Datepicker").find("input").then( input => {
        cy.wrap(input).click();
        let dateAssert = selectDayFromCurrent(70)
        cy.wrap(input).invoke("prop", "value").should("contain", dateAssert);

      });
  });

