import React from 'react';
import userEvent from '@testing-library/user-event';
// import App from '../App';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import oneMeal from '../../cypress/mocks/oneMeal'
import Recipes from '../pages/Recipes';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return ({
    ...render(<Router history={history}>{component}</Router>), history,
  });
};

describe('Testa se o fetch é chamado corretamente', () => {

  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(oneMeal),
    });
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('testa o fetch', async () => {
    const { history } = renderWithRouter(<Recipes />)

    // history.push('/foods')
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
  })

});