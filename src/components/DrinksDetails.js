import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';

function DrinksDetails() {
  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);
  const [btnText, setBtnText] = useState([]);

  useEffect(() => {
    const showButtonContinueRecipe = () => {
      const inProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgCocktails = inProgress.cocktails;
      const arrayOfInProgC = Object.keys(inProgCocktails);
      const isInProg = arrayOfInProgC.some((inProgC) => inProgC.id === recipe.idDrink);
      if (isInProg) setBtnText('Continue Recipe');
    };

    showButtonContinueRecipe();
  });
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
            <section data-testid={ `${index}-recomendation-card` } key={ el.index }>
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
              {btnText}
            </button>
          </Link>
        )
      }

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

export default DrinksDetails;
