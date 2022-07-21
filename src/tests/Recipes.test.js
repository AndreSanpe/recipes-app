import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

let globalHistory;

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };
  
  describe('Testa a página de Recipes', () => {
    beforeEach( () => {
        const { history } = renderWithRouter(<App />);
        globalHistory = history;
        globalHistory.push('/foods');
    })
    it('Verificar se a pagina começa renderizando as imagens', async () => {
        const corbaImg = await screen.findByRole('img', {name: /corba/i});
        expect(corbaImg).toBeInTheDocument();
        const tamiyaImg = await screen.findByRole('img', {name: /Tamiya/i});
        expect(tamiyaImg).toBeInTheDocument();
        const koshariImg = await screen.findByRole('img', {name: /koshari/i});
        expect(koshariImg).toBeInTheDocument();
    }),
    it('Verifica se os botões de filtros são renderizados e funcionando', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
           
            const buttonAll = await screen.findByRole('button', {name:/all/i});
            expect(buttonAll).toBeInTheDocument();
            const buttonBeef = await screen.findByRole('button', {name:/beef/i});
            expect(buttonBeef).toBeInTheDocument();
            const btnBreakfast = await screen.findByRole('button', {name:/Breakfast/i});
            expect(btnBreakfast).toBeInTheDocument();
            userEvent.click(buttonBeef);
            const imgBeefFilter = await screen.findByRole('img', {  name: /beef and mustard pie/i});
            expect(imgBeefFilter).toBeInTheDocument;
            userEvent.click(buttonBeef);
            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
            userEvent.click(btnBreakfast);
            const imgBreakfastFilter = await screen.findByRole('img', {  name: /breakfast potatoes/i});
            expect(imgBreakfastFilter).toBeInTheDocument();
            userEvent.click(buttonAll);
            const corbaImg2 = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg2).toBeInTheDocument();
            userEvent.click(buttonBeef);
            userEvent.click(buttonBeef);
        })
        
    })
    it('Verifica se o filtro tiver somente 1 resultado não redireciona para página de detalhes', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
            const buttonGoat = await screen.findByRole('button', {name:/Goat/i});
            expect(buttonGoat).toBeInTheDocument();
            userEvent.click(buttonGoat);
            const imgGoatFilter = await screen.findByRole('img', {  name: /mbuzi choma \(roasted goat\)/i});
            expect(imgGoatFilter).toBeInTheDocument;
            const buttonAll = await screen.findByRole('button', {name:/all/i});
            expect(buttonAll).toBeInTheDocument();
            userEvent.click(buttonAll);
            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
            userEvent.click(corbaImg);
            expect(globalHistory.location.pathname).toBe('/foods/52977');
        })
    })
    it('Verifica o toggle dos buttons', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
            const buttonGoat = await screen.findByRole('button', {name:/Goat/i});
            expect(buttonGoat).toBeInTheDocument();
            userEvent.click(buttonGoat);
            const imgGoatFilter = await screen.findByRole('img', {  name: /mbuzi choma \(roasted goat\)/i});
            expect(imgGoatFilter).toBeInTheDocument;
            userEvent.click(buttonGoat);
            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
        })
    })
    it('Verifica all button apaga filtro', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
            const allBtn = await screen.findByRole('button', {name:/all/i});
            expect(allBtn).toBeInTheDocument();
            const buttonBeef = await screen.findByRole('button', {name:/beef/i});
            expect(buttonBeef).toBeInTheDocument();
            userEvent.click(buttonBeef);
            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
        })
    })
    it('Verifica toggle em todos os buttons', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
            const buttonBeef = await screen.findByRole('button', {name:/beef/i});
            expect(buttonBeef).toBeInTheDocument();
            userEvent.click(buttonBeef);
            userEvent.click(buttonBeef);
            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
           
            const buttonBreakfast = await screen.findByRole('button', {name:/Breakfast/i});
            expect(buttonBreakfast).toBeInTheDocument();
            userEvent.click(buttonBreakfast);
            userEvent.click(buttonBreakfast);
            expect(corbaImg).toBeInTheDocument();

            const buttonChicken = await screen.findByRole('button', {name:/Chicken/i});
            expect(buttonChicken).toBeInTheDocument();
            userEvent.click(buttonChicken);
            userEvent.click(buttonChicken);
            expect(corbaImg).toBeInTheDocument();

            const buttonDessert = await screen.findByRole('button', {name:/Dessert/i});
            expect(buttonDessert).toBeInTheDocument();
            userEvent.click(buttonDessert);
            userEvent.click(buttonDessert);
            expect(corbaImg).toBeInTheDocument();

            const buttonGoat = await screen.findByRole('button', {name:/Goat/i});
            expect(buttonGoat).toBeInTheDocument();
            userEvent.click(buttonGoat);
            userEvent.click(buttonGoat);
            expect(corbaImg).toBeInTheDocument();
        })
    })
    it('Verifica toggle em todos os buttons', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(()=>{
            expect(carregando).not.toBeInTheDocument();

        })
    })
    it('Verifica toggle em todos os buttons', async ()=>{
        const carregando = screen.getByText(/carregando.../i);
        expect(carregando).toBeInTheDocument();
        waitForElementToBeRemoved(carregando).then(async()=>{
            const buttonBeef = await screen.findByRole('button', {name:/beef/i});
            expect(buttonBeef).toBeInTheDocument();
            userEvent.click(buttonBeef);

            const buttonBreakfast = await screen.findByRole('button', {name:/Breakfast/i});
            expect(buttonBreakfast).toBeInTheDocument();
            userEvent.click(buttonBreakfast);

            const potatoesImg = await screen.findByRole('img', {name: /breakfast potatoes/i});
            expect(potatoesImg).toBeInTheDocument();

        })
    })
});