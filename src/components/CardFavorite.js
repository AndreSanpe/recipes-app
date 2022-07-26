import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardFavorite({ favorites, chosenFilter }) {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);

  useEffect(() => {
    function getListFiltered() {
      if (chosenFilter !== 'all') {
        const result = favorites.filter(
          (recipe) => recipe.type === chosenFilter,
        );
        setFavoriteList(result);
        console.log(favoriteList);
      } else {
        setFavoriteList(favorites);
        console.log(favoriteList);
      }
    }
    getListFiltered();
    console.log(favoriteList);
  }, [chosenFilter]);

  function handleShare(id, type) {
    const TRES_SEGUNDOS = 3000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), TRES_SEGUNDOS);
  }

  function handleUnfavorite(id) {
    const newList = favoriteList.filter((recipe) => recipe.id !== id);
    setFavoriteList(newList);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newList));
  }

  return (
    <div className="flex-col">
      {favoriteList
        && favoriteList.map((item, index) => (
          <div
            key={ item.id }
            className="flex m-2 p-2 rounded-lg w-90 h-90
            border-2 border-inherit drop-shadow-2xl"
          >
            <div className="w-1/2">
              <Link to={ `/${item.type}s/${item.id}` }>
                <img
                  className="rounded-md w-32 h-32"
                  src={ item.image }
                  alt={ item.name }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
            </div>

            <div className="flex-col w-4/5 ml-2">
              <div>
                {item.type === 'food' && (
                  <span
                    className="font-normal text-stone-600"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {`${item.nationality} - ${item.category} `}
                  </span>
                )}

                {item.type === 'drink' && (
                  <span
                    className="font-normal text-stone-600"
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {item.alcoholicOrNot}
                  </span>
                )}
                <Link to={ `/${item.type}s/${item.id}` }>
                  <h4
                    className="font-bold text-stone-800"
                    data-testid={ `${index}-horizontal-name` }
                  >
                    {item.name}
                  </h4>
                </Link>
              </div>
              <div className=" flex justify-end">
                <div>
                  {isCopied && (
                    <span className="font-normal text-stone-500">
                      Link copied!
                    </span>
                  )}
                </div>
                <button
                  type="button"
                  data-testid={ `${index}-horizontal-share-btn` }
                  style={ { margin: '10px' } }
                  onClick={ () => {
                    handleShare(item.id, item.type);
                  } }
                >
                  <span className="material-symbols-outlined text-orange-600">
                    share
                  </span>
                </button>

                <button
                  type="button"
                  className=""
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  style={ { margin: '10px' } }
                  onClick={ () => handleUnfavorite(item.id) }
                >
                  <span className="material-symbols-outlined text-orange-600">
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

CardFavorite.propTypes = {
  favorites: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  chosenFilter: PropTypes.string.isRequired,
};

export default CardFavorite;
