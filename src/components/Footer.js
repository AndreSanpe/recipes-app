import React from 'react';
import { Link } from 'react-router-dom';

// deve ser renderizado nas páginas food, drink e profile;

function Footer() {
  return (
    <div
      className="footer flex justify-around py-2
      sticky bottom-0 bg-white w-screen drop-shadow-2xl"
      data-testid="footer"
    >
      <Link to="/drinks">
        <span className="material-symbols-outlined text-stone-800 text-3xl font-light">
          local_bar
        </span>
      </Link>
      <Link to="/foods">
        <span className="material-symbols-outlined text-stone-800 text-3xl font-light">
          restaurant
        </span>
      </Link>
      <Link to="/favorite-recipes">
        <span className="material-symbols-outlined text-stone-800 text-3xl font-light">
          favorite
        </span>
      </Link>
      <Link to="/profile">
        <span className="material-symbols-outlined text-stone-800 text-3xl font-light">
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
