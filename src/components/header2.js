import React from 'react';
import { Link } from 'react-router-dom';

function Header2() {
  return (
    <header className="py-2 px-2 bg-slate-100 font-sans flex justify-center">
      <Link to="/foods">
        <img
          className="w-10 my-1"
          alt="logo trybe cook"
          src="https://user-images.githubusercontent.com/95686401/180876245-922933e5-bddf-4cb1-ad82-699906bdb89d.png"
        />
      </Link>
    </header>
  );
}

export default Header2;
