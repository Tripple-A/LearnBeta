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
import Favorites from './Favorites';
import { LOGIN, ADD } from '../actions';
import Detail from '../containers/Details';


const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
  addCourses: courses => dispatch(ADD(courses)),
});

const App = ({ login, addCourses }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const token = localStorage.getItem('token');
    async function auth() {
      if (token) {
        await fetch('https://mycourses-api.herokuapp.com/api/auto_login', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(resp => resp.json())
          .then(data => {
            if (data.status === 200) {
              login(data.user.username);
              setUser(data.username);
              addCourses(data.courses);
            }
          })
          .catch(err => err);
      }
    }
    auth();
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
        <Route exact path="/favs/:username" component={Favorites} />
        <Route exact path="/profile/:username" component={Dashboard} />
        <Route exact path="/detail/:id" component={Detail} />
      </Switch>
    </BrowserRouter>
  );
};

export default connect(null, mapDispatchToProps)(App);
