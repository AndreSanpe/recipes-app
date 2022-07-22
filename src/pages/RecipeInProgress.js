import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import context from '../context/context';
import IngredientInput from '../components/IngredientInput';

function RecipeInProgress() {
  const {
    states: { recipeDetail },
    functions: { setRecipeDetail },
  } = useContext(context);

  const { recipe } = recipeDetail;
  // console.log(recipe);
  // console.log(recipeDetail);
  // console.log(meals);

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [copyMessage, setCopyMessage] = useState(false);
  const history = useHistory();

  // const copyLinkRecepie = (link) => {
  //   navigator.clipboard.writeText(link);
  //   setCopyMessage(true);
  // };

  const srcRecipe = [];
  srcRecipe.push(recipe);
  console.log(srcRecipe);

  const handleShareBtn = () => {
    const id = window.location.pathname.split('/')[2];
    // log(srcRecipe);
    if (window.location.pathname.includes('/foods')) {
      const link = `http://localhost:3000/foods/${id}`;
      copy(link);
      setCopyMessage('Link copied!');
    }
    if (window.location.pathname.includes('/drinks')) {
      const link = `http://localhost:3000/drinks/${id}`;
      copy(link);
      setCopyMessage('Link copied!');
    }
  };

  useEffect(() => {
    const id = window.location.pathname.split('/')[2];

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
  }, []);

  return (
    <main>
      { recipeDetail.type === 'food'
        ? (
          <div>
            { srcRecipe.map((el) => (
              <div
                key={ el.idMeal }
                style={ {
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',

                } }
              >
                <h3 data-testid="recipe-title">{ el.strMeal }</h3>
                <img
                  style={ { width: '200px' } }
                  src={ el.strMealThumb }
                  alt={ el.strMeal }
                  data-testid="recipe-photo"
                />
                <button
                  type="button"
                  data-testid="share-btn"
                  onClick={ handleShareBtn }
                >
                  Compartilhar

                </button>
                { copyMessage && <span>{ copyMessage }</span> }
                <button
                  type="button"
                  data-testid="favorite-btn"
                >
                  Favoritar

                </button>
                <p data-testid="recipe-category">{ el.strCategory }</p>
                <IngredientInput
                  srcRecipe={ srcRecipe }
                  setBtnDisabled={ setBtnDisabled }
                />
                <p data-testid="instructions">{ el.strInstructions }</p>
                <button
                  type="button"
                  data-testid="finish-recipe-btn"
                  disabled={ btnDisabled }
                  onClick={ () => history.push('/done-recipes') }
                >
                  Finalizar Receita

                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            {
              srcRecipe.map((el) => (
                <div key={ el.idDrink }>
                  <h3 data-testid="recipe-title">{ el.strDrink }</h3>
                  <img
                    style={ { width: '100px' } }
                    src={ el.strDrinkThumb }
                    alt={ el.strDrink }
                    data-testid="recipe-photo"
                  />
                  <button
                    type="button"
                    data-testid="share-btn"
                    onClick={ handleShareBtn }
                  >
                    Compartilhar

                  </button>
                  { copyMessage && <span>{ copyMessage }</span> }
                  <button
                    type="button"
                    data-testid="favorite-btn"
                  >
                    Favoritar

                  </button>
                  <p data-testid="recipe-category">{ el.strCategory }</p>
                  <IngredientInput
                    srcRecipe={ srcRecipe }
                    setBtnDisabled={ setBtnDisabled }
                  />
                  <p data-testid="instructions">{ el.strInstructions }</p>
                  <button
                    type="button"
                    data-testid="finish-recipe-btn"
                    disabled={ btnDisabled }
                    onClick={ () => history.push('/done-recipes') }
                  >
                    Finalizar Receita

                  </button>
                </div>
              ))
            }
          </div>
        ) }
    </main>
  );
}

export default RecipeInProgress;
