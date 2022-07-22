import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Drinks from '../pages/Drinks';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(<Router history={history}>{component}</Router>),
    history,
  };
};

describe('Testa a página Favorites Recipes', () => {
    
    it('testa se a página renderiza os botões de filtro All, Food e Drinks', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/favorite-recipes');

        const allButton = screen.getByRole('button', { name: /all/i});
        expect(allButton).toBeInTheDocument();

        const foodButton = screen.getByRole('button', { name: /food/i});
        expect(foodButton).toBeInTheDocument();

        const drinksButton = screen.getByRole('button', { name: /drinks/i});
        expect(drinksButton).toBeInTheDocument();
    })

    it('testa se ao favoritar uma receita é renderizado um card referente na página Favorites Recipes', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/foods');

        // favoritar uma receita
        // testar se o card é renderizado
        // testar se ao clicar na imagém é redirecionado
        // testar se é redirecionado ao clicar no nome da receita 

        // testar as diferenças entre os cards de comida e bebida

        //testar os botões de filtro

    })
});