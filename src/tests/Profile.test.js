import React from 'react';
import { render, screen } from '@testing-library/react';
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
    test('Verifica se o email digitado na tela de login é salvo no local storage e é mostrado na tela de perfil', () => {
        const { history } = renderWithRouter(<App />);
        
        const inputEmail = screen.getByPlaceholderText(/email/i);
        const inputSenha = screen.getByPlaceholderText(/password/i);
        const btnEnter = screen.getByTestId("login-submit-btn");
        userEvent.type(inputEmail, 'teste@trybe.com');
        userEvent.type(inputSenha, '1234567');
        userEvent.click(btnEnter);
        history.push('/profile')
        const user = JSON.parse(localStorage.getItem('user'));
        const email = user.email;
        const emailTela = screen.getByText(email);
        expect(emailTela).toBeInTheDocument();
    }),

    test('verifica se existe o botão de "Done Recipes" na tela', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/profile');
        const btnDoneRecipes = screen.getByTestId("profile-done-btn");
        expect(btnDoneRecipes).toBeInTheDocument();
    }),

    test('verifica se existe o botão de "Favorite Recipes" na tela', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/profile');
        const btnFavRecipes = screen.getByTestId("profile-favorite-btn");
        expect(btnFavRecipes).toBeInTheDocument();
    }),

    test('verifica se existe o botão de "Logout" na tela', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/profile');
        const btnLogout = screen.getByTestId("profile-logout-btn");
        expect(btnLogout).toBeInTheDocument();
    }),

    test('verifica se ao clicar no botão Logout o local storage é limpo e o usuário é redirecionado à pg de Login', () => {
        const { history } = renderWithRouter(<App />);

        history.push('/profile');        
        const btnLogout = screen.getByTestId("profile-logout-btn");
        userEvent.click(btnLogout);
        const returnedEmailLocalStorage = localStorage.getItem('user');
        expect(returnedEmailLocalStorage).toBe(null);
        const logInPage = screen.getByPlaceholderText(/email/i);
        expect(logInPage).toBeInTheDocument();
    })
});