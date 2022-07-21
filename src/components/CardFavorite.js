import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

const copy = require('clipboard-copy');

function CardFavorite({ favorites, chosenFilter }) {
  const [isCopied, setIsCopied] = useState(false);

  const { meals } = favorites;
  const { drinks } = favorites;

  function handleShare(id) {
    const CINCO_SEGUNDOS = 5000;
    copy(`http://localhost:3000/foods/${id}`);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), CINCO_SEGUNDOS);
  }

  return (
    <div>
      {meals
        && meals.map((item, index) => (
          <div
            key={ item.idMeal }
            style={ {
              display: 'flex',
              border: '1px solid',
              margin: '10px',
              padding: '10px',
            } }
          >
            <Link to={ `/foods/${item.idMeal}` }>
              <img
                style={ { width: '100px', margin: '10px' } }
                src={ item.strMealThumb }
                alt={ item.strMeal }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div style={ { display: 'flex', flexDirection: 'column' } }>
              <div>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${item.strArea} - ${item.strCategory} `}
                </span>
                <Link to={ `/foods/${item.idMeal}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    {item.strMeal}
                  </h3>
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  style={ { margin: '10px' } }
                  onClick={ () => {
                    handleShare(`${item.idMeal}`);
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

      {drinks
        && drinks.map((item, index) => (
          <div
            key={ item.idDrink }
            style={ {
              display: 'flex',
              border: '1px solid',
              margin: '10px',
              padding: '10px',
            } }
          >
            <Link to={ `/drinks/${item.idMeal}` }>
              <img
                style={ { width: '100px', margin: '10px' } }
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
                data-testid={ `${index}-horizontal-image` }
              />
            </Link>
            <div style={ { display: 'flex', flexDirection: 'column' } }>
              <div>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {item.strAlcoholic}
                </span>
                <Link to={ `/drinks/${item.idMeal}` }>
                  <h3 data-testid={ `${index}-horizontal-name` }>
                    {item.strDrink}
                  </h3>
                </Link>
              </div>
              <div>
                <button
                  type="button"
                  src={ shareIcon }
                  data-testid={ `${index}-horizontal-share-btn` }
                  style={ { margin: '10px' } }
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
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

CardFavorite.propTypes = {
  favorites: PropTypes.shape({
    meals: PropTypes.arrayOf(PropTypes.shape({})),
    drinks: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
  chosenFilter: PropTypes.string.isRequired,
};

export default CardFavorite;
