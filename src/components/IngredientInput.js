import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientInput({
  meals,
  setIsFinishButtonDisabled,
}) {
  const [inProgressRecipes, setInProgressRecipes] = useState({});

  const ingredientList = Object.entries(meals[0]).filter((key) => key[0]
    .includes('strIngredient')).filter((ing) => ing[1] !== null && ing[1] !== '');

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

  console.log(inProgressRecipes);
  // console.log(ingredientList);
  // console.log(meals);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('inProgressRecipes'));
    // console.log(data);
    // setInProgressRecipes(data);
    // document.getElementById(data).checked = inProgressRecipes.checked;
    Object.entries(data)
      .forEach((el) => (
        el.checked === true));
    //     (el[1] === true)
    //       ? (el[0].checked === true)
    //       : (el[0].checked === false)));
    // console.log(inProgressRecipes);
  }, []);

  useEffect(() => {
    const sendDataToLocalStorage = () => {
      localStorage.setItem('inProgressRecipes', JSON
        .stringify({ ...inProgressRecipes }));

      // console.log(JSON.parse(localStorage.getItem('inProgressRecipes')));
    };
    sendDataToLocalStorage();
  }, [inProgressRecipes]);

  useEffect(() => {
    const numOfChecked = Object.values(inProgressRecipes)
      .filter((el) => ((el === true)));
    if (ingredientList.length === numOfChecked.length) {
      setIsFinishButtonDisabled(false);
    } else { setIsFinishButtonDisabled(true); }
  }, [inProgressRecipes]);

  return (
    <div>
      {
        ingredientList.map((ing, index) => (
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
              checked={ inProgressRecipes.checked }
              onChange={ ({ target }) => handleChange(target) }
            />
            {
              inProgressRecipes[`${index}-${ing[1]}`]
                ? <strike>{ ing[1] }</strike>
                : <span>{ ing[1] }</span>
            }
          </label>
        ))
      }
    </div>
  );
}

IngredientInput.propTypes = {
  meals: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  setIsFinishButtonDisabled: PropTypes.func.isRequired,
};

export default IngredientInput;
