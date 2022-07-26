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
          <li
            key={ index }
            data-testid={ `${index}-ingredient-name-and-measure` }
          >
            { mesurementList[index]
              ? (` 🔸  ${ing[1]} - ${mesurementList[index][1]}`)
              : (` 🔸  ${ing[1]}`)}
          </li>
        ))

      }
    </ul>
  );
}

export default IngredientList;
