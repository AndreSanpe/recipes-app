import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import * as request from '../services';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnLoginDisabled, setIsBtnLoginDisabled] = useState(true);
  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  useEffect(() => {
    // função que checa se o email é válido
    const checkEmail = () => {
      const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regexEmail.test(email);
    };

    // função que checa se o email é válido
    const checkPassword = () => {
      const SIX = 6;
      return password.length > SIX;
    };
    // função que habilita o botão se checkP. e checkE. retornarem true
    const validateLogin = () => {
      if (checkEmail() && checkPassword()) {
        setIsBtnLoginDisabled(false);
      } else setIsBtnLoginDisabled(true);
    };
    validateLogin();
  }, [email, password]);

  const requestFoodAPI = () => {
    switch (selectedOption) {
    case 'ingredient':
      return request.fromFoodIngredient(input);
    case 'name':
      return request.fromFoods(input);
    case 'first-letter':
      return input.length === 1
        ? request.fromFoods(input)
        : global.alert('Your search must have only 1 (one) character');
    default:
      return console.log('xablau');
    }
  };

  const requestDrinkAPI = () => {
    switch (selectedOption) {
    case 'ingredient':
      return request.fromDrinkIngredient(input);
    case 'name':
      return request.fromDrinks(input);
    case 'first-letter':
      return input.length === 1
        ? request.fromDrinks(input)
        : global.alert('Your search must have only 1 (one) character');
    default:
      return console.log('xablau');
    }
  };

  const states = {
    email,
    password,
    isBtnLoginDisabled,
    input,
    selectedOption,
  };

  const functions = {
    setEmail,
    setPassword,
    setInput,
    setSelectedOption,
    requestFoodAPI,
    requestDrinkAPI,
  };

  return (
    <context.Provider
      value={ { states, functions } }
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
