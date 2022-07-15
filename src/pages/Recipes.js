import React, { useContext } from 'react';
import Header from '../components/Header';
import context from '../context/context';
// import { Link } from 'react-router-dom';

function Recipes() {
  const {
    meals,
  } = useContext(context);

  return (
    <>
      <Header />
      <h1>página principal de receitas</h1>
      <main>
        { meals
        && meals.map((el) => (
          <div key={ el.idMeal }>
            <span>{ el.strMeal }</span>
            <img src={ el.strMealThumb } alt={ el.strMeal } />
          </div>
        ))}
      </main>
    </>
  );
}

export default Recipes;
