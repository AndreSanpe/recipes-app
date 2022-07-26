import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import context from './context';
import * as request from '../services/fetchSearchBar';
import fetchFoodCategories,
{ fetchDrinkCategories,
  handleDrinksFilter, handleFoodsFilter } from '../services/fetchCategories';

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
  const [recipeDetail, setRecipeDetail] = useState({ recipe: [], type: '' });
  const [recomend, setRecomend] = useState([]);
  const [inProgressRecipes, SetInProgressRecipes] = useState([]);
  const [doneRecipes, SetDoneRecipes] = useState([]);
  const [allFavoriteRecipes, setAllFavoriteRecipes] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [nameButton, setNameButton] = useState('All');
  const history = useHistory();

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
      setMeals(await request.fromFoodIngredient(input));
      if (meals.length === 1) {
        history.push(`/foods/${meals[0].idMeal}`);
      }
      return setMeals(await request.fromFoodIngredient(input));
    case 'name':
      setMeals(await request.fromFoodsName(input));
      if (meals.length === 1) {
        history.push(`/foods/${meals[0].idMeal}`);
      }
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
      setDrinks(await request.fromDrinkIngredient(input));
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
      return;
    case 'name':
      setDrinks(await request.fromDrinksName(input));
      if (drinks.length === 1) {
        console.log('dentro do if');
        history.push(`/drinks/${drinks[0].idDrink}`);
      }
      return setDrinks(await request.fromDrinksName(input));
    case 'first-letter':
      return input.length === 1
        ? setDrinks(await request.fromDrinksFirstLetter(input))
        : global.alert('Your search must have only 1 (one) character');
    default:
      return console.log('xablau');
    }
  };

  const filterBtnFood = async (e) => {
    setNameButton(e.target.textContent);
    setMeals(await handleFoodsFilter(e));
    if (toggle && e.target.textContent === nameButton) {
      setMeals(await request.fromFoodsName(''));
    }
    setToggle(!toggle);
  };

  const allBtnFilter = async () => {
    setNameButton('All');
    setMeals(await request.fromFoodsName(''));
  };

  const filterBtnDrink = async (e) => {
    setNameButton(e.target.name);
    setDrinks(await handleDrinksFilter(e));
    if (toggle && e.target.name === nameButton) {
      setDrinks(await request.fromDrinksName(''));
    }
    setToggle(!toggle);
  };

  const allBtnFilterDrinks = async () => {
    setNameButton('All');
    setDrinks(await request.fromDrinksName(''));
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
    recipeDetail,
    recomend,
    inProgressRecipes,
    doneRecipes,
    allFavoriteRecipes,
    nameButton,
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
    setRecipeDetail,
    setRecomend,
    SetInProgressRecipes,
    SetDoneRecipes,
    setAllFavoriteRecipes,
    filterBtnFood,
    allBtnFilter,
    filterBtnDrink,
    allBtnFilterDrinks,
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
