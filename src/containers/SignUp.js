import React, { useState } from 'react';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

const mapDispatchToProps = dispatch => {
  return {
    login: username => dispatch(LOGIN(username)),
  };
};

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

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

  const handleLogin = (username) => {

  }
  const handleSignUp = () => {
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
        localStorage.setItem('token', data.data);
      });
    setUsername('');
    setPasswordConfirmation('');
    setPassword('');
  };

  return (
    <div>
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

export default connect(null, mapDispatchToProps)(SignUp);
