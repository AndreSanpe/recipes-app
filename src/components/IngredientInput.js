import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientInput({ meals, setBtnDisabled }) {
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  const ingredientList = Object.entries(meals[0])
    .filter((key) => key[0].includes('strIngredient'))
    .filter((ing) => ing[1] !== null && ing[1] !== '');

  const handleChange = (target) => {
    const { name } = target;
    const value = target.checked;
    setInProgressRecipes((prev) => (
      {
        ...prev,
        [name]: value,
      }
    ));
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    setInProgressRecipes(data);
  }, []);

  useEffect(() => {
    const sendDataToLocalStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...inProgressRecipes }));
    };
    sendDataToLocalStorage();
  }, [inProgressRecipes]);

  useEffect(() => {
    const numOfChecked = Object.values(inProgressRecipes)
      .filter((el) => ((el === true)));
    if (ingredientList.length === numOfChecked.length) {
      setBtnDisabled(false);
    } else { setBtnDisabled(true); }
  }, [inProgressRecipes]);

  return (
    <div>
      {
        ingredientList.map((ing, index) => {
          const isChecked = inProgressRecipes[`${index}-${ing[1]}`] || false;
          return (
            <label
              style={ { display: 'block' } }
              key={ index }
              htmlFor={ `${index}-ingredient-step` }
            >
              <input
                name={ `${index}-${ing[1]}` }
                id={ `${index}-ingredient-step` }
                data-testid={ `${index}-ingredient-step` }
                type="checkbox"
                checked={ isChecked }
                onChange={ ({ target }) => handleChange(target) }
              />
              {
                inProgressRecipes[`${index}-${ing[1]}`]
                  ? <strike>{ ing[1] }</strike>
                  : <span>{ ing[1] }</span>
              }
            </label>
          );
        })
      }
    </div>
  );
}

IngredientInput.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  setBtnDisabled: PropTypes.func.isRequired,
};

export default IngredientInput;
