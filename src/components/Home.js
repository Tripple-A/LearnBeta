import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => (
  <div className="landing-page">
    <h1 data-testid="title">LearnBeta</h1>
    <div className="textsWrap">
      <h3 className="bluey">Want a career in tech? Start today!</h3>
      <h3></h3>
      <h3 className="bluey">Find a course Love it much? Save to Favorites! Take the course</h3>
      <h3><Link to="/signUp" className="auth" data-testid="signUp"> START FREE</Link> Have fun </h3>
      <div className="reg-wrap">
        <Link to="/signIn" className="auth sign" data-testid="signIn"> Sign In </Link>
        <Link to="/signUp" className="auth sign" data-testid="signUp"> Sign Up </Link>
      </div>
    </div>
  </div>
);


export default Home;
