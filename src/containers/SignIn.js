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

  const handleSignIn = () => {
    fetch('https://mycourses-api.herokuapp.com/api/login', {
      method: 'POST',
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
  };

  const renderRedirect = () => {
    if (user && switcher) {
      const target = `/profile/${user}`;
      return <Redirect to={target} />;
    }
    return null;
  };

  return (
    <div className="landing-page">
      {renderRedirect()}
      <h4 className="error">{error}</h4>
      <div class="intro">
      <p className="sign">Sign In</p>
      <p>Hello there! Sign in and start taking software development courses</p>
      </div>
      <input className="usap" name="username" type="text" placeholder="Username" onChange={e => handleChange(e)} />
      <br />
      <input className="usap" name="password" type="password" placeholder="Password" onChange={e => handleChange(e)} />
      <br />
      <button className="auth" onClick={handleSignIn} type="submit"> Sign In </button>
    <div className="notSigned">
      <p>Not Signed up? <Link to="/signUp"> Sign up here</Link> </p>
    </div>

    </div>

  );
};

SignIn.propTypes = {
  user: PropTypes.string,
  loggedIn: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  user: null,
};
export default connect(mapStateToProps)(SignIn);
