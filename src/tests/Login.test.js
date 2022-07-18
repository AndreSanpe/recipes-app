import React from 'react';
import { render, screen } from '@testing-library/react';
// import Login from '../pages/Login';
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

describe('Testa o componente Login', () => {
    beforeEach( () => {
        renderWithRouter(<App />);
    })
    test('verifica se existe o input de email e senha na tela', () => {
        const inputEmail = screen.getByPlaceholderText(/email/i);
        const inputSenha = screen.getByPlaceholderText(/password/i);
        expect(inputEmail).toBeInTheDocument();
        expect(inputSenha).toBeInTheDocument();
    }),

    test('verifica se existe o botão de entrar na tela', () => {
        const btnEnter = screen.getByTestId("login-submit-btn");
        expect(btnEnter).toBeInTheDocument();
    }),

    test('verifica se é possível digitar nos inputs', () => {
        const inputEmail = screen.getByPlaceholderText(/email/i);
        const inputSenha = screen.getByPlaceholderText(/password/i);
        userEvent.type(inputEmail, 'teste@trybe.com');
        userEvent.type(inputSenha, '1234567');
        expect(inputEmail).toHaveValue('teste@trybe.com');
        expect(inputSenha).toHaveValue('1234567');
    }),

    test('verifica se é possível clicar no botão após os campos de email e senha serem preenchidos', () => {
        const inputEmail = screen.getByPlaceholderText(/email/i);
        const inputSenha = screen.getByPlaceholderText(/password/i);
        userEvent.type(inputEmail, 'teste@trybe.com');
        userEvent.type(inputSenha, '1234567');
        const btnEnter = screen.getByTestId("login-submit-btn");
        expect(btnEnter).toBeEnabled();
    }),

    test('verifica se ao clicar no botão "enter" as chaves: user, mealsToken e cocktailsToken são salvos', () => {
        const inputEmail = screen.getByPlaceholderText(/email/i);
        const inputSenha = screen.getByPlaceholderText(/password/i);
        const btnEnter = screen.getByTestId("login-submit-btn");
        userEvent.type(inputEmail, 'teste@trybe.com');
        userEvent.type(inputSenha, '1234567');
        userEvent.click(btnEnter);
        const returnedEmailLocalStorage = localStorage.getItem('user');
        const returnedToken1 = localStorage.getItem('mealsToken');
        const returnedToken2 = localStorage.getItem('cocktailsToken');
        expect(returnedEmailLocalStorage).toBe('{\"email\":\"teste@trybe.com\"}');
        expect(returnedToken1).toBe('1');
        expect(returnedToken2).toBe('1');
    })
});