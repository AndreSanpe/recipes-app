import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/context';

function Login() {
  const { states: { email, isBtnLoginDisabled },
    functions: { setEmail, setPassword } } = useContext(context);

  // handleChange func
  const handleChange = ({ target: { name, value } }) => {
    switch (name) {
    case 'email':
      setEmail(value);
      break;
    default:
      setPassword(value);
    }
  };

  // onclick: manda os dados para o local storage
  const sendDataToLocalStorage = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  return (
    <section
      className="login-bg w-screen h-screen flex flex-column items-center justify-center"
    >
      <img
        className="w-64 mb-14"
        alt="trybe cook"
        src="https://user-images.githubusercontent.com/95686401/180849627-234b1977-534c-4163-abb7-00a91959d143.png"
      />
      <form
        className="flex flex-column"
      >
        <input
          className="rounded-md mb-6 py-1 px-2"
          type="email"
          data-testid="email-input"
          placeholder="email"
          name="email"
          onChange={ handleChange }
        />
        <input
          className="rounded-md mb-6 py-1 px-2"
          type="password"
          data-testid="password-input"
          placeholder="password"
          name="password"
          onChange={ handleChange }
        />
        <Link to="/foods">
          <button
            className="bg-"
            type="button"
            data-testid="login-submit-btn"
            disabled={ isBtnLoginDisabled }
            onClick={ sendDataToLocalStorage }
          >
            Enter
          </button>
        </Link>

      </form>
    </section>
  );
}

export default Login;
