import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';
import * as request from '../services';
import fetchFoodCategories, { fetchDrinkCategories } from '../services/fetchCategories';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnLoginDisabled, setIsBtnLoginDisabled] = useState(true);
  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [meals, setMeals] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);

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

  const requestFoodAPI = async () => {
    setFoodCategories(await fetchFoodCategories());
    switch (selectedOption) {
    case 'ingredient':
      return setMeals(await request.fromFoodIngredient(input));
    case 'name':
      return setMeals(await request.fromFoodsName(input));
    case 'first-letter':
      return input.length === 1
        ? setMeals(await request.fromFoodsFirstLetter(input))
        : global.alert('Your search must have only 1 (one) character');
    default:
      return console.log('xablau');
    }
  };

  const requestDrinkAPI = async () => {
    setDrinkCategories(await fetchDrinkCategories());
    switch (selectedOption) {
    case 'ingredient':
      return setDrinks(await request.fromDrinkIngredient(input));
    case 'name':
      return setDrinks(await request.fromDrinksName(input));
    case 'first-letter':
      return input.length === 1
        ? setDrinks(await request.fromDrinksFirstLetter(input))
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
    meals,
    drinks,
    drinkCategories,
    foodCategories,
  };

  const functions = {
    setEmail,
    setPassword,
    setInput,
    setSelectedOption,
    requestFoodAPI,
    requestDrinkAPI,
    setMeals,
    setDrinks,
    setFoodCategories,
    setDrinkCategories,
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
