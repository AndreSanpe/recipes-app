import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import context from '../context/context';
import IngredientInput from '../components/IngredientInput';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Footer from '../components/Footer';

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
    <main className="font-sans flex flex-column justify-center mb-10">
      { recipeDetail.type === 'food'
        ? (
          <>
            <Link
              to="/foods/id:"
            >
              <span
                className="material-symbols-outlined
        text-gray-900 active:text-orange-600 mt-3 ml-3"
              >
                arrow_back
              </span>
            </Link>
            { srcRecipe.map((el) => (
              <div
                key={ el.idMeal }
              >
                <h3
                  className="font-bold text-2xl text-center text-orange-500"
                  data-testid="recipe-title"
                >
                  { el.strMeal }

                </h3>
                <img
                  className="rounded-lg w-64 drop-shadow-lg m-auto"
                  src={ el.strMealThumb }
                  alt={ el.strMeal }
                  data-testid="recipe-photo"
                />
                <div className="flex flex-row border-b-4 mt-4 space-x-8">
                  <button
                    className="absolute top-28 left-24"
                    type="button"
                    data-testid="share-btn"
                    onClick={ copyLinkRecepie }
                  >
                    <img alt="share" src={ shareIcon } />

                  </button>
                  { copyMessage && <span>Link copied!</span> }
                  <input
                    className="absolute top-28 right-24 w-8 material-symbols-outlined
                  text-orange-600"
                    type="image"
                    data-testid="favorite-btn"
                    onClick={ handleFavoriteBtn }
                    src={ btnFavoriteRecipe }
                    alt="favoritar"
                  />
                  {/* <p
                    className="flex-column"
                    data-testid="recipe-category"
                  >
                    Category :
                    {' '}
                    { el.strCategory }

                  </p> */}
                </div>
                <IngredientInput
                  srcRecipe={ srcRecipe }
                  setBtnDisabled={ setBtnDisabled }
                />

                <div className="border-y-4 mt-7 mb-4">
                  <p
                    className="text-lg font-semibold m-0 p-2 ml-5 pt-3
          text-start text-orange-500"
                  >
                    Details:

                  </p>
                  <p
                    className="mx-5 px-2 mx-8 overflow-y-auto h-60"
                    data-testid="instructions"
                  >
                    { el.strInstructions }

                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="items-center bg-orange-500 p-2 rounded-md mb-6 py-1 px-2 font-sans font-bold text-white
                  hover:bg-orange-600 shadow-lg"
                    type="button"
                    data-testid="finish-recipe-btn"
                    disabled={ btnDisabled }
                    onClick={ () => history.push('/done-recipes') }
                  >
                    Finalizar Receita

                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <>
            <Link
              to="/foods/id:"
            >
              <span
                className="material-symbols-outlined
        text-gray-900 active:text-orange-600 mt-3 ml-3"
              >
                arrow_back
              </span>
            </Link>
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
                  <h3
                    className="font-bold text-2xl text-center text-orange-500"
                    data-testid="recipe-title"
                  >
                    { el.strDrink }

                  </h3>
                  <img
                    className="rounded-lg w-64 drop-shadow-lg m-auto"
                    src={ el.strDrinkThumb }
                    alt={ el.strDrink }
                    data-testid="recipe-photo"
                  />
                  <div className="flex flex-row border-b-4 mt-4 space-x-8">
                    <button
                      className="absolute top-28 left-24"
                      type="button"
                      data-testid="share-btn"
                      onClick={ copyLinkRecepie }
                    >
                      <img alt="share" src={ shareIcon } />
                    </button>
                    { copyMessage && <span>Link copied!</span> }
                    <input
                      className="absolute top-28 right-24 w-8 material-symbols-outlined
                      text-orange-600"
                      type="image"
                      data-testid="favorite-btn"
                      onClick={ handleFavoriteBtn }
                      src={ btnFavoriteRecipe }
                      alt="favoritar"
                    />
                  </div>
                  {/* <p data-testid="recipe-category">{ el.strCategory }</p> */}
                  <div className="mr-40 pr-4">
                    <IngredientInput
                      srcRecipe={ srcRecipe }
                      setBtnDisabled={ setBtnDisabled }
                    />
                  </div>
                  <div className="border-y-4 mt-7 mb-4">
                    <p
                      className="text-lg font-semibold m-0 p-2 ml-5 pt-3
          text-start text-orange-500"
                    >
                      Details:

                    </p>
                    <p
                      className="mx-5 px-2 mx-8 overflow-y-auto h-20"
                      data-testid="instructions"
                    >
                      { el.strInstructions }

                    </p>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="items-center bg-orange-500 p-2 rounded-md mb-6 py-1 px-2 font-sans font-bold text-white
                       hover:bg-orange-600 shadow-lg"
                      type="button"
                      data-testid="finish-recipe-btn"
                      disabled={ btnDisabled }
                      onClick={ () => history.push('/done-recipes') }
                    >
                      Finalizar Receita

                    </button>
                  </div>
                </div>
              ))
            }
          </>
        ) }
      <Footer />
    </main>
  );
}

export default RecipeInProgress;
