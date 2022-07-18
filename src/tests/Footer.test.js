import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import Drinks from '../pages/Drinks';
import Recipes from '../pages/Recipes';
import Profile from '../pages/Profile';
import App from '../App';

const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

// let globalHistory; 

describe('Testa o componente Footer', () => {
    // beforeEach(() => {
        
    //     const { history } = renderWithRouter(<App />)

    // }
    //     )
  it('testa se o icone de drinks é renderizado na página Drinks', () => {
    const { history } = renderWithRouter(<App />)

    history.push('/drinks')
    const drinkIconEl = screen.getByAltText(/drink icon/i);
    expect(drinkIconEl).toBeInTheDocument();
  });

  it('testa se o icone de meal é renderizado na página Drinks', () => {
    const { history } = renderWithRouter(<App />)

    history.push('/drinks')
    const mealIconEl = screen.getByAltText(/meal icon/i);
    expect(mealIconEl).toBeInTheDocument();
  });

  it('testa se o icone de meal é renderizado na página Recipes', () => {
    const { history } = renderWithRouter(<App />)

    history.push('/foods')

    const mealIconEl = screen.getByAltText(/meal icon/i);
    expect(mealIconEl).toBeInTheDocument();
  });

  it('testa se o icone de drinks é renderizado na página Recipes', () => {
    const { history } = renderWithRouter(<App />)

    history.push('/foods')

    const drinkIconEl = screen.getByAltText(/drink icon/i);
    expect(drinkIconEl).toBeInTheDocument();
  });

  it('testa se o icone de drinks é renderizado na página Profile', () => {
    renderWithRouter(<Profile />);

    const drinkIconEl = screen.getByAltText(/drink icon/i);
    expect(drinkIconEl).toBeInTheDocument();
  });

  it('testa se o icone de drinks é renderizado na página Profile', () => {
    renderWithRouter(<Profile />);

    const mealIconEl = screen.getByAltText(/meal icon/i);
    expect(mealIconEl).toBeInTheDocument();
  });


})
