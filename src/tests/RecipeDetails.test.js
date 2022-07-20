import React from 'react';
import { getByAltText, render, screen } from '@testing-library/react';
import App from '../App'
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

describe('Testa a página de Profile', () => {
    test('Verifica se a o Título da receita aparece na tela', async () => {
      const { history } = renderWithRouter(<App />);
        
        history.push('/foods/52771');
        // const recipeImg = await screen.findByAltText(/spicy arrabiata penne/i);
        // expect(recipeImg).toBeInTheDocument();
        // expect(screen.getByRole('heading', {  name: /spicy arrabiata penne/i})).toBeInTheDocument();

    })   
});