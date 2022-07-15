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
  const [showSearchBar, setShowSearchBar] = useState();
  const [searchBarTextState, setSearchBarTextState] = useState();
  const [title, setTitle] = useState('');

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

  useEffect(() => {
    const searchBarText = () => {
      if (showSearchBar) {
        return setSearchBarTextState('Esconder barra de pesquisa');
      }
      return setSearchBarTextState('Mostrar barra de pesquisa');
    };
    searchBarText();
    // console.log('entrou');
  }, [showSearchBar]);

  const turnOnSearchBar = () => {
    if (showSearchBar) {
      return setShowSearchBar(false);
    }
    return setShowSearchBar(true);
  };

  // console.log(location);
  return (
    <div>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="profile" />
      <button type="button" onClick={ () => history.push('/profile') }>Perfil</button>
      {usesSearchIcon
      && (
        <div>
          <img
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="search icon"
          />
          <button
            type="button"
            onClick={ turnOnSearchBar }
          >
            {searchBarTextState}
          </button>
          {showSearchBar && <SearchBar />}
        </div>
      )}
      {title && <h2 data-testid="page-title">{title}</h2>}
    </div>
  );
}

export default Header;
