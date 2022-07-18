import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/context';

function SearchBar() {
  const {
    states: { input, selectedOption }, functions: { setInput,
      setSelectedOption, requestFoodAPI, requestDrinkAPI },
  } = useContext(context);

  const location = useLocation();

  const onClickSendButton = (e) => {
    e.preventDefault();

    if (location.pathname === '/foods') {
      requestFoodAPI();
    }
    if (location.pathname === '/drinks') {
      requestDrinkAPI();
    }
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
            checked={ selectedOption === 'first-letter' }
            onChange={ () => setSelectedOption('first-letter') }
          />
          First letter
        </label>
      </div>

    </form>
  );
}

export default SearchBar;
