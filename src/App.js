import React from 'react';
import { Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/Provider';
import AllRoutes from './AllRoutes';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <AllRoutes />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
