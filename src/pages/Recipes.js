import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';

function Recipes() {
  const {
    states: { meals },
  } = useContext(context);

  const MAX_CARDS = 12;

  console.log(meals);

  return (
    <>
      <Header />
      <h1>página principal de receitas</h1>
      <main>
        {!meals
         && global.alert('Sorry, we haven\'t found any recipes for these filters.')}
        {meals && (meals.length === 1
          ? (<Redirect to={ `/foods/${meals[0].idMeal}` } />)
          : (
            (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <div key={ el.idMeal } data-testid={ `${el.idMeal}-recipe-card` }>
                  <span data-testid={ `${el.idMeal}-card-name` }>
                    { el.strMeal }
                  </span>
                  <img
                    src={ el.strMealThumb }
                    alt={ el.strMeal }
                    data-testid={ `${el.idMeal}-card-img` }
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
