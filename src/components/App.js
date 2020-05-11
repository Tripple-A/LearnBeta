import React from 'react';
import '../style/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
      </div>
      <Switch>
        <Route />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
