import React, { useEffect, useContext } from 'react';
import context from '../context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import DrinksDetails from '../components/DrinksDetails';
import FoodsDetails from '../components/FoodsDetails';

function RecipeDetails() {
  const { functions: { setRecipeDetail, setRecomend }, // doneRecipes
    states: { recipeDetail } } = useContext(context);

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
        // console.log(response.drinks);
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
        setRecomend(recomendedDrinks);
      }

      if (window.location.pathname.includes('/drinks')) {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
          .then((resp) => resp.json());
        const recomendedMeals = response.meals.slice(0, SIX);
        setRecomend(recomendedMeals);
      }
    };

    getRecommendation();
  }, [setRecomend, setRecipeDetail]);

  // monta info das receitas
  const renderRecipe = () => { // passar recipe como prop
    if (recipeDetail.type === 'food') {
      // const videoURL = recipe.strYoutube.split('=')[1];

      return (
        <FoodsDetails />
      );
    }

    if (recipeDetail.type === 'drink') {
      return (
        <DrinksDetails />
      );
    }
  };

  return (
    <div>
      {renderRecipe()}
    </div>
  );
}

export default RecipeDetails;
