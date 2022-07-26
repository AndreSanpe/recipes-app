/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
// import profileIcon from '../images/profileIcon.svg';
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

  // const handleSearchBar = () => {
  //   if (showSearchBar === false) {
  //     setShowSearchBar(true);
  //   } else { setShowSearchBar(false); }
  // };

  return (
    <section className="py-2 px-2 bg-slate-100 font-sans">
      <div className="flex justify-around">
        {/* <input
          className="w-4"
          type="image"
          src={ searchIcon }
          alt="search icon"
          onClick={ handleSearchBar }
          data-testid="search-top-btn"
        /> */}
        <SearchBar />
      </div>
      {/* {title && <h2 data-testid="page-title">{title}</h2>} */}
    </section>
  );
}

export default Header;
