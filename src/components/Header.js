import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const location = useLocation();
  const history = useHistory();
  // const [usesHeader, setUsesHeader] = useState(false);
  const [usesSearchIcon, setUsesSearchIcon] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [title, setTitle] = useState('Profile');

  useEffect(() => {
    const getPathname = () => {
      if (location.pathname === '/foods') {
      // setUsesHeader(true);
        setUsesSearchIcon(true);
        setTitle('Foods');
      } if (location.pathname === '/drinks') {
      // setUsesHeader(true);
        setUsesSearchIcon(true);
        setTitle('Drinks');
      } if (location.pathname === '/profile') {
      // setUsesHeader(true);
        setTitle('Profile');
      } if (location.pathname === '/done-recipes') {
      // setUsesHeader(true);
        setTitle('Done Recipes');
      } if (location.pathname === '/favorite-recipes') {
      // setUsesHeader(true);
        setTitle('Favorite Recipes');
      }
    };
    getPathname();
  }, [location.pathname]);

  const handleSearchBar = () => {
    if (showSearchBar === false) {
      setShowSearchBar(true);
    } else { setShowSearchBar(false); }
  };

  // useEffect(() => {
  //   const searchBarText = () => {
  //     if (showSearchBar) {
  //       return setSearchBarTextState('Esconder barra de pesquisa');
  //     }
  //     return setSearchBarTextState('Mostrar barra de pesquisa');
  //   };
  //   searchBarText();
  //   // console.log('entrou');
  // }, [showSearchBar]);
  return (
    <div>
      <input
        type="image"
        src={ profileIcon }
        alt="profile"
        onClick={ () => history.push('/profile') }
        data-testid="profile-top-btn"
      />
      {usesSearchIcon
      && (
        <div>
          <input
            type="image"
            src={ searchIcon }
            alt="search icon"
            onClick={ handleSearchBar }
            data-testid="search-top-btn"
          />
          {showSearchBar && <SearchBar />}
        </div>
      )}
      {title && <h2 data-testid="page-title">{title}</h2>}
    </div>
  );
}

export default Header;