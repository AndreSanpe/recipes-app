import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// import IngredientInput from './IngredientInput';
import meals from './MockRecepieInProgress';

function RecipeInProgress() {
  const [isFinishButtonDisabled] = useState(true); // setIsFinishButtonDisabled
  const [copyMessage, setCopyMessage] = useState(false);
  const history = useHistory();

  const copyLinkRecepie = () => {
    navigator.clipboard.writeText(meals[0].strSource);
    setCopyMessage(true);
  };

  return (
    <>
      {
        meals.map((el) => (
          <div key={ el.idMeal }>
            <h3 data-testid="recipe-title">{ el.strMeal }</h3>
            <img
              style={ { width: '100px' } }
              src={ el.strMealThumb }
              alt={ el.strMeal }
              data-testid="recipe-photo"
            />
            <button
              type="button"
              data-testid="share-btn"
              onClick={ copyLinkRecepie }
            >
              Compartilhar

            </button>
            { copyMessage && <span>Link copied!</span> }
            <button
              type="button"
              data-testid="favorite-btn"
            >
              Favoritar

            </button>
            <p data-testid="recipe-category">{ el.strCategory }</p>
            {/* <IngredientInput
              meals={ meals }
              setIsFinishButtonDisabled={ setIsFinishButtonDisabled }
            /> */}
            <p data-testid="instructions">{ el.strInstructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
              disabled={ isFinishButtonDisabled }
              onClick={ () => history.push('/done-recipes') }
            >
              Finalizar Receita

            </button>
          </div>
        ))
      }
    </>
  );
}

export default RecipeInProgress;
