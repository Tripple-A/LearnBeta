import React, { useEffect, useState } from 'react';
import '../style/App.css';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './Home';
import SignIn from '../containers/SignIn';
import SignUp from '../containers/SignUp';
import Dashboard from '../containers/Dashboard';

import { LOGIN } from '../actions';

const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
});

const App = ({ login }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch('https://mycourses-api.herokuapp.com/api/auto_login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(resp => resp.json())
        .then(data => {
          login(data.username);
          setUser(data.username);
        })
        .catch(err => console.log(err));
    }
  }, []);

  const renderRedirect = () => {
    let target;
    if (user) {
      target = `/profile/${user}`;
      return <Redirect to={target} />;
    }
    return null;
  };


  return (
    <BrowserRouter>
      {renderRedirect()}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signIn" component={SignIn} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/profile/:username" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, mapDispatchToProps)(App);
