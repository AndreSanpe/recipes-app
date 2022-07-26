import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import CardFavorite from '../components/CardFavorite';
import Footer from '../components/Footer';

function FavoriteRecipes() {
  const btnClassUnselected = 'p-2 mr-1 rounded-md text-xs shadow-md w-24';
  const btnClassSelected = `p-2 mr-1 rounded-md text-xs 
  shadow-md bg-orange-500 text-white w-24`;
  const [favorites, setFavorites] = useState([]);
  const [theFilter, setTheFilter] = useState('');

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
    <div className="">
      <Header />

      <div className="flex justify-evenly">
        <button
          type="button"
          value="all"
          className={ `${
            theFilter === 'all' ? btnClassSelected : btnClassUnselected
          }` }
          data-testid="filter-by-all-btn"
          // style={ { width: '100px', margin: '10px' } }
          onClick={ (e) => {
            setTheFilter(e.target.value);
          } }
        >
          All
        </button>

        <button
          type="button"
          value="food"
          className={ `${
            theFilter === 'food' ? btnClassSelected : btnClassUnselected
          }` }
          data-testid="filter-by-food-btn"
          // style={ { width: '100px', margin: '10px' } }
          onClick={ (e) => {
            setTheFilter(e.target.value);
          } }
        >
          Food
        </button>

        <button
          type="button"
          value="drink"
          className={ `${
            theFilter === 'drink' ? btnClassSelected : btnClassUnselected
          }` }
          data-testid="filter-by-drink-btn"
          // style={ { width: '100px', margin: '10px' } }
          onClick={ (e) => {
            setTheFilter(e.target.value);
          } }
        >
          Drinks
        </button>
      </div>

      <CardFavorite favorites={ favorites } chosenFilter={ theFilter } />
      <Footer />
    </div>
  );
}

export default FavoriteRecipes;
