import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';

function Drinks() {
  const {
    states: { drinks },
  } = useContext(context);
  const MAX_CARDS = 12;

  return (
    <>
      <Header />
      <h1>página principal drinks</h1>
      <main>
        {!drinks
         && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
        {drinks && (drinks.length === 1
          ? (<Redirect to={ `/drinks/${drinks[0].idDrink}` } />)
          : (
            (drinks.map((el, index) => (
              index < MAX_CARDS
              && (
                <div key={ el.idDrink } data-testid={ `${el.idDrink}-recipe-card` }>
                  <span data-testid={ `${el.idDrink}-card-name` }>
                    { el.strDrink }
                  </span>
                  <img
                    src={ el.strDrinkThumb }
                    alt={ el.strDrink }
                    data-testid={ `${el.idDrink}-card-img` }
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
