import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import Recipes from '../pages/Recipes';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa o componente SearchBar', () => {
  it('Verifica se a barra de pesquisa e os 3 filtros existem e estão funcionando', async () => {
      const { history } = renderWithRouter(<App />)

      console.log(history.location)

      history.push('/foods')
      expect(history.location.pathname).toBe('/foods');

      const searchImage = await screen.findByRole('button', {name: /search icon/i})
      userEvent.click(searchImage)

      const FOOD_SEARCH = 'chicken';

      const input = await screen.findByRole('searchbox');
      // expect(input).toBeInTheDocument();
      const searchButton = screen.getByRole('button', {
        name: /buscar/i
      });
      expect(searchButton).toBeInTheDocument();
      const optionIngredient = screen.getByRole('radio', {
        name: /ingredient/i
      });
      expect(optionIngredient).toBeInTheDocument();
      const optionName = screen.getByRole('radio', {
        name: /name/i
      });
      expect(optionName).toBeInTheDocument();
      const optionFirstLetter = screen.getByRole('radio', {
        name: /first letter/i
      });
      expect(optionFirstLetter).toBeInTheDocument();

      userEvent.type(input, FOOD_SEARCH);
      expect(input).toHaveValue(FOOD_SEARCH);
      userEvent.click(optionIngredient);
      expect(optionIngredient).toBeChecked();
      userEvent.click(optionName);
      expect(optionName).toBeChecked();
      userEvent.click(optionFirstLetter);
      expect(optionFirstLetter).toBeChecked();
      userEvent.click(searchButton);
      expect(input).toHaveValue('');
      expect(optionIngredient).not.toBeChecked();
      expect(optionName).not.toBeChecked();
      expect(optionFirstLetter).not.toBeChecked();
    });
    it('Testa /drinks', async () => {
      const { history } = renderWithRouter(<App />)

      const DRINK_SEARCH = 'vodka'

      console.log(history.location.pathname)

      history.push('/drinks')
      expect(history.location.pathname).toBe('/drinks');

      const searchImage = await screen.findByRole('button', {name: /search icon/i})
      userEvent.click(searchImage)

      const input = await screen.findByRole('searchbox');
      // expect(input).toBeInTheDocument();
      const searchButton = screen.getByRole('button', {
        name: /buscar/i
      });
      expect(searchButton).toBeInTheDocument();
      const optionIngredient = screen.getByRole('radio', {
        name: /ingredient/i
      });
      expect(optionIngredient).toBeInTheDocument();
      const optionName = screen.getByRole('radio', {
        name: /name/i
      });
      expect(optionName).toBeInTheDocument();
      const optionFirstLetter = screen.getByRole('radio', {
        name: /first letter/i
      });
      expect(optionFirstLetter).toBeInTheDocument();

      userEvent.type(input, DRINK_SEARCH);
      expect(input).toHaveValue(DRINK_SEARCH);
      userEvent.click(optionIngredient);
      expect(optionIngredient).toBeChecked();
      userEvent.click(optionName);
      expect(optionName).toBeChecked();
      userEvent.click(optionFirstLetter);
      expect(optionFirstLetter).toBeChecked();
      userEvent.click(searchButton);
      expect(input).toHaveValue('');
      expect(optionIngredient).not.toBeChecked();
      expect(optionName).not.toBeChecked();
      expect(optionFirstLetter).not.toBeChecked();
    })
});