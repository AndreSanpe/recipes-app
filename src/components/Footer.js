import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// deve ser renderizado nas páginas food, drink e profile;
// const [selected, setSelected] = useState();

function Footer() {
  const history = useHistory();
  const [drinksClass, setDrinksClass] = useState(false);
  const [foodsClass, setFoodsClass] = useState(false);
  const [profileClass, setProfile] = useState(false);
  const [favoriteClass, setFavoriteClass] = useState(false);
  const btnClassUnselected = `material-symbols-outlined 
  text-stone-800 text-3xl font-light`;
  const btnClassSelected = `material-symbols-outlined 
  text-stone-800 text-3xl font-light text-orange-600 font-bold active:mb-2`;

  useEffect(() => {
    if (history.location.pathname === '/drinks') {
      setDrinksClass(true);
    }
    if (history.location.pathname === '/foods') {
      setFoodsClass(true);
    }
    if (history.location.pathname === '/profile') {
      setProfile(true);
    }
    if (history.location.pathname === '/favorite-recipes') {
      setFavoriteClass(true);
    }
  }, []);

  return (
    <div
      className="footer flex justify-around py-2
      fixed bottom-0 bg-white w-screen drop-shadow-2xl z-10"
      data-testid="footer"
    >
      <Link to="/foods">
        <span
          className={ `${foodsClass
            ? (btnClassSelected)
            : (btnClassUnselected)}` }
        >
          restaurant
        </span>
      </Link>
      <Link to="/drinks">
        <span
          className={ `${drinksClass
            ? (btnClassSelected)
            : (btnClassUnselected)}` }
        >
          local_bar
        </span>
      </Link>
      <Link to="/favorite-recipes">
        <span
          className={ `${favoriteClass
            ? (btnClassSelected)
            : (btnClassUnselected)}` }
        >
          favorite
        </span>
      </Link>
      <Link to="/profile">
        <span
          className={ `${profileClass
            ? (btnClassSelected)
            : (btnClassUnselected)}` }
        >
          account_circle
        </span>
      </Link>
      <Link to="/foods">
        <img
          className="w-10 my-1"
          alt="logo trybe cook"
          src="https://user-images.githubusercontent.com/95686401/180876245-922933e5-bddf-4cb1-ad82-699906bdb89d.png"
        />
      </Link>
    </div>
  );
}

export default Footer;
