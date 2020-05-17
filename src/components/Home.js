import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <div className="landing-page">
    <h1 data-testid="title">LearnBeta</h1>
    <h3 className="bluey">Want a career in tech? Start today!</h3>
    <h3>Find a course</h3>
    <h3 className="bluey">Take the course</h3>
    <h3>Love it much? Save to Favorites!</h3>
    <div className="reg-wrap">
      <Link to="/signIn" className="auth" data-testid="signIn"> Sign In </Link>
      <Link to="/signUp" className="auth" data-testid="signUp"> Sign Up </Link>
    </div>
  </div>
);


export default Home;
