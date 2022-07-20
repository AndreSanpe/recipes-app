import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';

function FoodsDetails() {
  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);
  const videoURL = recipe.strYoutube.split('=')[1];

  // função para retornar botão start recipe ou não
  const showButtonStartRecipe = () => {
    const arrayObjReceitasLS = localStorage.getItem('doneRecipes');
    if (arrayObjReceitasLS) {
      const arrayObjReceitas = JSON.parse(arrayObjReceitasLS);
      const isDone = arrayObjReceitas
        .some((doneRecipe) => doneRecipe.id === recipe.idMeal);
      return !isDone;
    } return true;
  };

  const showButtonContinueRecipe = () => {
    const arrayObjInProg = localStorage.getItem('inProgressRecipes');
    if (arrayObjInProg) {
      const inProgRecipes = JSON.parse(arrayObjReceitasLS);
      const isInProgress = inProgRecipes
        .some((inProgRec) => inProgRec.id === recipe.idMeal);
      return !isInProgress;
    } return true;
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
            <section data-testid={ `${index}-recomendation-card` } key={ el.index }>
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
              Start Recipe
            </button>
          </Link>
        )
      }

      {
        showButtonContinueRecipe() && (
          <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
            <button
              style={ { position: 'fixed', bottom: '0' } }
              type="button"
              data-testid="start-recipe-btn"
            >
              Continue Recipe
            </button>
          </Link>
        )
      }
      {/* <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
        <button
          style={ { position: 'fixed', bottom: '0' } }
          type="button"
          data-testid="start-recipe-btn"
        >
          Start Recipe
        </button>
      </Link> */}
      <button
        // style={ { position: 'fixed', bottom: '0' } }
        style={ { marginLeft: '150px' } }
        type="button"
        data-testid="share-btn"
      >
        Share
      </button>
      <button
        style={ { marginLeft: '50px' } }
        type="button"
        data-testid="favorite-btn"
      >
        favoritar
      </button>
    </div>
  );
}

export default FoodsDetails;
