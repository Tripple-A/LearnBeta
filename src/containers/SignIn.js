import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';


const mapStateToProps = state => ({
  user: state.user,
});


const SignIn = ({ user, loggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [switcher, setSwitcher] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    switch (e.target.name) {
      case ('username'):
        setUsername(e.target.value);
        break;
      case ('password'):
        setPassword(e.target.value);
        break;
      default:
        return null;
    }
    return null;
  };
  const controller = new AbortController();
  const { signal } = controller;
  const handleSignIn = () => {
    fetch('https://mycourses-api.herokuapp.com/api/login', {
      signal,
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then(resp => resp.json())
      .then(data => {
        localStorage.setItem('token', data.jwt);
        loggedIn(username);
        setSwitcher(true);
        setPassword('');
        setUsername('');
      })
      .catch(err => {
        setError('There was a problem signing you in,Please try again');
        return err;
      });
    return function cleanUp() {
      controller.abort();
    };
  };

  const renderRedirect = () => {
    if (user && switcher) {
      const target = `/profile/${user}`;
      return <Redirect to={target} />;
    }
    return null;
  };

  return (
    <div className="landing-page landingReg">
      {renderRedirect()}
      <div className="regWrap">
        <h4 className="error">{error}</h4>
        <div className="intro">
          <p className="sign">Sign In</p>
          <p>Hello there! Sign in and start taking software development courses</p>
        </div>
        <input className="usap" name="username" type="text" placeholder="Username" onChange={e => handleChange(e)} />
        <br />
        <input className="usap pwd" name="password" type="password" placeholder="Password" onChange={e => handleChange(e)} />
        <br />
        <button className="auth" onClick={handleSignIn} type="submit"> Sign In </button>
        <div className="notSigned">
          <p data-testid="question">
            Not Signed up?
            <Link to="/signUp"> Sign up here</Link>
          </p>
        </div>

      </div>
    </div>
  );
};

SignIn.propTypes = {
  user: PropTypes.string,
  loggedIn: PropTypes.func,
};

SignIn.defaultProps = {
  user: null,
  loggedIn: null,
};
export default connect(mapStateToProps)(SignIn);
