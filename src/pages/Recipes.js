import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromFoodsName } from '../services';
// import { Link } from 'react-router-dom';

function Recipes() {
  const {
    states: { meals, foodCategories }, functions: { setMeals },
  } = useContext(context);

  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    async function startMeal() {
      console.log(setMeals);
      setMeals(await fromFoodsName());
    }
    startMeal();
  }, []);

  return (
    <>
      <Header />
      <h1>página principal de receitas</h1>
      <main>
        {foodCategories && foodCategories.map((category, index) => (
          index < MAX_CATEGORIES && (
            <button
              type="button"
              key={ index }
              data-testid={ `${category.strCategory}-category-filter` }
            >
              {category.strCategory}
            </button>
          )
        ))}
        {meals && (meals.length === 1
          ? (<Redirect to={ `/foods/${meals[0].idMeal}` } />)
          : (
            (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <div key={ el.idMeal } data-testid={ `${index}-recipe-card` }>
                  <span data-testid={ `${index}-card-name` }>
                    { el.strMeal }
                  </span>
                  <img
                    src={ el.strMealThumb }
                    alt={ el.strMeal }
                    data-testid={ `${index}-card-img` }
                  />
                </div>
              )
            )))
          ))}
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
