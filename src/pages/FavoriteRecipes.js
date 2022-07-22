import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';

const FILTRO_INICIAL = 'all';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [theFilter, setTheFilter] = useState('FILTRO_INICIAL');

  useEffect(() => {
    function getFavorites() {
      const itensFromLocalStorage = JSON.parse(
        localStorage.getItem('favoriteRecipes'),
      );
      setFavorites(itensFromLocalStorage);
      setTheFilter('all');
    }
    getFavorites();
  }, []);

  return (
    <div>
      <Header />

      <button
        type="button"
        value="all"
        data-testid="filter-by-all-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ (e) => {
          setTheFilter(e.target.value);
        } }
      >
        All
      </button>

      <button
        type="button"
        value="food"
        data-testid="filter-by-food-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ (e) => {
          setTheFilter(e.target.value);
        } }
      >
        Food
      </button>

      <button
        type="button"
        value="drink"
        data-testid="filter-by-drink-btn"
        style={ { width: '100px', margin: '10px' } }
        onClick={ (e) => {
          setTheFilter(e.target.value);
        } }
      >
        Drinks
      </button>

      <CardFavorite favorites={ favorites } chosenFilter={ theFilter } />
    </div>
  );
}

export default FavoriteRecipes;
