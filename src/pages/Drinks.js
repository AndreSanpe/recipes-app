import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromDrinksName } from '../services/fetchSearchBar';
import { fetchDrinkCategories } from '../services/fetchCategories';

function Drinks() {
  const {
    states: { drinks, drinkCategories, nameButton },
    functions: { setDrinks, setDrinkCategories, filterBtnDrink, allBtnFilterDrinks },
  } = useContext(context);
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;
  const btnClassUnselected = 'p-2 mr-1 rounded-md text-xs shadow-md';
  const btnClassSelected = `p-2 mr-1 rounded-md text-xs 
  shadow-md bg-orange-500 text-white -translate-y-3 font-bold`;

  useEffect(() => {
    async function startDrinks() {
      setDrinks(await fromDrinksName(''));
      setDrinkCategories(await fetchDrinkCategories());
    }
    startDrinks();
  }, [setDrinks, setDrinkCategories]);

  return (
    <>
      <Header />
      <main className="font-sans">
        <div
          className="flex justify-between sticky top-0 py-3 px-2
         bg-white drop-shadow-md w-screen z-10"
        >
          {drinkCategories
          && (
            <button
              className={ `${nameButton === 'All'
                ? (btnClassSelected)
                : (btnClassUnselected)}` }
              type="button"
              data-testid="All-category-filter"
              onClick={ allBtnFilterDrinks }
            >
              All
            </button>
          )}

          {drinkCategories && drinkCategories.map((category, index) => (
            index < MAX_CATEGORIES && (
            // button que filtra por categorias
              <button
                className={ `${nameButton === category.strCategory
                  ? (btnClassSelected)
                  : (btnClassUnselected)}` }
                type="button"
                name={ category.strCategory }
                key={ index }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ filterBtnDrink }
              >
                {`${category.strCategory === 'Ordinary Drink' ? 'Drinks'
                  : category.strCategory}`}
              </button>
            )
          ))}
        </div>
        <section className="mt-8 flex flex-wrap justify-evenly mb-20">
          { drinks && (drinks.map((el, index) => (
            index < MAX_CARDS
              && (
                <div className="relative z-0">
                  <Link to={ `/drinks/${drinks[index].idDrink}` }>
                    <div
                      className="my-6 z-0"
                      key={ el.idDrink }
                      data-testid={ `${index}-recipe-card` }
                    >
                      {/* <span data-testid={ `${index}-card-name` }>
                      { el.strDrink }
                    </span> */}
                      <img
                        className="rounded-md  w-36"
                        src={ el.strDrinkThumb }
                        alt={ el.strDrink }
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
                          { el.strDrink }
                        </span>

                        <span
                          className="font-normal text-stone-600 pl-2"
                          data-testid={ `${index}-card-name` }
                        >
                          { el.strArea }
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

export default Drinks;
