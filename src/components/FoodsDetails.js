/* eslint-disable max-len */
/* eslint-disable max-lines */
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';
// import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import HorizontalSlideFood from './HorizontalSlideFood';

const copy = require('clipboard-copy');

function FoodsDetails() {
  const localStorageFavs = localStorage.getItem('favoriteRecipes');

  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);

  // estados do COMPONENTE: botões
  const [btnText, setBtnText] = useState('Start Recipe');
  const [btnShareTxt, setBtnShareTxt] = useState('');

  const [isFavorited, setIsFavorited] = useState(false);

  const [btnFavoriteRecipe, setBtnFavoriteRecipe] = useState(whiteHeartIcon);

  const videoURL = recipe.strYoutube.split('=')[1];

  useEffect(() => {
    const showButtonContinueRecipe = () => {
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (inProgress) {
        const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressObj.meals) {
          const inProgMeals = inProgressObj.meals;
          const arrayOfInProgM = Object.keys(inProgMeals);
          const isInProg = arrayOfInProgM.some((inProgC) => inProgC === recipe.idMeal);
          if (isInProg) setBtnText('Continue Recipe');
        }
      }
    };

    showButtonContinueRecipe();

    const showButtonFavorite = () => {
      const stage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (stage) {
        const thisRecipeIsFav = stage.some((el) => el.id === recipe.idMeal);
        if (thisRecipeIsFav) {
          console.log(thisRecipeIsFav);
          setBtnFavoriteRecipe(blackHeartIcon);
          setIsFavorited(true);
        } else {
          setIsFavorited(false);
          // setBtnFavoriteRecipe(blackHeartIcon);
        }
      }
    };

    showButtonFavorite();
  }, []);

  // função para retornar botão start recipe ou não
  const showButtonStartRecipe = () => {
    const arrayObjReceitasLS = localStorage.getItem('doneRecipes');
    if (arrayObjReceitasLS !== null && arrayObjReceitasLS !== undefined) {
      const arrayObjReceitas = JSON.parse(arrayObjReceitasLS);
      const isDone = arrayObjReceitas
        .some((doneRecipe) => doneRecipe.id === recipe.idMeal);
      return !isDone;
    } return true;
  };

  // onClickBtnShare
  const handleShareBtn = () => {
    copy(window.location.href);
    setBtnShareTxt('Link copied!');
  };

  // adiciona no localStorage
  const sendLocalStorage = () => {
    const newFavRecipe = {
      id: recipe.idMeal,
      type: 'food',
      nationality: recipe.strArea,
      category: recipe.strCategory,
      alcoholicOrNot: '',
      name: recipe.strMeal,
      image: recipe.strMealThumb,
    };

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
      const updatedFavList = stage.filter((el) => el.id !== recipe.idMeal);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavList));
      console.log(updatedFavList);
      setIsFavorited(false);
      setBtnFavoriteRecipe(whiteHeartIcon);
    }
  };

  const handleFavoriteBtn = () => {
    if (!isFavorited) {
      sendLocalStorage();
      // setBtnFavoriteRecipe(blackHeartIcon);
    } else {
      removeLocalStorage();
      // setBtnFavoriteRecipe(whiteHeartIcon);
    }
  };

  return (
    <div className="font-sans flex flex-column">
      <Link
        to="/foods"
      >
        <span
          className="material-symbols-outlined fixed
        text-gray-900 active:text-orange-600 mt-3 ml-3"
        >
          arrow_back
        </span>
      </Link>
      <h2
        className="font-bold text-2xl text-center text-orange-500 mt-10"
        data-testid="recipe-title"
      >
        {recipe.strMeal}

      </h2>

      <section>
        <section className="flex justify-center">
          <img
            className="rounded-lg w-64 drop-shadow-lg"
            data-testid="recipe-photo"
            alt={ recipe.strMeal }
            src={ recipe.strMealThumb }
          />
        </section>
        <div
          className="absolute top-24 left-20 pb-4"
        >
          <button
            className="w-8 flex w-24"
            type="button"
            data-testid="share-btn"
            onClick={ handleShareBtn }
          >
            <p className="font-bold text-justify text-sm">{ btnShareTxt }</p>
            {/* <img className="w-10 pl-3 mr-2" alt="share" src={ shareIcon } />
           */}
            <span
              className="material-symbols-outlined pt-1
          material-symbols-outlined text-stone-800 text-3xl font-light"
            >
              share
            </span>
          </button>
        </div>

        <div className="absolute top-24 left-64 pt-2 pl-2">
          <input
            className="w-8"
            type="image"
            data-testid="favorite-btn"
            onClick={ handleFavoriteBtn }
            src={ btnFavoriteRecipe }
            alt="favoritar"
          />
        </div>

        <div className="absolute top-72 left-10 pt-0 ml-3 pl-2 bg-white/50 w-36">
          <h4 data-testid="recipe-category">{recipe.strCategory}</h4>
        </div>
      </section>

      <section className="flex flex-column  px-14 border-y-2 mt-4">
        <p
          className="text-lg font-semibold m-0 pt-3
          text-start text-orange-500"
        >
          Ingredients:

        </p>
        <IngredientList />
      </section>

      <section className="flex flex-column  px-14">
        <p
          className="text-lg font-semibold m-0 pt-3
        text-start text-orange-500"
        >
          Details:

        </p>
        <p
          className="overflow-y-auto h-60 mb-2"
          data-testid="instructions"
        >
          {recipe.strInstructions}

        </p>
      </section>

      <iframe
        className="w-64 mx-14 mb-8 drop-shadow-lg rounded-md"
        data-testid="video"
        title={ recipe.strMeal }
        src={ `https://www.youtube.com/embed/${videoURL}` }
      />

      <div className="">
        <p className="text-lg font-semibold m-0 pt-3 text-start text-orange-500 pl-14">Recommended Drinks: </p>
        <HorizontalSlideFood recomend={ recomend } />
      </div>

      {
        showButtonStartRecipe() && (
          <div className="flex justify-center">
            <Link to={ `/foods/${recipe.idMeal}/in-progress` }>
              <button
                className="bg-orange-500 text-white text-sm mb-24 px-24 py-2
              rounded-md hover:bg-orange-600 active:bg-orange-600 font-semibold"
                type="button"
                data-testid="start-recipe-btn"
              >
                { btnText }
              </button>
            </Link>
          </div>
        )
      }
    </div>
  );
}

export default FoodsDetails;
