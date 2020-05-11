import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ match }) => {
  const [logOut, setLogOut] = useState('false');
  const name = match.params.username;
  const handleSignOut = () => {
    localStorage.removeItem('token');
    setLogOut(true);
  };
  if (localStorage.getItem('token')) {
    return (
      <div>
        Hello
        {' '}
        {name}
        <button type="button" onClick={handleSignOut}>Sign Out</button>
      </div>
    );
  }
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

export default Dashboard;
