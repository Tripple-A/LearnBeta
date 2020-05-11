import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { LOGIN } from '../actions';

const mapDispatchToProps = dispatch => ({
  login: username => dispatch(LOGIN(username)),
});

const SignUp = ({ login }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [switcher, setSwitcher] = useState(false);

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

  const handleLogin = username => {
    login(username);
    setSwitcher(true);
  };

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
        handleLogin(username);
      });
  };

  const renderRedirect = () => {
    if (switcher === true) {
      const target = `/profile/${username}`;
      setUsername('');
      setPasswordConfirmation('');
      setPassword('');
      return <Redirect to={target} />;
    }
    return null;
  };

  return (
    <div>
      {renderRedirect()}
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
