import React, { useEffect, useContext } from 'react';
import context from '../context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

function RecipeDetails() {
  const { functions: { setRecipeDetail, setSecomend },
    states: { recipeDetail, recomend } } = useContext(context);

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];

    // requisição detalhes
    const getDetailedRecipe = async (idRecipe) => {
      if (window.location.pathname.includes('/foods')) {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
          .then((resp) => resp.json());
        setRecipeDetail({ recipe: response.meals[0], type: 'food' });
      }

      if (window.location.pathname.includes('/drinks')) {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idRecipe}`)
          .then((resp) => resp.json());
        setRecipeDetail({ recipe: response.drinks[0], type: 'drink' });
      }
    };
    getDetailedRecipe(id);

    // requisição recommends
    const getRecommendation = async () => {
      const SIX = 6;
      if (window.location.pathname.includes('/foods')) {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
          .then((resp) => resp.json());
        const recomendedDrinks = response.drinks.slice(0, SIX);
        setSecomend(recomendedDrinks);
      }

      if (window.location.pathname.includes('/drinks')) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((resp) => resp.json());
        const recomendedMeals = response.meals.slice(0, SIX);
        setSecomend(recomendedMeals);
      }
    };

    getRecommendation();
  }, [setRecipeDetail, setSecomend]);

  // monta info das receitas
  const renderRecipe = (recipe) => {
    const ingredientList = Object.entries(recipe).filter((key) => key[0]
      .includes('strIngredient')).filter((ing) => ing[1] !== null && ing[1] !== '');

    const mesurementList = Object.entries(recipe).filter((key) => key[0]
      .includes('trMeasure')).filter((mes) => mes[1] !== null && mes[1] !== '');

    if (recipeDetail.type === 'food') {
      const videoURL = recipe.strYoutube.split('=')[1];

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
          <ul>
            {
              ingredientList.map((ing, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {` 🍳  ${ing[1]} - ${mesurementList[index][1]}`}
                </p>
              ))

            }
          </ul>
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
                    // data-testid={ `${index}-recomendation-card` }
                  />
                </section>
              ))
            }
          </div>
          <button
            style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
          <button
            // style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            // style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="favorite-btn"
          >
            favoritar
          </button>
        </div>
      );
    }

    if (recipeDetail.type === 'drink') {
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
          <ul>
            {
              ingredientList.map((ing, index) => (
                <p
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {` 🥃   ${ing[1]} - ${mesurementList[index][1]}`}
                </p>
              ))

            }
          </ul>
          <p data-testid="instructions">{recipe.strInstructions}</p>
          <section>
            <div style={ { display: 'flex', overflow: 'auto', whiteSpace: 'nowrap' } }>
              {
                recomend.map((el, index) => (
                  <section key={ el.index }>
                    <figure>
                      <img
                        className="recomend-img"
                        src={ el.strMealThumb }
                        alt={ el.strMeal }
                        data-testid={ `${index}-recomendation-card` }
                      />
                      <figcaption
                        data-testid={ `${index}-recomendation-title` }
                      >
                        { el.strMeal }

                      </figcaption>
                    </figure>
                  </section>
                ))
              }
            </div>
          </section>
          <button
            style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="start-recipe-btn"
          >
            Start Recipe
          </button>
          <button
            // style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="share-btn"
          >
            Share
          </button>
          <button
            // style={ { position: 'fixed', bottom: '0' } }
            type="button"
            data-testid="favorite-btn"
          >
            favoritar
          </button>
        </div>
      );
    }
  };

  return (
    <div>
      <h1>detalhes da receita </h1>
      {renderRecipe(recipeDetail.recipe)}
    </div>
  );
}

export default RecipeDetails;
