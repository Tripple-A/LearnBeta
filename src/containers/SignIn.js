import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
});


const mapStateToProps = state => ({
  user: state.user,
});


const SignIn = ({ user, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [load, setLoad] = useState(false);


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
    if (password === '' || username === '') {
      setError('Please fill in all fields.');
      document.querySelector('.error').style.color = 'red';
      return null;
    }
    setError('Signing you in...');
    document.querySelector('.error').style.color = 'green';
    setLoad(true);
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
        const name = username;
        setPassword('');
        setUsername('');
        setLoad(false);
        login(name);
      })
      .catch(err => {
        setLoad(false);
        document.querySelector('.error').style.color = 'red';
        setError('Username or Password incorrect! Please try again.');
        return err;
      });
    return null;
  };

  const renderRedirect = () => {
    if (user) {
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
        <Button loading={load} className="auth" onClick={handleSignIn} type="submit"> Sign In </Button>
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
  login: PropTypes.func.isRequired,
};

SignIn.defaultProps = {
  user: null,
};
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
