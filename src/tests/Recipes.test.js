import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import beefMeals from '../../cypress/mocks/beefMeals';

let globalHistory;

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };
  
  const fetchReturnedValue = beefMeals

  describe('Testa a página de Recipes', () => {
    beforeEach( () => {
        const { history } = renderWithRouter(<App />);
        globalHistory = history;
        globalHistory.push('/foods');

        jest.spyOn(global, 'fetch').mockResolvedValue({ 
            json: async () => fetchReturnedValue,
            })
    })
    it('Verificar se a pagina começa renderizando as imagens',  () => {
        setTimeout( async() => {

            const corbaImg = await screen.findByRole('img', {name: /corba/i});
            expect(corbaImg).toBeInTheDocument();
            const tamiyaImg = await screen.findByRole('img', {name: /Tamiya/i});
            expect(tamiyaImg).toBeInTheDocument();
            const koshariImg = await screen.findByRole('img', {name: /koshari/i});
            expect(koshariImg).toBeInTheDocument();

        },1000)
        
    }),
    it('Verifica se os botões de filtros são renderizados e funcionando',  ()=>{

            setTimeout(async() => {
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
            
            }, 1000);
    })
    it('Verifica se o filtro tiver somente 1 resultado não redireciona para página de detalhes',  ()=>{

           setTimeout(async () => {
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
         
           }, 1000);
    })
    it('Verifica o toggle dos buttons', ()=>{
        
           setTimeout(async() => {
             const buttonGoat = await screen.findByRole('button', {name:/Goat/i});
             expect(buttonGoat).toBeInTheDocument();
             userEvent.click(buttonGoat);
             const imgGoatFilter = await screen.findByRole('img', {  name: /mbuzi choma \(roasted goat\)/i});
             expect(imgGoatFilter).toBeInTheDocument;
             userEvent.click(buttonGoat);
             const corbaImg = await screen.findByRole('img', {name: /corba/i});
             expect(corbaImg).toBeInTheDocument();
         
           }, 1000);
    })
    it('Verifica all button apaga filtro',  ()=>{
        
          setTimeout(async() => {
              const allBtn = await screen.findByRole('button', {name:/all/i});
              expect(allBtn).toBeInTheDocument();
              const buttonBeef = await screen.findByRole('button', {name:/beef/i});
              expect(buttonBeef).toBeInTheDocument();
              userEvent.click(buttonBeef);
              const corbaImg = await screen.findByRole('img', {name: /corba/i});
              expect(corbaImg).toBeInTheDocument();
          
          }, 1000);
    })
    it('Verifica toggle em todos os buttons', ()=>{
        
           setTimeout(async() => {
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
         
           }, 1000);
    })

    it('Verifica toggle em todos os buttons',  ()=>{
       
         setTimeout(async() => {
               const buttonBeef = await screen.findByRole('button', {name:/beef/i});
               expect(buttonBeef).toBeInTheDocument();
               userEvent.click(buttonBeef);
   
               const buttonBreakfast = await screen.findByRole('button', {name:/Breakfast/i});
               expect(buttonBreakfast).toBeInTheDocument();
               userEvent.click(buttonBreakfast);
   
               const potatoesImg = await screen.findByRole('img', {name: /breakfast potatoes/i});
               expect(potatoesImg).toBeInTheDocument();
   
           
         }, 1000);
    })
    it('Verificando se o fetch foi chamado',  ()=>{
        
           setTimeout(async() => {
             const buttonBeef = await screen.findByRole('button', {name:/beef/i});
             expect(buttonBeef).toBeInTheDocument();
             userEvent.click(buttonBeef);
             expect(fetch).toHaveBeenCalled();
             expect(fetch).toHaveBeenCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?c=beef')
         
           }, 1000);
    })
});