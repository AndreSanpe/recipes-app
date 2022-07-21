import React, { useContext } from 'react';
import context from '../context/context';

function IngredientList() {
  const { states: { recipeDetail } } = useContext(context);

  const ingredientList = Object.entries(recipeDetail.recipe).filter((key) => key[0]
    .includes('strIngredient')).filter((ing) => ing[1] !== null && ing[1] !== '');

  const mesurementList = Object.entries(recipeDetail.recipe).filter((key) => key[0]
    .includes('trMeasure')).filter((mes) => mes[1] !== null && mes[1] !== '');

  return (
    <ul>
      {
        ingredientList.map((ing, index) => (
          <p
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            {` 👉 ${ing[1]} - ${mesurementList[index][1]}`}
          </p>
        ))

      }
    </ul>
  );
}

export default IngredientList;
