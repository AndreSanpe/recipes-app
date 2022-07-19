import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';

function Drinks() {
  const {
    states: { drinks, drinkCategories },
  } = useContext(context);
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  return (
    <>
      <Header />
      <h1>página principal drinks</h1>
      <main>
        {drinkCategories && drinkCategories.map((category, index) => (
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
