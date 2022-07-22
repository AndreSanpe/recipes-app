import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

function IngredientInput({ srcRecipe, setBtnDisabled }) {
  const [inProgressRecipes, setInProgressRecipes] = useState({});
  const [validateBtn, setValidateBtn] = useState([]);

  const ingredientList = Object.entries(srcRecipe[0])
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
    setValidateBtn((prev) => (
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
    console.log(validateBtn);
  }, [inProgressRecipes]);

  // console.log(b);

  // console.log(inProgressRecipes);
  // useEffect(() => {
  //   ingredientList.forEach((el) => {
  //     const isChecked = inProgressRecipes[`${el[1]}`] || false;
  //     const a = isChecked === true;
  //     console.log(a.length);
  //     return isChecked;
  //   });
  //   const numOfChecked = Object.values(validateBtn)
  //     .filter((el) => ((el === true)));
  //   if (ingredientList.length === numOfChecked.length) {
  //     setBtnDisabled(false);
  //   } else { setBtnDisabled(true); }
  // }, [inProgressRecipes]);

  const toggleButton = () => {
    ingredientList.forEach((el) => {
      const numOfChecked = Object.values(validateBtn)
        .filter((it) => ((it === true)));
      const nameIng = Object.keys(inProgressRecipes)
        .filter((element) => (element.includes(ingredientList)));
      console.log(nameIng);
      console.log(el[1]);
      if (ingredientList.length === numOfChecked.length
      && nameIng.includes) {
        setBtnDisabled(false);
      } else { setBtnDisabled(true); }
    });
  };

  return (
    <div>
      {
        ingredientList.map((ing, index) => {
          const isChecked = inProgressRecipes[`${ing[1]}`] || false;
          // setBtnDisabled(!isChecked);
          toggleButton();
          return (
            <label
              style={ { display: 'block' } }
              key={ index }
              htmlFor={ `${index}-ingredient-step` }
              data-testid={ `${index}-ingredient-step` }
            >
              <input
                name={ `${ing[1]}` }
                id={ `${index}-ingredient-step` }
                type="checkbox"
                checked={ isChecked }
                onChange={ ({ target }) => handleChange(target) }
              />
              {
                inProgressRecipes[`${ing[1]}`]
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
  srcRecipe: PropTypes.arrayOf(
    PropTypes.shape({}).isRequired,
  ).isRequired,
  setBtnDisabled: PropTypes.func.isRequired,
};

export default IngredientInput;
