import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import context from '../context/context';
import IngredientInput from '../components/IngredientInput';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeInProgress() {
  const {
    states: { recipeDetail },
    functions: { setRecipeDetail },
  } = useContext(context);

  const { recipe } = recipeDetail;

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [copyMessage, setCopyMessage] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [btnFavoriteRecipe, setBtnFavoriteRecipe] = useState(whiteHeartIcon);

  const history = useHistory();
  const { id: idRoute } = useParams();
  const localStorageFavs = localStorage.getItem('favoriteRecipes');

  const copyLinkRecepie = () => {
    const url = window.location.href;
    const newURL = url.replace('/in-progress', '');
    navigator.clipboard.writeText(newURL);
    setCopyMessage(true);
  };

  const srcRecipe = [];
  srcRecipe.push(recipe);

  const sendLocalStorage = () => {
    console.log(recipeDetail);
    let newFavRecipe = {
    };
    if (window.location.pathname.includes('/drinks')) {
      newFavRecipe = {
        id: idRoute,
        type: recipeDetail.type,
        nationality: '',
        category: recipe.strCategory,
        alcoholicOrNot: recipe.strAlcoholic,
        name: recipe.strDrink,
        image: recipe.strDrinkThumb,
      };
    } else {
      newFavRecipe = {
        id: idRoute,
        type: recipeDetail.type,
        nationality: recipe.strArea,
        category: recipe.strCategory,
        alcoholicOrNot: '',
        name: recipe.strMeal,
        image: recipe.strMealThumb,
      };
    }
    if (localStorageFavs) {
      const stage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      stage.push(newFavRecipe);
      localStorage.setItem('favoriteRecipes', JSON.stringify(stage));
      console.log(stage);
    } else {
      localStorage.setItem('favoriteRecipes', JSON.stringify([newFavRecipe]));
    }
    setIsFavorited(true);
    setBtnFavoriteRecipe(blackHeartIcon);
  };
  // remove do localStorage
  const removeLocalStorage = () => {
    if (localStorageFavs) {
      const stage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const updatedFavList = stage.filter((el) => el.id !== idRoute);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavList));
      console.log(updatedFavList);
      setIsFavorited(false);
      setBtnFavoriteRecipe(whiteHeartIcon);
    }
  };

  const handleFavoriteBtn = () => {
    if (!isFavorited) {
      sendLocalStorage();
    } else {
      removeLocalStorage();
    }
  };

  useEffect(() => {
    const favoriteLS = localStorage.getItem('favoriteRecipes');
    if (favoriteLS) {
      const stage = JSON.parse(favoriteLS);
      const updatedFavList = stage.find((el) => el.id === idRoute);
      if (updatedFavList) {
        setBtnFavoriteRecipe(blackHeartIcon);
        setIsFavorited(true);
      }
    }
  }, []);

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
                  onClick={ copyLinkRecepie }
                >
                  Compartilhar

                </button>
                { copyMessage && <span>Link copied!</span> }
                <input
                  style={ { marginLeft: '20px' } }
                  type="image"
                  data-testid="favorite-btn"
                  onClick={ handleFavoriteBtn }
                  src={ btnFavoriteRecipe }
                  alt="favoritar"
                />
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
                <div
                  key={ el.idDrink }
                  style={ {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',

                  } }
                >
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
                    onClick={ copyLinkRecepie }
                  >
                    Compartilhar

                  </button>
                  { copyMessage && <span>Link copied!</span> }
                  <input
                    style={ { marginLeft: '20px' } }
                    type="image"
                    data-testid="favorite-btn"
                    onClick={ handleFavoriteBtn }
                    src={ btnFavoriteRecipe }
                    alt="favoritar"
                  />
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
