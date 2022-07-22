// Ref: https://dev.to/iamludal/custom-react-hooks-uselocalstorage-309p
// hook para facilitar o uso do LocalStorage. Temos que importar esse componente dentro do provider, setar um estado e esportá-lo para ser usado em outros componentes.
import { useState, useEffect } from 'react';

const useLocalStorage = (key, defaultVAlue = null) => {
  const [value, setValue] = useState(() => {
    try {
      const salved = localStorage.getItem(key);
      if (salved !== null) {
        return JSON.parse(salved);
      }
      return defaultVAlue;
    } catch {
      return defaultVAlue;
    }
  });

  useEffect(() => {
    const rewValue = JSON.stringify(value);
    localStorage.setItem(key, rewValue);
  }, [value, key]);

  return [value, setValue];
};

export default useLocalStorage;
