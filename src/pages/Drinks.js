import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromDrinksName } from '../services';
import { fetchDrinkCategories, handleDrinksFilter } from '../services/fetchCategories';

function Drinks() {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);

  const {
    states: { drinks, drinkCategories }, functions: { setDrinks, setDrinkCategories },
  } = useContext(context);
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    async function startDrinks() {
      setDrinks(await fromDrinksName(''));
      setDrinkCategories(await fetchDrinkCategories());
      setLoading(false);
    }
    startDrinks();
  }, []);

  return (
    <>
      <Header />
      <h1>página principal drinks</h1>
      <main>
        {loading ? (
          <div>
            <h3>Carregando...</h3>
          </div>
        )
          : (
            <div>
              {drinkCategories && drinkCategories.map((category, index) => (
                index < MAX_CATEGORIES && (
                // button que filtra por categorias
                  <button
                    type="button"
                    key={ index }
                    data-testid={ `${category.strCategory}-category-filter` }
                    onClick={ async (e) => {
                      setDrinks(await handleDrinksFilter(e));
                      if (!loading && toggle) {
                        setDrinks(await fromDrinksName(''));
                      }
                      setToggle(!toggle);
                    } }
                  >
                    {category.strCategory}
                  </button>
                )
              ))}
              {drinkCategories
        && <button type="button" data-testid="All-category-filter">All</button>}
            </div>
          )}

        {drinks && (drinks.length === 1
          ? (<Redirect to={ `/drinks/${drinks[0].idDrink}` } />)
          : (
            (drinks.map((el, index) => (
              index < MAX_CARDS
              && (
                <div key={ el.idDrink } data-testid={ `${index}-recipe-card` }>
                  <span data-testid={ `${index}-card-name` }>
                    { el.strDrink }
                  </span>
                  <img
                    src={ el.strDrinkThumb }
                    alt={ el.strDrink }
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

export default Drinks;
