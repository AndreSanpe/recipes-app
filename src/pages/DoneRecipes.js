import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
// import context from '../context/context';

function DoneRecipes() {
  const history = useHistory();
  const unselectedStyle = 'bg-slate-100 p-2 mr-2 rounded-md text-xs shadow-md w-24';
  const selectedStyle = 'bg-orange-500 p-2 mr-2 rounded-md text-xs shadow-md w-24';
  const [isLinkCopied, setIsLinkCopied] = useState();
  const [typeOfRecipe, setTypeOfRecipe] = useState('');
  const [allStyle, setAllStyle] = useState(unselectedStyle);
  const [foodsStyle, setFoodsStyle] = useState(unselectedStyle);
  const [drinksStyle, setDrinkStyle] = useState(unselectedStyle);
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
      image:
        'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    },
    // {
    //   id: '178319',
    //   type: 'drink',
    //   nationality: '',
    //   category: 'Cocktail',
    //   alcoholicOrNot: 'Alcoholic',
    //   name: 'Aquamarine',
    //   image:
    //     'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    //   doneDate: '23/06/2020',
    //   tags: [],
    // },
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
    setFoodsStyle(selectedStyle);
    setAllStyle(unselectedStyle);
    setDrinkStyle(unselectedStyle);
  };

  const showOnlyDrinks = () => {
    // setDontShowFoods(true);
    // setDontShowDrinks(false);
    setTypeOfRecipe('drink');
    setFoodsStyle(unselectedStyle);
    setAllStyle(unselectedStyle);
    setDrinkStyle(selectedStyle);
  };

  const showAll = () => {
    // setDontShowFoods(false);
    // setDontShowDrinks(false);
    setTypeOfRecipe('');
    setFoodsStyle(unselectedStyle);
    setAllStyle(selectedStyle);
    setDrinkStyle(unselectedStyle);
  };

  return (
    <div className="font-sans">
      <Header />
      <div
        className="flex justify-evenly top-0 py-3 px-2 justify-center
         bg-white drop-shadow-md w-screen z-10 mb-8"
      >
        <button
          onClick={ showAll }
          type="button"
          data-testid="filter-by-all-btn"
          className={ allStyle }
        >
          All
        </button>
        <button
          onClick={ showOnlyFoods }
          type="button"
          data-testid="filter-by-food-btn"
          className={ foodsStyle }
        >
          Food
        </button>
        <button
          onClick={ showOnlyDrinks }
          type="button"
          data-testid="filter-by-drink-btn"
          className={ drinksStyle }
        >
          Drinks
        </button>
      </div>
      <section>
        {doneRecipes.length && (
          <>
            {doneRecipes
              .filter((i) => i.type.includes(typeOfRecipe))
              .map((el, index) => (el.type === 'food' ? (
                <div
                  className="flex m-2 p-2
                  rounded-md border-2 border-inherit drop-shadow-2xl"
                  key={ el.name }
                >
                  <div className="w-1/2">
                    <input
                      className="rounded-md  w-36 h-36"
                      // style={ { width: '100px' } }
                      type="image"
                      src={ el.image }
                      alt="receipt-card"
                      onClick={ () => history.push(`/foods/${el.id}`) }
                      data-testid={ `${index}-horizontal-image` }
                    />
                  </div>
                  <div className="ml-2 h-36">
                    <p
                      className="font-bold text-stone-800 text-xl m-0"
                      data-testid={ `${index}-horizontal-name` }
                    >
                      {el.name}
                    </p>

                    <span
                      className="font-normal text-stone-600 "
                      data-testid={ `${index}-horizontal-top-text` }
                    >
                      {`${el.nationality} - ${el.category}`}
                    </span>

                    <p
                      className="font-normal text-stone-600"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {el.doneDate}
                    </p>

                    <div className="flex justify-between">
                      <div className="flex  justify-start w-20">
                        <p
                          className="font-normal text-stone-600 m-0"
                          data-testid={ `${index}-${el.tags[0]}-horizontal-tag` }
                        >
                          {el.tags[0]}
                        </p>
                        <p
                          className="font-normal text-stone-600 pl-2 m-0"
                          data-testid={ `${index}-${el.tags[1]}-horizontal-tag` }
                        >
                          {el.tags[1]}
                        </p>
                      </div>

                      <div className="relative -top-2 right- w-10">
                        <input
                          style={ { width: '26px' } }
                          type="image"
                          src={ shareIcon }
                          alt="share icon"
                          onClick={ () => copyLink(`http://localhost:3000/foods/${el.id}`) }
                          data-testid={ `${index}-horizontal-share-btn` }
                        />
                        {isLinkCopied && <p>Link copied!</p>}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex border-2 border-blue-500 m-2 p-2"
                  key={ el.name }
                >
                  <Link to={ `/drinks/${el.id}` }>
                    <div className="my-6 z-0">
                      <img
                        className="rounded-md  w-36"
                        style={ { width: '100px' } }
                        type="image"
                        src={ el.image }
                        alt="receipt-card"
                        // onClick={ () => history.push(`/drinks/${el.id}`) }
                        data-testid={ `${index}-horizontal-image` }
                      />
                      <div
                        className="absolute bottom-2 bg-white/75 w-36 pb-4
                      flex flex-column"
                      >
                        <span
                          className="font-bold text-stone-800 pl-2"
                          data-testid={ `${index}-horizontal-name` }
                        >
                          {el.name}
                        </span>
                        <span
                          className="font-normal text-stone-600 pl-2"
                          data-testid={ `${index}-horizontal-top-text` }
                        >
                          {el.alcoholicOrNot}
                        </span>
                      </div>
                      <p
                        className="font-normal text-stone-600 pl-2"
                        data-testid={ `${index}-horizontal-done-date` }
                      >
                        {el.doneDate}
                      </p>
                      <input
                        style={ { width: '26px' } }
                        type="image"
                        src={ shareIcon }
                        alt="share icon"
                        onClick={ () => copyLink(`http://localhost:3000/drinks/${el.id}`) }
                        data-testid={ `${index}-horizontal-share-btn` }
                      />
                      {isLinkCopied && <p>Link copied!</p>}
                    </div>
                  </Link>

                </div>
              )))}
          </>
        )}
      </section>
      <Footer />
    </div>
  );
}

export default DoneRecipes;
