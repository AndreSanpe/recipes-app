import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromFoodsName } from '../services/fetchSearchBar';
import fetchFoodCategories from '../services/fetchCategories';

function Recipes() {
  const {
    states: { meals, foodCategories, nameButton },
    functions: { setMeals, setFoodCategories, filterBtnFood, allBtnFilter },
  } = useContext(context);

  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;
  const btnClassUnselected = 'p-2 mr-1 rounded-md text-xs shadow-md';
  const btnClassSelected = `p-2 mr-1 rounded-md text-xs 
  shadow-md bg-orange-500 text-white -translate-y-3 font-bold`;
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
         bg-white drop-shadow-md w-screen z-10"
        >
          {foodCategories
            && (
              <button
                className={ `${nameButton === 'All'
                  ? (btnClassSelected)
                  : (btnClassUnselected)}` }
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
                className={ `${nameButton === category.strCategory
                  ? (btnClassSelected)
                  : (btnClassUnselected)}` }
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
        <section className="mt-8 flex flex-wrap justify-evenly mb-20">
          {meals
            && (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <div className="relative z-0">
                  <Link to={ `/foods/${meals[index].idMeal}` }>
                    <div
                    // className="shadow-md py-3 px-2 rounded-md mb-4 bg-slate-50"
                      className="my-6 z-0"
                      key={ el.idMeal }
                      data-testid={ `${index}-recipe-card` }
                    >

                      <img
                        className="rounded-md  w-36"
                        src={ el.strMealThumb }
                        alt={ el.strMeal }
                        data-testid={ `${index}-card-img` }
                      />

                      <div
                        className="absolute bottom-2 bg-white/75 w-36 pb-4
                      flex flex-column"
                      >
                        <span
                          className="font-bold text-stone-800 pl-2"
                          data-testid={ `${index}-card-name` }
                        >
                          { el.strMeal }
                        </span>

                        <span
                          className="font-normal text-stone-600 pl-2"
                          data-testid={ `${index}-card-name` }
                        >
                          { el.strArea}
                        </span>
                      </div>

                    </div>
                  </Link>
                </div>
              )
            )))}
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
