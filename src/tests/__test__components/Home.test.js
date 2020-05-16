import React from 'react';
import { render } from '@testing-library/react';
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
