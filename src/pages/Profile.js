import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  const history = useHistory();

  // chama LST
  const callEmailFromStorage = () => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      return user.email;
    }
    return '';
  };

  // handle click do logOut
  const handleClickLogout = () => {
    window.localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header />
      <p data-testid="profile-email">{ callEmailFromStorage() }</p>
      <Link to="/done-recipes">
        <button
          type="button"
          data-testid="profile-done-btn"
        >
          Done Recipes
        </button>
      </Link>

      <Link to="/favorite-recipes">
        <button
          type="button"
          data-testid="profile-favorite-btn"
        >
          Favorite Recipes
        </button>
      </Link>

      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleClickLogout }
      >
        Logout
      </button>

      <Footer />
    </>
  );
}

export default Profile;
