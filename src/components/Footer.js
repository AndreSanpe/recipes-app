import React from 'react';
import { Link } from 'react-router-dom';

// deve ser renderizado nas páginas food, drink e profile;

function Footer() {
  return (
    <div
      className="footer flex justify-around py-2
      fixed bottom-0 bg-white w-screen drop-shadow-2xl"
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
    </div>
  );
}

export default Footer;
