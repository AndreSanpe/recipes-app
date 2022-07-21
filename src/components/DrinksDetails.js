import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksDetails() {
  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);

  // estados do COMPONENTE: botões
  const [btnText, setBtnText] = useState('Start Recipe');
  const [btnShareTxt, setBtnShareTxt] = useState('Share');

  const unfavoriteRecipe = <img alt="favorite this recipe" src={ whiteHeartIcon } />;
  const [btnFavoriteRecipe, setBtnFavoriteRecipe] = useState(unfavoriteRecipe);

  const favoritedRecipe = <img alt="favorite this recipe" src={ blackHeartIcon } />;

  useEffect(() => {
    const showButtonContinueRecipe = () => {
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (inProgress) {
        const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressObj.cocktails) {
          const inProgCocktails = inProgressObj.cocktails;
          const arrayOfInProgC = Object.keys(inProgCocktails);
          const isInProg = arrayOfInProgC.some((inProgC) => inProgC === recipe.idDrink);
          if (isInProg) setBtnText('Continue Recipe');
        }
      }
    };

    showButtonContinueRecipe();
  }, [setBtnText, recipe.idDrink]);

  // onClickBtnShare
  const handleShareBtn = () => {
    copy(window.location.href);
    setBtnShareTxt('Link copied!');
  };

  // onClickBtnShare
  const handleFavoriteBtn = () => {
    setBtnFavoriteRecipe(favoritedRecipe);

    const newFavRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
    };

    const localStorageFavs = localStorage.getItem('favoriteRecipes');

    if (localStorageFavs) {
      localStorageFavs.push(newFavRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(localStorageFavs));
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
    }
    // localStorageFavs[0].push(obj);
  };

  // função para retornar botão start recipe ou não
  const showButtonStartRecipe = () => {
    const arrayObjReceitasLS = localStorage.getItem('doneRecipes');
    if (arrayObjReceitasLS) {
      const arrayObjReceitas = JSON.parse(arrayObjReceitasLS);
      const isDone = arrayObjReceitas
        .some((doneRecipe) => doneRecipe.id === recipe.idDrink);
      return !isDone;
    } return true;
  };

  return (
    <div>
      <img
        className="w-75"
        data-testid="recipe-photo"
        alt={ recipe.strDrink }
        src={ recipe.strDrinkThumb }
      />
      <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
      <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
      <IngredientList />
      <p data-testid="instructions">{recipe.strInstructions}</p>

      {/* carousel */}
      <div style={ { display: 'flex', overflow: 'auto', whiteSpace: 'nowrap' } }>
        {
          recomend.map((el, index) => (
            <section data-testid={ `${index}-recomendation-card` } key={ index }>
              <p data-testid={ `${index}-recomendation-title` }>
                { el.strMeal }
              </p>
              <img
                className="recomend-img"
                src={ el.strMealThumb }
                alt={ el.strMeal }
              />
            </section>
          ))
        }
      </div>
      {
        showButtonStartRecipe() && (
          <Link to={ `/drinks/${recipe.idDrink}/in-progress` }>
            <button
              id="btnStartRecipe"
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

export default DrinksDetails;
