import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';
import Button from 'react-bootstrap-button-loader';


const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
});


const mapStateToProps = state => ({
  user: state.user,
});


const SignUp = ({ user, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
      case ('confirmation'):
        setPasswordConfirmation(e.target.value);
        break;
      default:
        return null;
    }
    return null;
  };

  const handleSignUp = () => {
    setError('Signing you up...');
    if (password !== passwordConfirmation) {
      setError('Password and Password confirmation mustbe the same');
      return null;
    }
    setLoad(true);
    fetch('https://mycourses-api.herokuapp.com/api/users', {
      method: 'POST',
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then(resp => resp.json())
      .then(data => {
        if (data.status === 'SUCCESS') {
          localStorage.setItem('token', data.data);
          const name = username;
          setPassword('');
          setUsername('');
          login(name);
        } else {
          setError('Please try again,Username taken');
        }
        setLoad(false);
      }).catch(err => {
        setError('Please try again, something went wrong');
        setLoad(false);
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
          <p className="sign">Sign Up</p>
          <p>Hello there! Sign up and start taking software development courses</p>
        </div>
        <input className="usap" name="username" type="text" placeholder="Username" onChange={e => handleChange(e)} />
        <br />
        <input className="usap" name="password" type="password" placeholder="Password" onChange={e => handleChange(e)} />
        <br />
        <input className="usap" name="confirmation" type="password" placeholder="Password Confirmation" onChange={e => handleChange(e)} />
        <br />
        <Button loading={load} className="auth" onClick={handleSignUp} type="submit"> Sign Up </Button>
        <div className="notSigned">
          <p data-testid="question">
            Signed up?
            <Link to="/signIn"> Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

SignUp.propTypes = {
  user: PropTypes.string,
  login: PropTypes.func.isRequired,
};

SignUp.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
