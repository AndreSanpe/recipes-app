/* eslint-disable max-len */
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
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
    <div className="font-sans flex flex-column">

      <div className="flex">
        <Link
          to="/foods"
        >
          <span
            className="material-symbols-outlined
            text-gray-900 active:text-orange-600 mt-3 ml-3"
          >
            arrow_back
          </span>
        </Link>
        <p className="ml-32 pt-3">
          Profile
        </p>
      </div>

      <div className="flex justify-center mt-10">
        <img
          className="border-6 border-orange-500 w-20 rounded-full"
          alt="remi from pixar"
          src="https://user-images.githubusercontent.com/95686401/181046147-74866890-f51c-424b-bae0-256b7dcd627f.png"
        />

        <div className="flex flex-column pl-6">
          <p className="font-bold text-lg m-0"> Welcome,</p>
          <p className="font-bold m-0" data-testid="profile-email">{ callEmailFromStorage() }</p>
          <p className="text-normal m-0">It's nice having you back</p>

        </div>
      </div>

      <div className="flex flex-column items-center mt-14">
        <p className="font-bold text-lg m-0 text-orange-500 pb-4"> Account </p>

        <Link to="/done-recipes">
          <button
            className="bg-orange-500 text-white text-m py-2 w-72 mb-2
            rounded-md hover:bg-orange-600 active:bg-orange-600 font-bold"
            type="button"
            data-testid="profile-done-btn"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button
            className="bg-orange-500 text-white text-m py-2 w-72 mb-2
            rounded-md hover:bg-orange-600 active:bg-orange-600 font-bold"
            type="button"
            data-testid="profile-favorite-btn"
          >
            Favorite  Recipes
          </button>
        </Link>

        <button
          className="bg-orange-500 text-white text-m py-2 w-72 mb-2
          rounded-md hover:bg-orange-600 active:bg-orange-600 font-bold"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Logout
        </button>

        <button
          className="bg-orange-500 text-white text-m py-2 w-72 mb-2
          rounded-md hover:bg-orange-600 active:bg-orange-600 font-bold"
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClickLogout }
        >
          Switch Accounts
        </button>

        <img
          className="w-24 my-4"
          alt="logo trybe cook"
          src="https://user-images.githubusercontent.com/95686401/180876245-922933e5-bddf-4cb1-ad82-699906bdb89d.png"
        />

      </div>

      <Footer />
    </div>
  );
}

export default Profile;
