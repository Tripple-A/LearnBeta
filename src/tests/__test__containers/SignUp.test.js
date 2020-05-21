import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from './App.test';
import SignUp from '../../containers/SignUp';

const div = document.createElement('div');
it('renders with redux', () => {
  renderWithRedux(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>, div,
  );
});


it('renders text correctly', () => {
  const { getByTestId } = renderWithRedux(
    <MemoryRouter>
      <SignUp />
    </MemoryRouter>, div,
  );
  expect(getByTestId('question')).toHaveTextContent('Signed up? Sign in here');
});
