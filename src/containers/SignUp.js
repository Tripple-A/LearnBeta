import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
});

const SignUp = ({ user, login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
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
      case ('confirmation'):
        setPasswordConfirmation(e.target.value);
        break;
      default:
        return null;
    }
    return null;
  };

  const handleSignUp = () => {
    if (password !== passwordConfirmation) {
      setError('Password and Password confirmation mustbe the same');
      return null;
    }
    fetch('https://mycourses-api.herokuapp.com/api/users', {
      method: 'POST',
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
          login(username);
          setSwitcher(true);
        } else {
          setError('Please try again,Username taken');
        }
      }).catch(err => {
        setError('Please try again, something went wrong');
        return err;
      });
    return null;
  };

  const renderRedirect = () => {
    if (user && switcher) {
      const target = `/profile/${user}`;
      return <Redirect to={target} />;
    }
    return null;
  };

  return (
    <div>
      {renderRedirect()}
      <h4>{ error }</h4>
      <input name="username" type="text" placeholder="Username" onChange={e => handleChange(e)} />
      <br />
      <input name="password" type="password" placeholder="Password" onChange={e => handleChange(e)} />
      <br />
      <input name="confirmation" type="password" placeholder="Password Confirmation" onChange={e => handleChange(e)} />
      <br />
      <button onClick={handleSignUp} type="submit"> Sign Up </button>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
