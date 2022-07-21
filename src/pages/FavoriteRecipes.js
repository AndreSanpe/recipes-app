import React, { useState } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import favorites from '../mock';

function FavoriteRecipes() {
  const [filtro, setFiltro] = useState('All');

  return (
    <div>
      <Header />

      <button
        type="button"
        data-testid="filter-by-all-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ () => setFiltro('All') }
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-food-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ () => setFiltro('Food') }
      >
        Food
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ () => setFiltro('Drinks') }
      >
        Drinks
      </button>

      <CardFavorite favorites={ favorites } chosenFilter={ filtro } />
    </div>
  );
}

export default FavoriteRecipes;
