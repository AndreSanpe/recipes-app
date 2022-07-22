import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import context from '../context/context';

function DoneRecipes() {
  const [isLinkCopied, setIsLinkCopied] = useState();
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const history = useHistory();
  // const {
  //   states: { meals, drinks },
  // } = useContext(context);

  const doneRecipes = [
    {
      id: '52771',
      type: 'food',
      nationality: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    {
      id: '178319',
      type: 'drink',
      nationality: '',
      category: 'Cocktail',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      doneDate: '23/06/2020',
      tags: [],
    },
  ];

  // console.log(meals);

  const copyLink = (link) => {
    navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
    // fonte: https://developer.mozilla.org/en-US/docs/Web/API/Clipboard/writeText
  };

  const showOnlyFoods = () => {
    // setDontShowFoods(false);
    // setDontShowDrinks(true);
    setTypeOfRecipe('food');
  };

  const showOnlyDrinks = () => {
    // setDontShowFoods(true);
    // setDontShowDrinks(false);
    setTypeOfRecipe('drink');
  };

  const showAll = () => {
    // setDontShowFoods(false);
    // setDontShowDrinks(false);
    setTypeOfRecipe('');
  };

  return (
    <div>
      <Header />
      <button onClick={ showAll } type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button
        onClick={ showOnlyFoods }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        onClick={ showOnlyDrinks }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      {doneRecipes.length
      && (
        <>
          {doneRecipes
            .filter((i) => i.type.includes(typeOfRecipe))
            .map((el, index) => (el.type === 'food'
              ? (
                <div key={ el.name }>
                  <input
                    style={ { width: '100px' } }
                    type="image"
                    src={ el.image }
                    alt="receipt-card"
                    onClick={ () => history.push(`/foods/${el.id}`) }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <Link to={ `/foods/${el.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {`${el.nationality} - ${el.category}`}
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
                  <input
                    type="image"
                    src={ shareIcon }
                    alt="share icon"
                    onClick={ () => copyLink(`http://localhost:3000/foods/${el.id}`) }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {isLinkCopied && <p>Link copied!</p>}
                  <p data-testid={ `${index}-${el.tags[0]}-horizontal-tag` }>
                    {el.tags[0]}
                  </p>
                  <p data-testid={ `${index}-${el.tags[1]}-horizontal-tag` }>
                    {el.tags[1]}
                  </p>
                </div>
              ) : (
                <div key={ el.name }>
                  <input
                    style={ { width: '100px' } }
                    type="image"
                    src={ el.image }
                    alt="receipt-card"
                    onClick={ () => history.push(`/drinks/${el.id}`) }
                    data-testid={ `${index}-horizontal-image` }
                  />
                  <Link to={ `/drinks/${el.id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
                  </Link>
                  <p data-testid={ `${index}-horizontal-top-text` }>
                    {el.alcoholicOrNot}
                  </p>
                  <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
                  <input
                    type="image"
                    src={ shareIcon }
                    alt="share icon"
                    onClick={ () => copyLink(`http://localhost:3000/drinks/${el.id}`) }
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                  {isLinkCopied && <p>Link copied!</p>}
                </div>
              )))}
          {/* {console.log(doneRecipes)}
          {!dontShowDrinks && doneRecipes
            .filter((i) => i.type === 'drink')
            .map((el, index) => (

            ))} */}
        </>
      )}
    </div>
  );
}

export default DoneRecipes;
