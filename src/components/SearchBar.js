import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import context from '../context/context';

function SearchBar() {
  const {
    states: { input, selectedOption }, functions: { setInput,
      setSelectedOption, requestFoodAPI, requestDrinkAPI },
  } = useContext(context);

  const location = useLocation();

  const onClickSendButton = () => {
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
    <form>
      <label
        htmlFor="search-input"
        className="mb-2 text-sm font-medium text-gray-900
        sr-only dark:text-gray-300"
      >
        {' '}
        Email
      </label>
      <section className="flex">
        <div className="relative">
          <div
            className="flex absolute mt-2
        items-center pl-1 pointer-events-none"
          >
            <span
              className="material-symbols-outlined text-2lg
              w-2 h-12 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
            >
              search
            </span>
          </div>
          <input
          // className="drop-shadow-lg rounded-md mb-2 py-1 px-2 my-2 mr-2
          // text-orange-500 outline-orange-500"
            className="py-1 px-2 text-sm text-orange-500 outline-orange-500
          bg-gray-50 rounded-md border border-gray-300
          focus:border-blue-500 text-center"
            placeholder="search"
            required
            id="search-input"
            name="search-input"
            type="search"
            data-testid="search-input"
            value={ input }
            onChange={ ({ target }) => setInput(target.value) }
          />
          <button
            className="bg-orange-500 text-white text-sm
          px-3  py-1 rounded-md hover:bg-orange-600
          active:bg-orange-600 font-semibold ml-2 mt-2"
            type="button"
            data-testid="exec-search-btn"
            onClick={ onClickSendButton }
          >
            Buscar
          </button>
        </div>
      </section>
      <div className="flex justify-between">
        <label htmlFor="ingredient">
          <input
            className="mr-1"
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
            className="mr-1"
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
            className="mr-1"
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
