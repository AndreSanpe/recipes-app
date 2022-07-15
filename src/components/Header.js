import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';

function Header() {
  const location = useLocation();
  // const [usesHeader, setUsesHeader] = useState(false);
  const [usesSearchIcon, setUsesSearchIcon] = useState(false);
  const [title, setTitle] = useState('');

  // if (location.pathname === '/foods') {
  //   // setUsesHeader(true);
  //   setUsesSearchIcon(true);
  //   setTitle('Foods');
  // } if (location.pathname === '/drinks') {
  //   // setUsesHeader(true);
  //   setUsesSearchIcon(true);
  //   setTitle('Drinks');
  // } if (location.pathname === '/profile') {
  //   // setUsesHeader(true);
  //   setTitle('Profile');
  // } if (location.pathname === '/done-recipes') {
  //   // setUsesHeader(true);
  //   setTitle('Done Recipes');
  // } if (location.pathname === '/favorite-recipes') {
  //   // setUsesHeader(true);
  //   setTitle('Favorite Recipes');
  // }
  // console.log(location);
  return (
    <div>
      <p>Header</p>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      {/* <button type="button" onClick={ history.push('/profile') }>Perfil</button> */}
      {usesSearchIcon
      && (
        <div>
          <img
            data-testid="search-top-btn"
            src="src/images/searchIcon.svg"
            alt="search icon"
          />
          <SearchBar />
        </div>
      )}
      {/* {title && <h2 data-testid="page-title">{title}</h2>} */}
    </div>
  );
}

export default Header;
