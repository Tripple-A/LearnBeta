import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Favorites from '../../components/Favorites';


const match = {
  params: {
    username: 'test',
  },
};
afterEach(cleanup);
test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Favorites match={match} />
    </MemoryRouter>,
  );
});

it('renders back button correctly', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Favorites match={match} />
    </MemoryRouter>,
  );
  expect(getByTestId('btn').value).toBe('<');
});

it('renders page text correctly and button is clickable', () => {
  const { getByTestId, container } = render(
    <MemoryRouter>
      <Favorites match={match} />
    </MemoryRouter>,
  );
  expect(container.innerHTML).toMatch('Favorite Courses');
  fireEvent.click(getByTestId('btn'));
});
