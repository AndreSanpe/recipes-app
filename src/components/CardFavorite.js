import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardFavorite({ favorites, chosenFilter }) {
  const [isCopied, setIsCopied] = useState(false);
  const [favoriteList, setFavoriteList] = useState([]);
  const [localStorageUpdate, setLocalStorageUpdate] = useState(false);

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
    const CINCO_SEGUNDOS = 5000;
    copy(`http://localhost:3000/${type}s/${id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), CINCO_SEGUNDOS);
  }

  return (
    <div>
      {favoriteList.map((item, index) => (
        <div
          key={ item.id }
          style={ {
            display: 'flex',
            border: '1px solid',
            margin: '10px',
            padding: '10px',
          } }
        >
          <Link to={ `/${item.type}s/${item.id}` }>
            <img
              style={ { width: '100px', margin: '10px' } }
              src={ item.image }
              alt={ item.name }
              data-testid={ `${index}-horizontal-image` }
            />
          </Link>
          <div style={ { display: 'flex', flexDirection: 'column' } }>
            <div>
              {item.type === 'food' && (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.nationality} - ${item.category} `}
                </span>
              )}

              {item.type === 'drink' && (
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {item.alcoholicOrNot}
                </span>
              )}

              <Link to={ `/${item.type}s/${item.id}` }>
                <h3 data-testid={ `${index}-horizontal-name` }>{item.name}</h3>
              </Link>
            </div>
            <div>
              <button
                type="button"
                src={ shareIcon }
                data-testid={ `${index}-horizontal-share-btn` }
                style={ { margin: '10px' } }
                onClick={ () => {
                  handleShare(item.id, item.type);
                } }
              >
                <img src={ shareIcon } alt="share icon" />
              </button>

              <button
                type="button"
                src={ blackHeartIcon }
                data-testid={ `${index}-horizontal-favorite-btn` }
                style={ { margin: '10px' } }
              >
                <img src={ blackHeartIcon } alt="favorite icon" />
              </button>

              <div>{isCopied && <span>Link copied!</span>}</div>
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
