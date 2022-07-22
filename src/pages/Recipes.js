import React, { useContext, useEffect, useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
// import { Link } from 'react-router-dom';
import { fromFoodsName } from '../services/fetchSearchBar';
import fetchFoodCategories, { handleFoodsFilter } from '../services/fetchCategories';

function Recipes() {
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const [nameButton, setNameButton] = useState('');
  const [singleResult, setSingleResult] = useState(false);
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
                    setNameButton(e.target.textContent);
                    setMeals(await handleFoodsFilter(e));
                    if (toggle && e.target.textContent === nameButton) {
                      setMeals(await fromFoodsName(''));
                    }
                    if (meals.length === 1) {
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
            {foodCategories
        && (
          <button
            type="button"
            data-testid="All-category-filter"
            onClick={ async () => setMeals(await fromFoodsName('')) }
          >
            All
          </button>
        )}
          </div>
        ) }
        {meals && ((meals.length === 1 || singleResult)
          ? (<Redirect to={ `/foods/${meals[0].idMeal}` } />)
          : (
            (meals.map((el, index) => (
              index < MAX_CARDS
              && (
                <Link to={ `/foods/${meals[index].idMeal}` }>
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
                </Link>
              )
            )))
          ))}
      </main>
      <Footer />
    </>
  );
}

export default Recipes;
