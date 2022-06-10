/// <reference types="cypress" />
import CarrinhoPage from '../support/page_objects/carrinho.page'
import CheckoutPage from '../support/page_objects/checkout.page'

const faker = require('faker-br');
const dadosDeEndereco = require('../fixtures/endereco.json')

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    describe('Funcionalidade de carrinho', () => {
        beforeEach(() => {
            cy.visit('/')
            cy.get('.icon-user-unfollow').click();
            cy.fixture('perfil').then(dados => {
                cy.login(dados.usuario, dados.senha)
            })

        });

        it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

            const nome = faker.name.firstName()
            const sobrenome = faker.name.lastName()
            const empresa = faker.company.companyName()
            const pais = dadosDeEndereco.pais
            const endereco = dadosDeEndereco.endereco
            const numero = dadosDeEndereco.numero
            const cidade = dadosDeEndereco.cidade
            const estado = dadosDeEndereco.estado
            const cep = dadosDeEndereco.cep
            const telefone = faker.phone.phoneNumber()
            const email = faker.internet.email()


            CarrinhoPage.adicionaItensAoCarrinho('Abominable Hoodie', 'L', 'Green', 1);
            CarrinhoPage.adicionaItensAoCarrinho('Aether Gym Pant', '34', 'Brown', 1);
            CarrinhoPage.adicionaItensAoCarrinho('Aero Daily Fitness Tee', 'XL', 'Brown', 1);
            CarrinhoPage.adicionaAgasalhoAoCarrinho('Agasalho jhony quest');

            CheckoutPage.abreTelaDeCheckout();
            CheckoutPage.preencheTelaDeCheckout(nome, sobrenome, empresa, pais, endereco, numero, cidade, estado, cep, telefone, email);


            cy.get('.woocommerce-notice').should('contain', 'Obrigado. Seu pedido foi recebido.')
        });
    });
})