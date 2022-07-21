import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';
import IngredientList from './IngredientList';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

function DrinksDetails() {
  const localStorageFavs = localStorage.getItem('favoriteRecipes');

  const { states: { recipeDetail: { recipe }, recomend } } = useContext(context);

  // estados do COMPONENTE: botões
  const [btnText, setBtnText] = useState('Start Recipe');
  const [btnShareTxt, setBtnShareTxt] = useState('Share');
  const [isFavorited, setIsFavorited] = useState(false);
  const [btnFavoriteRecipe, setBtnFavoriteRecipe] = useState(whiteHeartIcon);

  useEffect(() => {
    const showButtonContinueRecipe = () => {
      const inProgress = localStorage.getItem('inProgressRecipes');
      if (inProgress) {
        const inProgressObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
        if (inProgressObj.cocktails) {
          const isInProg = Object.keys(inProgressObj.cocktails)
            .some((inProgC) => inProgC === recipe.idDrink);
          if (isInProg) setBtnText('Continue Recipe');
        }
      }
    };

    showButtonContinueRecipe();

    const showButtonFavorite = () => {
      const stage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      if (stage) {
        const isFavorite = stage.some((el) => el.id !== recipe.idDrink);
        if (isFavorite) {
          console.log(isFavorite);
          setIsFavorited(true);
          setBtnFavoriteRecipe(blackHeartIcon);
        } else {
          setIsFavorited(false);
          setBtnFavoriteRecipe(whiteHeartIcon);
        }
      }
    };

    showButtonFavorite();
  }, []);

  // onClickBtnShare
  const handleShareBtn = () => {
    copy(window.location.href);
    setBtnShareTxt('Link copied!');
  };

  // adiciona no localStorage
  const sendLocalStorage = () => {
    const newFavRecipe = {
      id: recipe.idDrink,
      type: 'drink',
      nationality: '',
      category: recipe.strCategory,
      alcoholicOrNot: recipe.strAlcoholic,
      name: recipe.strDrink,
      image: recipe.strDrinkThumb,
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
  };

  // remove do localStorage
  const removeLocalStorage = () => {
    if (localStorageFavs) {
      const stage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const updatedFavList = stage.filter((el) => el.id !== recipe.idDrink);
      localStorage.setItem('favoriteRecipes', JSON.stringify(updatedFavList));
      console.log(updatedFavList);
      setIsFavorited(false);
    }
  };

  // onClickBtbFavorite
  const handleFavoriteBtn = () => {
    if (!isFavorited) {
      setBtnFavoriteRecipe(blackHeartIcon);
      sendLocalStorage();
    } else {
      setBtnFavoriteRecipe(whiteHeartIcon);
      removeLocalStorage();
    }
  };

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
            <section data-testid={ `${index}-recomendation-card` } key={ index }>
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
              { btnText }
            </button>
          </Link>
        )
      }

      <button
        // style={ { position: 'fixed', bottom: '0' } }
        style={ { marginLeft: '120px' } }
        type="button"
        data-testid="share-btn"
        onClick={ handleShareBtn }
      >
        { btnShareTxt }
        {'  '}
        <img alt="share" src={ shareIcon } />
      </button>
      <input
        style={ { marginLeft: '20px' } }
        type="image"
        data-testid="favorite-btn"
        onClick={ handleFavoriteBtn }
        src={ btnFavoriteRecipe }
        alt="favoritar"
      />
    </div>
  );
}

export default DrinksDetails;
