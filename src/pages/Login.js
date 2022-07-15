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
    <form>
      <input
        type="email"
        data-testid="email-input"
        placeholder="email"
        name="email"
        onChange={ handleChange }
      />
      <input
        type="password"
        data-testid="password-input"
        placeholder="password"
        name="password"
        onChange={ handleChange }
      />
      <Link to="/foods">
        <button
          type="button"
          data-testid="login-submit-btn"
          disabled={ isBtnLoginDisabled }
          onClick={ sendDataToLocalStorage }
        >
          Enter
        </button>
      </Link>

    </form>
  );
}

export default Login;
