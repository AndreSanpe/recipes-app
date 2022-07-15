import React from 'react';
import { render, screen } from '@testing-library/react';
import Login from '../pages/Login';
import userEvent from '@testing-library/user-event';

describe('Testa o componente Login', () => {
    beforeEach( () => {
        render(<Login />);
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
        const btnEnter = screen.getByTestId("login-submit-btn");
        expect(btnEnter).toBeEnabled();
    })
});