/// <reference types="cypress" />

describe("Our second suite", () => {

    it('access shadow dom', () => {
        cy.visit('https://radogado.github.io/shadow-dom-demo/')

        cy.get('#app').shadow().find('#container')

    })
})