import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import App from '../../containers/App';
import rootReducer from '../../reducers';

afterEach(cleanup);
const store = createStore(rootReducer);
const history = createMemoryHistory();
const renderWithRedux = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('renders without crashing', () => {
  renderWithRedux(
    <Router history={history}>
      <App />
    </Router>,
  );
});

test('redirects to Home Page on Mount', () => {
  const { container } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(container.innerHTML).toMatch('LearnBeta');
});

test('links to all pages required on link click', () => {
  const { container, getByText } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(container.innerHTML).toMatch('LearnBeta');
  fireEvent.click(getByText(/sign in/i));
  expect(container.innerHTML).toMatch('Sign in and start taking software development courses');
  fireEvent.click(getByText(/sign up here/i));
  expect(container.innerHTML).toMatch('Sign up and start taking software development courses');
});

test('links to pages on link click', () => {
  const { container, getByText } = renderWithRedux(
    <Router history={history}>
      <App />
    </Router>,
  );
  expect(container.innerHTML).toMatch('LearnBeta');
  fireEvent.click(getByText(/sign up/i));
  expect(container.innerHTML).toMatch('Sign up and start taking software development courses');
});

export default renderWithRedux;
