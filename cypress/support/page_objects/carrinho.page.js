class CarrinhoPage {

    adicionaItensAoCarrinho(nomeProduto, tamanho, cor, quantidade){
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').contains(nomeProduto).click()
        cy.get('.button-variable-item-' + tamanho).click()
        cy.get('.button-variable-item-' + cor).click()
        cy.get('.input-text').clear().type(quantidade)
        cy.get('.single_add_to_cart_button').click();
    }

    adicionaAgasalhoAoCarrinho(nomeProduto) {
        cy.get('#primary-menu > .menu-item-629 > a').click()
        cy.get('[class="product-block grid"]').contains(nomeProduto).click()
        cy.get('.single_add_to_cart_button').click();
    }

}


export default new CarrinhoPage()