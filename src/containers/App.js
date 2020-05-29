import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../style/App.css';
import '../style/details.css';
import '../style/dashboard.css';
import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../components/Home';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Dashboard from './Dashboard';
import Favorites from '../components/Favorites';
import { LOGIN, ADD } from '../actions';
import Detail from './Details';


const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
  addCourses: courses => dispatch(ADD(courses)),
});

const App = ({ login, addCourses }) => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    async function auth() {
      if (token && !user) {
        await fetch('https://mycourses-api.herokuapp.com/api/auto_login', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(resp => resp.json())
          .then(data => {
            if (data.status === 200) {
              login(data.user.username);
              setLoaded(true);
              setUser(data.user.username);
              addCourses(data.courses);
            }
          })
          .catch(err => {
            setLoaded(true);
            return err;
          });
      }
    }
    auth();
  }, [addCourses, login]);

  const renderRedirect = () => {
    let target;
    if (user && loaded) {
      target = `/profile/${user}`;
      return <Redirect to={target} />;
    }
    if (!user && loaded) {
      return <Redirect to="/" />;
    }
    return null;
  };


  return (
    <div className="container">
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
    </div>
  );
};


App.propTypes = {
  addCourses: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(App);
