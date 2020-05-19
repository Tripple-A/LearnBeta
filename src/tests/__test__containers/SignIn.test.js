import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import SignIn from '../../containers/SignIn';
import renderWithRedux from './App.test';

const div = document.createElement('div');
it('renders with redux', () => {
  renderWithRedux(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>, div,
  );
});


it('renders text correctly', () => {
  const { getByTestId } = renderWithRedux(
    <MemoryRouter>
      <SignIn />
    </MemoryRouter>, div,
  );
  expect(getByTestId('question')).toHaveTextContent('Not Signed up?');
});
