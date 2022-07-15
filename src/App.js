import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login';
import Recipes from './pages/Recipes';
import Provider from './context/Provider';
import AllRoutes from './AllRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <AllRoutes />
          <Route exact path="/" component={ Login } />
          <Route exact path="/foods" component={ Recipes } />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
