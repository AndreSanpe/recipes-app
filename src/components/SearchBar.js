import React, { useState } from 'react';
import * as request from '../services';

function SearchBar() {
  const [input, setInput] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const FirstLetter = 'first-letter';

  const requestFoodAPI = () => {
    switch (selectedOption) {
    case 'ingredient':
      return request.fromFoodIngredient(input);
    case 'name':
      return request.fromFoods(input);
    case FirstLetter:
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
    case FirstLetter:
      return input.length === 1
        ? request.fromDrinks(input)
        : global.alert('Your search must have only 1 (one) character');
    default:
      return console.log('xablau');
    }
  };

  const onClickSendButton = (e) => {
    e.preventDefault();
    requestFoodAPI();
    requestDrinkAPI();
    setInput('');
    setSelectedOption('');
  };

  return (
    <form onSubmit={ () => onClickSendButton({ target }) }>
      <label htmlFor="search-input">
        <input
          placeholder="Search Recipe"
          id="search-input"
          name="search-input"
          type="search"
          data-testid="search-input"
          value={ input }
          onChange={ ({ target }) => setInput(target.value) }
        />
      </label>
      <button
        type="submit"
        data-testid="exec-search-btn"
        onClick={ onClickSendButton }
      >
        Buscar
      </button>
      <div>
        <label htmlFor="ingredient">
          <input
            name="option"
            id="ingredient"
            type="radio"
            data-testid="ingredient-search-radio"
            checked={ selectedOption === 'ingredient' }
            onChange={ () => setSelectedOption('ingredient') }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            name="option"
            id="name"
            type="radio"
            data-testid="name-search-radio"
            checked={ selectedOption === 'name' }
            onChange={ () => setSelectedOption('name') }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            name="option"
            id="first-letter"
            type="radio"
            data-testid="first-letter-search-radio"
            checked={ selectedOption === FirstLetter }
            onChange={ () => setSelectedOption(FirstLetter) }
          />
          First letter
        </label>
      </div>

    </form>
  );
}

export default SearchBar;
