import React from 'react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import oneMeal from '../../cypress/mocks/oneMeal'
import Recipes from '../pages/Recipes';
import App from '../App';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa se o fetch é chamado corretamente', () => {

  it('testa o fetch', async () => {
    const fetchReturnedValue = oneMeal;
    const { history } = renderWithRouter(<App />)
    jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: async () => fetchReturnedValue,
      })

    const FOOD_SEARCH = 'chicken';

    history.push('/foods')
    expect(history.location.pathname).toBe('/foods');
    const searchImage = await screen.findByRole('button', {name: /search icon/i});
    userEvent.click(searchImage);
    const input = await screen.findByRole('searchbox');
      expect(input).toBeInTheDocument();
      const searchButton = await screen.findByRole('button', {
        name: /buscar/i
      });
      expect(searchButton).toBeInTheDocument();
      const optionIngredient = await screen.findByRole('radio', {
        name: /ingredient/i
      });
      expect(optionIngredient).toBeInTheDocument();
      const optionName = await screen.findByRole('radio', {
        name: /name/i
      });
      expect(optionName).toBeInTheDocument();
      const optionFirstLetter = await screen.findByRole('radio', {
        name: /first letter/i
      });
      expect(optionFirstLetter).toBeInTheDocument();

      userEvent.type(input, FOOD_SEARCH);
      // expect(input).toHaveValue(FOOD_SEARCH);
      userEvent.click(optionIngredient);
      // expect(optionIngredient).toBeChecked();
      // userEvent.click(optionName);
      // expect(optionName).toBeChecked();
      // userEvent.click(optionFirstLetter);
      // expect(optionFirstLetter).toBeChecked();
      userEvent.click(searchButton);
      // expect(input).toHaveValue('');
      // expect(optionIngredient).not.toBeChecked();
      // expect(optionName).not.toBeChecked();
      // expect(optionFirstLetter).not.toBeChecked();
      expect(fetch).toHaveBeenCalled()
      expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  })
  it.only('testa o fetch', async () => {
    const { history } = renderWithRouter(<App />)
    jest.spyOn(global, 'fetch').mockResolvedValue({ 
      json: async () => fetchReturnedValue,
      })

    const FOOD_SEARCH = 'Spicy Arrabiata Penne';

    history.push('/foods')
    expect(history.location.pathname).toBe('/foods');
    const searchImage = await screen.findByRole('button', {name: /search icon/i});
    userEvent.click(searchImage);
    const input = await screen.findByRole('searchbox');
      const searchButton = await screen.findByRole('button', {
        name: /buscar/i
      });
      const optionIngredient = await screen.findByRole('radio', {
        name: /ingredient/i
      });
      const optionName = await screen.findByRole('radio', {
        name: /name/i
      });
      const optionFirstLetter = await screen.findByRole('radio', {
        name: /first letter/i
      });

      userEvent.type(input, FOOD_SEARCH);
      // userEvent.click(optionIngredient);
      userEvent.click(optionName);
      // userEvent.click(optionFirstLetter);
      userEvent.click(searchButton);
      expect(fetch).toHaveBeenCalled()
      expect(fetch).toHaveBeenCalledWith(`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  })
});