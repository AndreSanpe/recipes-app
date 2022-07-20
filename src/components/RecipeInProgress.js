import React, { useEffect, useState } from 'react';
import meals from './MockRecepieInProgress';
import './RecepieInProgress.css';

// const INGREDIENT_LIST = ['strIngredient1', 'strIngredient2', 'strIngredient3',
//   'strIngredient4', 'strIngredient5', 'strIngredient6', 'strIngredient7',
//   'strIngredient8', 'strIngredient9', 'strIngredient10', 'strIngredient11',
//   'strIngredient12', 'strIngredient13', 'strIngredient14', 'strIngredient15',
//   'strIngredient16', 'strIngredient17', 'strIngredient18', 'strIngredient19',
//   'strIngredient20'];

function RecipeInProgress() {
  console.log(meals);

  const [ingredients, setIngredients] = useState([]);
  let arrIngr = [];

  // for (let index = 1; index <= QTD_INGREDIENTS; index += 1) {
  //   if (meals[`strIngredient${index}`]) {
  //     ingredients.push({
  //       ingredient: item[`strIngredient${index}`] });
  //   }
  // }
  const a = Object.keys(meals[0]);

  // console.log(a);

  // console.log(ingredients);
  // // || console.log(Object.entries(i));
  useEffect(() => {
    a.forEach((el, index) => (
    // console.log(Object.values(meals[0])[index]),
      (el.includes('strIng')) && arrIngr.push(Object.values(meals[0])[index])));
  }, []);

  console.log(arrIngr);
  console.log(ingredients);
  const mount = arrIngr.forEach((el, index) => {`strIngredient${index}`: });

  useEffect(() => {
    // setIngredients((prev) => (
    //   [{ ...prev, ingrediente: el }])));
  }, []);

  return (
    <>
      <h1>Componente Recepies Progress</h1>
      {
        meals.map((el) => (
          <div key={ el.idMeal }>
            <h3 data-testid="recipe-title">{ el.strMeal }</h3>
            <img
              src={ el.strMealThumb }
              alt={ el.strMeal }
              data-testid="recipe-photo"
              className="comida"
            />
            <button type="button" data-testid="share-btn">Compartilhar</button>
            <button type="button" data-testid="favorite-btn">Favoritar</button>
            <p data-testid="recipe-category">{ el.strCategory }</p>
            {/* <ul data-testid="index-ingredient-step">
              Ingredientes:
              <li data-testid="index-ingredient-step">{ strIngredient }</li>
            </ul> */}
            <p data-testid="instructions">{ el.strInstructions }</p>
            <button
              type="button"
              data-testid="finish-recipe-btn"
            >
              Finalizar Receita

            </button>
          </div>
        ))
      }
    </>
  );
}

export default RecipeInProgress;
