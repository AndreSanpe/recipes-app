import React from 'react';
import { render, screen } from '@testing-library/react';
// import Header from '../components/Header';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import App from '../App'

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
    it('Testa rota /foods', async () => {
        const { history } = renderWithRouter(<App />);

        history.push('/foods')

        console.log(history.location)

        expect(history.location.pathname).toBe('/foods')
        const profileImage = screen.getByTestId("profile-top-btn")
        expect(profileImage).toBeInTheDocument()
        expect(profileImage).toHaveAttribute('src', profileIcon)
        const searchImage = await screen.findByRole('button', {name: /search icon/i})
        console.log(searchImage)
        expect(searchImage).toBeInTheDocument()
        expect(searchImage).toHaveAttribute('src', searchIcon)
        userEvent.click(searchImage)

        const searchInput = await screen.findByRole('searchbox')
        expect(searchInput).toBeInTheDocument()
    })
    it('Testa rota drinks', () => {
      const { history } = renderWithRouter(<App />);

        history.push('/drinks')


        expect(history.location.pathname).toBe('/drinks')
    })
    it('Testa rota profile', () => {
      const { history } = renderWithRouter(<App />);

        history.push('/profile')

        expect(history.location.pathname).toBe('/profile')
    })
    it('Testa rota done-recipes', () => {
      const { history } = renderWithRouter(<App />);

        history.push('/done-recipes')
        
        expect(history.location.pathname).toBe('/done-recipes')
    })
    it('Testa rota /favorite-recipes', () => {
      const { history } = renderWithRouter(<App />);

        history.push('/favorite-recipes')

        expect(history.location.pathname).toBe('/favorite-recipes')
    })
    it('Testa se redireciona para profile', async () => {
      const { history } = renderWithRouter(<App />);

      history.push('/foods')
      const profileImage = await screen.findByTestId("profile-top-btn")
      console.log(history.location)
      userEvent.click(profileImage)

      expect(history.location.pathname).toBe('/profile')
    })
});