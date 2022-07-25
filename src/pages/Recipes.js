import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromFoodsName } from '../services/fetchSearchBar';
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
      <main className="font-sans">
        <div
          className="flex justify-between sticky top-0 py-3 px-2
         bg-white drop-shadow-md w-screen"
        >
          {foodCategories
            && (
              <button
                className="bg-slate-100 p-2 mr-1 rounded-md text-xs shadow-md"
                type="button"
                data-testid="All-category-filter"
                onClick={ allBtnFilter }
              >
                All
              </button>
            )}

          {foodCategories && foodCategories.map((category, index) => (
            index < MAX_CATEGORIES && (
              // button que filtra por categorias
              <button
                className="bg-slate-50 p-2 mr-1 rounded-md text-xs shadow-md"
                type="button"
                key={ `${index}${category.strCategory}` }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ filterBtnFood }
              >
                {category.strCategory}
              </button>
            )
          ))}

        </div>
        <section className="mt-8 flex flex-wrap justify-evenly">
          {meals
            && (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <Link to={ `/foods/${meals[index].idMeal}` }>
                  <div
                    className="shadow-md py-3 px-2 rounded-md mb-4 bg-slate-50"
                    key={ el.idMeal }
                    data-testid={ `${index}-recipe-card` }
                  >
                    <span
                      className="font-bold text-stone-800"
                      data-testid={ `${index}-card-name` }
                    >
                      { el.strMeal }
                    </span>
                    <img
                      className="rounded-md  w-28"
                      src={ el.strMealThumb }
                      alt={ el.strMeal }
                      data-testid={ `${index}-card-img` }
                    />
                  </div>
                </Link>
              )
            )))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
