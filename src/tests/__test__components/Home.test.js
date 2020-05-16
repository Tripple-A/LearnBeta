import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Home from '../../components/Home';

const div = document.createElement('div');

it('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>, div,
  );
});

it('renders text correctly', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>, div,
  );
  expect(getByTestId('title')).toHaveTextContent('LearnBeta');
  expect(getByTestId('signIn')).toHaveTextContent('Sign In');
  expect(getByTestId('signUp')).toHaveTextContent('Sign Up');
});

it('renders navigates to Sign In Page correctly', () => {
  const { container, getByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>, div,
  );
  fireEvent.click(getByText(/sign in/i));
  expect(container.innerHTML).toMatch('Sign In');
});

it('renders navigates to Sign Up Page correctly', () => {
  const { container, getByText } = render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>, div,
  );
  fireEvent.click(getByText(/sign up/i));
  expect(container.innerHTML).toMatch('Sign Up');
});
