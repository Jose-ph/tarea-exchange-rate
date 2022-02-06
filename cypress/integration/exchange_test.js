
describe('Test exchange rate',()=>{

    it('visits the page', ()=>{

        cy.visit('http://192.168.1.38:8080')

    })


    it('test elements inner text',()=>{

        cy.get('.navbar-brand').should('have.text','Exchange Rate')
        cy.get('#title').should('have.text','Elige una fecha y una base para ver los tipos de cambios disponibles')
        cy.get('label[for="date"]').should('have.text','Ingresa una fecha')
        cy.get('#date-info').should('have.text','No compartiremos tu información con nadie')
        cy.get('label[for="base"]').should('have.text','Ingresa la moneda Base ')
        cy.get('#btn-consult').should('have.text','Consultar')


    })

    it('test if options are availabe',()=>{

        let options = document.querySelectorAll('option')
       
        expect((cy.get('option'))).to.exist       

    })

    it('tests if rates container is hidden',()=>{

      cy.get('#rates-container').should('have.class','d-none')

    })

    it('Sends the form without setting a date',()=>{

        cy.get('#btn-consult').click()
        
        //testear la clase y el mensaje de abajo que dice fecha errónea
        //poner una fecha inválida
        //poner una fecha valida y testear el rates container

    })


    


})

