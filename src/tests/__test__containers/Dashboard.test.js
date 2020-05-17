import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from './App.test';
import Dashboard from '../../containers/Dashboard';


const div = document.createElement('div');
const match = {
  params: {
    username: 'tester',
  },
};


it('renders with redux', () => {
  renderWithRedux(
    <MemoryRouter>
      <Dashboard match={match} />
    </MemoryRouter>, div,
  );
});


it('renders username correctly as provided in match params', () => {
  const { container } = renderWithRedux(
    <MemoryRouter>
      <Dashboard match={match} />
    </MemoryRouter>, div,
  );
  expect(container).toHaveTextContent('tester');
});

it('renders text correctly', () => {
  const { container } = renderWithRedux(
    <MemoryRouter>
      <Dashboard match={match} />
    </MemoryRouter>, div,
  );
  expect(container).toHaveTextContent('Dashboard');
  expect(container).not.toHaveTextContent('My Favorites');
});
