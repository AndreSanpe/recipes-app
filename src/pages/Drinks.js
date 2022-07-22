import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import context from '../context/context';
import Footer from '../components/Footer';
import { fromDrinksName } from '../services';
import { fetchDrinkCategories } from '../services/fetchCategories';

function Drinks() {
  // const [toggle, setToggle] = useState(false);
  // const [nameButton, setNameButton] = useState('');
  // const [singleResult, setSingleResult] = useState(false);

  const {
    states: { drinks, drinkCategories },
    functions: { setDrinks, setDrinkCategories, filterBtnDrink, allBtnFilterDrinks },
  } = useContext(context);
  const MAX_CARDS = 12;
  const MAX_CATEGORIES = 5;

  useEffect(() => {
    async function startDrinks() {
      setDrinks(await fromDrinksName(''));
      setDrinkCategories(await fetchDrinkCategories());
    }
    startDrinks();
  }, []);

  return (
    <>
      <Header />
      <h1>página principal drinks</h1>
      <main>
        <div>
          {drinkCategories && drinkCategories.map((category, index) => (
            index < MAX_CATEGORIES && (
            // button que filtra por categorias
              <button
                type="button"
                key={ index }
                data-testid={ `${category.strCategory}-category-filter` }
                onClick={ filterBtnDrink }
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
                onClick={ allBtnFilterDrinks }
              >
                All
              </button>
            )}
        </div>

        {
          drinks && (drinks.map((el, index) => (
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
        }
      </main>
      <Footer />
    </>
  );
}

export default Drinks;
