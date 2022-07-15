import React from 'react';

function Card(index, url, name) {
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ url } alt={ name } />
    </div>
  );
}

export default Card;
