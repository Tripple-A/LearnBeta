import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const SignIn = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [switcher, setSwitcher] = useState(false);

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
        setSwitcher(true);
      })
      .catch(err => err);
  };

  const renderRedirect = () => {
    if (switcher === true) {
      const target = `/profile/${username}`;
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
      <button onClick={handleSignIn} type="submit"> Sign In </button>
    </div>
  );
};

export default SignIn;