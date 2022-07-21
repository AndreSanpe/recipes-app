import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function FoodsDetails() {
  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);

  // estados do COMPONENTE: botões
  const [btnText, setBtnText] = useState('Start Recipe');
  const [btnShareTxt, setBtnShareTxt] = useState('Share');

  const unfavoriteRecipe = <img alt="favorite this recipe" src={ whiteHeartIcon } />;
  const [btnFavoriteRecipe, setBtnFavoriteRecipe] = useState(unfavoriteRecipe);

  const favoritedRecipe = <img alt="favorite this recipe" src={ blackHeartIcon } />;

  const videoURL = recipe.strYoutube.split('=')[1];

  useEffect(() => {
    const showButtonContinueRecipe = () => {
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (inProgress) {
        const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressObj.meals) {
          const inProgMeals = inProgressObj.meals;
          const arrayOfInProgM = Object.keys(inProgMeals);
          const isInProg = arrayOfInProgM.some((inProgC) => inProgC === recipe.idMeal);
          if (isInProg) setBtnText('Continue Recipe');
        }
      }
    };

    showButtonContinueRecipe();
  }, [setBtnText, recipe.idMeal]);

  // função para retornar botão start recipe ou não
  const showButtonStartRecipe = () => {
    const arrayObjReceitasLS = localStorage.getItem('doneRecipes');
    if (arrayObjReceitasLS !== null && arrayObjReceitasLS !== undefined) {
      const arrayObjReceitas = JSON.parse(arrayObjReceitasLS);
      const isDone = arrayObjReceitas
        .some((doneRecipe) => doneRecipe.id === recipe.idMeal);
      return !isDone;
    } return true;
  };

  // onClickBtnShare
  const handleShareBtn = () => {
    copy(window.location.href);
    setBtnShareTxt('Link copied!');
  };

  // onClickBtnShare
  const handleFavoriteBtn = () => {
    setBtnFavoriteRecipe(favoritedRecipe);
  };

  return (
    <div>
      <img
        className="w-75"
        data-testid="recipe-photo"
        alt={ recipe.strMeal }
        src={ recipe.strMealThumb }
      />
      <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
      <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
      <IngredientList />
      <p data-testid="instructions">{recipe.strInstructions}</p>
      <iframe
        data-testid="video"
        title={ recipe.strMeal }
        width="420"
        height="315"
        src={ `https://www.youtube.com/embed/${videoURL}` }
      />

      <div style={ { display: 'flex', overflow: 'auto', whiteSpace: 'nowrap' } }>
        {
          recomend.map((el, index) => (
            <section data-testid={ `${index}-recomendation-card` } key={ index }>
              <p data-testid={ `${index}-recomendation-title` }>
                { el.strDrink }
              </p>
              <img
                className="recomend-img"
                src={ el.strDrinkThumb }
                alt={ el.strDrink }
              />
            </section>
          ))
        }
      </div>
      {
        showButtonStartRecipe() && (
          <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
            <button
              style={ { position: 'fixed', bottom: '0' } }
              type="button"
              data-testid="start-recipe-btn"
            >
              { btnText }
            </button>
          </Link>
        )
      }
      <button
        // style={ { position: 'fixed', bottom: '0' } }
        style={ { marginLeft: '120px' } }
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        { btnShareTxt }
        {'  '}
        <img alt="share" src={ shareIcon } />
      </button>
      <button
        style={ { marginLeft: '20px' } }
        type="button"
        data-testid="favorite-btn"
        onClick={ handleFavoriteBtn }
      >
        { btnFavoriteRecipe }
      </button>
    </div>
  );
}

export default FoodsDetails;
