import React from 'react';
import '../style/App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Dashboard from '../containers/Dashboard';


const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signIn" component={SignIn} />
      <Route exact path="/signUp" component={SignUp} />
      <Route exact path="/profile/:username" component={Dashboard} />
    </Switch>
  </BrowserRouter>
);

export default App;
