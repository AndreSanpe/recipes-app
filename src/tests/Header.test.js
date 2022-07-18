import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import Login from '../pages/Login';


const renderWithRouter = (component) => {
    const history = createMemoryHistory();
    return ({
      ...render(<Router history={history}>{component}</Router>), history,
    });
  };

describe('Testa o componente Header', () => {
    // beforeEach( () => {
    //     const { history } = renderWithRouter(<Header />);
    // })
    it('Testa', () => {
        const { history } = renderWithRouter(<Header />);

        history.push('/foods')
        expect(history.pathname).toBe('/foods')
        // onst foodsTitle = screen.getByRole('heading', { level: 2 })
        // expect(foodsTitle).toHaveValue('Foods')
    })
});