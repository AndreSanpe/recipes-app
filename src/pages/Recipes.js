import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromFoodsName } from '../services';
import fetchFoodCategories, { handleFoodsFilter } from '../services/fetchCategories';
// import { Link } from 'react-router-dom';

function Recipes() {
  const [loading, setLoading] = useState(true);
  const {
    states: { meals, foodCategories },
    functions: { setMeals, setFoodCategories },
  } = useContext(context);

  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    async function startMeal() {
      setMeals(await fromFoodsName(''));
      setFoodCategories(await fetchFoodCategories());
      setLoading(false);
    }
    startMeal();
  }, []);

  return (
    <>
      <Header />
      <h1>página principal de receitas</h1>
      <main>
        {loading ? (
          <div>
            <h3>Carregando...</h3>
          </div>
        ) : (
          <div>
            {foodCategories && foodCategories.map((category, index) => (
              index < MAX_CATEGORIES && (
              // button que filtra por categorias
                <button
                  type="button"
                  key={ index }
                  data-testid={ `${category.strCategory}-category-filter` }
                  onClick={ async (e) => {
                    setMeals(await handleFoodsFilter(e));
                  } }
                >
                  {category.strCategory}
                </button>
              )
            ))}
            {foodCategories
        && <button type="button" data-testid="All-category-filter">All</button>}
          </div>
        ) }

        {meals && (meals.length === 1
          ? (<Redirect to={ `/foods/${meals[0].idMeal}` } />)
          : (
            (meals.map((el, index) => (
              index < MAX_CARDS
              && (
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
              )
            )))
          ))}
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
