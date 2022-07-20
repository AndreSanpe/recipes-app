import React, { useContext, useState } from 'react';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import context from '../context/context';

function DoneRecipes() {
  const [dontShowFoods, setDontShowFoods] = useState(false);
  const [dontShowDrinks, setDontShowDrinks] = useState(false);
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
  };

  const showOnlyFoods = () => {
    setDontShowFoods(false);
    setDontShowDrinks(true);
  };

  const showOnlyDrinks = () => {
    setDontShowFoods(true);
    setDontShowDrinks(false);
  };

  const showAll = () => {
    setDontShowFoods(false);
    setDontShowDrinks(false);
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
          {!dontShowFoods && doneRecipes.map((el, index) => (
            el.type === 'food' && (
              <div key={ el.name }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt="receipt-card"
                  src={ el.image }
                />
                <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {el.category}
                  <br />
                  {el.nationality}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share icon"
                  onClick={ copyLink }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
                <p data-testid={ `${index}-${el.tagName}-horizontal-tag` }>
                  {el.tags[0]}
                  {el.tags[1]}
                </p>
              </div>)
          ))}
          {!dontShowDrinks && doneRecipes.map((el, index) => (
            el.type === 'drink' && (
              <div key={ el.name }>
                <img
                  data-testid={ `${index}-horizontal-image` }
                  alt="receipt-card"
                  src={ el.image }
                />
                <p data-testid={ `${index}-horizontal-name` }>{el.name}</p>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {el.alcoholicOrNot}
                </p>
                <p data-testid={ `${index}-horizontal-done-date` }>{el.doneDate}</p>
                <input
                  type="image"
                  src={ shareIcon }
                  alt="share icon"
                  onClick={ copyLink }
                  data-testid={ `${index}-horizontal-share-btn` }
                />
              </div>
            )
          ))}
        </>)}

    </div>
  );
}

export default DoneRecipes;
