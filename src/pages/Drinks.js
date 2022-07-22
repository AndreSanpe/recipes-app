import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromDrinksName } from '../services/fetchSearchBar';
import { fetchDrinkCategories, handleDrinksFilter } from '../services/fetchCategories';

function Drinks() {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [nameButton, setNameButton] = useState('');
  const [singleResult, setSingleResult] = useState(false);

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
                      setNameButton(e.target.textContent);
                      setDrinks(await handleDrinksFilter(e));
                      if (toggle && e.target.textContent === nameButton) {
                        setDrinks(await fromDrinksName(''));
                      }
                      if (drinks.length === 1) {
                        setSingleResult(true);
                      }
                      setSingleResult(false);
                      setToggle(!toggle);
                    } }
                  >
                    {category.strCategory}
                  </button>
                )
              ))}
              {drinkCategories
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ async () => setDrinks(await fromDrinksName('')) }
          >
            All
          </button>
        )}
            </div>
          )}

        {drinks && ((drinks.length === 1 && singleResult)
          ? (<Redirect to={ `/drinks/${drinks[0].idDrink}` } />)
          : (
            (drinks.map((el, index) => (
              index < MAX_CARDS
              && (
                <Link to={ `/drinks/${drinks[index].idDrink}` }>
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
                </Link>
              )
            )))
          ))}
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
