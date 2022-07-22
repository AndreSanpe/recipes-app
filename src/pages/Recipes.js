import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromFoodsName } from '../services';
import fetchFoodCategories from '../services/fetchCategories';

function Recipes() {
  const {
    states: { meals, foodCategories },
    functions: { setMeals, setFoodCategories, filterBtnFood, allBtnFilter },
  } = useContext(context);

  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    async function startMeal() {
      setMeals(await fromFoodsName(''));
      setFoodCategories(await fetchFoodCategories());
    }
    startMeal();
  }, [setFoodCategories, setMeals]);

  return (
    <>
      <Header />
      <h1>página principal de receitas</h1>
      <main>
        <div>
          {foodCategories && foodCategories.map((category, index) => (
            index < MAX_CATEGORIES && (
              // button que filtra por categorias
              <button
                type="button"
                key={ `${index}${category.strCategory}` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ filterBtnFood }
              >
                {category.strCategory}
              </button>
            )
          ))}
          {foodCategories
            && (
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ allBtnFilter }
              >
                All
              </button>
            )}
        </div>
        {meals
            && (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <Link to={ `/foods/${meals[index].idMeal}` }>
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
                </Link>
              )
            )))}
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
