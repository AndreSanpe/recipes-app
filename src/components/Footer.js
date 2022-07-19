import React from 'react';
import { Link } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

// deve ser renderizado nas páginas food, drink e profile;

function Footer() {
  return (
    <div className="footer" data-testid="footer">
      <h3>Footer</h3>
      <Link to="/drinks">
        <img src={ drinkIcon } alt="drink icon" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/foods">
        <img src={ mealIcon } alt="meal icon" data-testid="food-bottom-btn" />
      </Link>
    </div>
  );
}

export default Footer;
