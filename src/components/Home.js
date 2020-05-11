import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>Learn fast</h1>
    <Link to="/signIn"> Sign in </Link>
    <Link to="/signUp"> Sign up </Link>
  </div>
);

export default Home;
