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
            title={ recipe.strMeal }
            width="420"
            height="315"
            src={ `https://www.youtube.com/embed/${videoURL}` }
          />
          <div style={ { display: 'flex' } }>
            {
              recomend.map((el, index) => (
                <img
                  className="recomend-img"
                  src={ el.strDrinkThumb }
                  alt={ el.strDrink }
                  key={ el.index }
                  data-testid={ `${index}-recomendation-card` }
                />
              ))
            }
          </div>
        </div>
      );
    }

    if (recipeDetail.type === 'drink') {
      return (
        <div>
          <img
            data-testid="recipe-photo"
            alt={ recipe.strDrink }
            src={ recipe.strDrinkThumb }
          />
          <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
          <h4 data-testid="recipe-category">{recipe.srtAlcoholic}</h4>
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
          <section style={ { position: 'absolute', maxWidth: '300px' } }>
            <div style={ { display: 'flex', position: 'relative', width: '200px' } }>
              {
                recomend.map((el, index) => (
                  <img
                    className="recomend-img"
                    src={ el.strMealThumb }
                    alt={ el.strMeal }
                    key={ el.index }
                    data-testid={ `${index}-recomendation-card` }
                  />
                ))
              }
            </div>
          </section>
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
