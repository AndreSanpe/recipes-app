import React, { useEffect, useContext } from 'react';
// import { Link } from 'react-router-dom';
import context from '../context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
// import IngredientList from '../components/IngredientList';
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
        // <div>
        //   <img
        //     className="w-75"
        //     data-testid="recipe-photo"
        //     alt={ recipe.strMeal }
        //     src={ recipe.strMealThumb }
        //   />
        //   <h2 data-testid="recipe-title">{recipe.strMeal}</h2>
        //   <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
        //   <IngredientList />
        //   <p data-testid="instructions">{recipe.strInstructions}</p>
        //   <iframe
        //     data-testid="video"
        //     title={ recipe.strMeal }
        //     width="420"
        //     height="315"
        //     src={ `https://www.youtube.com/embed/${videoURL}` }
        //   />

      //   <div style={ { display: 'flex', overflow: 'auto', whiteSpace: 'nowrap' } }>
      //     {
      //       recomend.map((el, index) => (
      //         <section data-testid={ `${index}-recomendation-card` } key={ el.index }>
      //           <p data-testid={ `${index}-recomendation-title` }>
      //             { el.strDrink }
      //           </p>
      //           <img
      //             className="recomend-img"
      //             src={ el.strDrinkThumb }
      //             alt={ el.strDrink }
      //           />
      //         </section>
      //       ))
      //     }
      //   </div>
      //   {/* {
      //     doneRecipes.filter((obj) => obj.idDrink === recipe.idDrink) ? '' : (
      //       <Link to={ `/drinks/${recipe.idDrink}/in-progress` }>
      //         <button
      //           style={ { position: 'fixed', bottom: '0' } }
      //           type="button"
      //           data-testid="start-recipe-btn"
      //         >
      //           Start Recipe
      //         </button>
      //       </Link>

      //     )
      //   } */}
      //   <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
      //     <button
      //       style={ { position: 'fixed', bottom: '0' } }
      //       type="button"
      //       data-testid="start-recipe-btn"
      //     >
      //       Start Recipe
      //     </button>
      //   </Link>
      //   <button
      //     // style={ { position: 'fixed', bottom: '0' } }
      //     style={ { marginLeft: '150px' } }
      //     type="button"
      //     data-testid="share-btn"
      //   >
      //     Share
      //   </button>
      //   <button
      //     style={ { marginLeft: '50px' } }
      //     type="button"
      //     data-testid="favorite-btn"
      //   >
      //     favoritar
      //   </button>
      // </div>
      );
    }

    if (recipeDetail.type === 'drink') {
      return (
        <DrinksDetails />
        // <div>
        //   <img
        //     className="w-75"
        //     data-testid="recipe-photo"
        //     alt={ recipe.strDrink }
        //     src={ recipe.strDrinkThumb }
        //   />
        //   <h2 data-testid="recipe-title">{recipe.strDrink}</h2>
        //   <h4 data-testid="recipe-category">{recipe.strAlcoholic}</h4>
        //   <IngredientList />
        //   <p data-testid="instructions">{recipe.strInstructions}</p>
        //   <section>
        //     <div style={ { display: 'flex', overflow: 'auto', whiteSpace: 'nowrap' } }>
        //       {
        //         recomend.map((el, index) => (
        //           <section key={ el.index }>
        //             <figure>
        //               <img
        //                 className="recomend-img"
        //                 src={ el.strMealThumb }
        //                 alt={ el.strMeal }
        //                 data-testid={ `${index}-recomendation-card` }
        //               />
        //               <figcaption
        //                 data-testid={ `${index}-recomendation-title` }
        //               >
        //                 { el.strMeal }

      //               </figcaption>
      //             </figure>
      //           </section>
      //         ))
      //       }
      //     </div>
      //   </section>
      //   {/* {
      //     doneRecipes.filter((obj) => obj.idDrink === recipe.idDrink) ? '' : (
      //       <Link to={ `/drinks/${recipe.idDrink}/in-progress` }>
      //         <button
      //           style={ { position: 'fixed', bottom: '0' } }
      //           type="button"
      //           data-testid="start-recipe-btn"
      //         >
      //           Start Recipe
      //         </button>
      //       </Link>

      //     )
      //   } */}
      //   <Link to={ `/drinks/${recipe.idDrink}/in-progress` }>
      //     <button
      //       style={ { position: 'fixed', bottom: '0' } }
      //       type="button"
      //       data-testid="start-recipe-btn"
      //     >
      //       Start Recipe
      //     </button>
      //   </Link>
      //   <button
      //     style={ { marginLeft: '150px' } }
      //     type="button"
      //     data-testid="share-btn"
      //   >
      //     Share
      //   </button>
      //   <button
      //     style={ { marginLeft: '50px' } }
      //     type="button"
      //     data-testid="favorite-btn"
      //   >
      //     favoritar
      //   </button>
      // </div>
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
