import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import context from './context';

function Provider({ children }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isBtnLoginDisabled, setIsBtnLoginDisabled] = useState(true);

  const states = {
    email,
    password,
    isBtnLoginDisabled,
  };

  const functions = {
    setEmail,
    setPassword,
  };

  useEffect(() => {
    // função que checa se o email é válido
    const checkEmail = () => {
      const regexEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
      return regexEmail.test(email);
    };

    // função que checa se o email é válido
    const checkPassword = () => {
      const SIX = 6;
      return password.length > SIX;
    };
    // função que habilita o botão se checkP. e checkE. retornarem true
    const validateLogin = () => {
      if (checkEmail() && checkPassword()) {
        setIsBtnLoginDisabled(false);
      } else setIsBtnLoginDisabled(true);
    };
    validateLogin();
  }, [email, password]);

  return (
    <context.Provider
      value={ { states, functions } }
    >
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
