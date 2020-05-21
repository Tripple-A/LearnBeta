import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { render } from '@testing-library/react';
import renderWithRedux from './App.test';
import Detail from '../../containers/Details';


const mockStore = configureStore([]);
const courses = [{
  id: 1,
  shortDescription: 'We learn everyday,',
}];

const store = mockStore({
  courses,
});

const renderWithRedux2 = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});


const div = document.createElement('div');
const match = {
  params: {
    id: '1',
  },
};


it('renders with redux', () => {
  renderWithRedux(
    <MemoryRouter>
      <Detail match={match} />
    </MemoryRouter>, div,
  );
});


it('renders text correctly if course has not loaded yet', () => {
  const { container } = renderWithRedux(
    <MemoryRouter>
      <Detail match={match} />
    </MemoryRouter>, div,
  );
  expect(container).toHaveTextContent('loading');
});

it('renders text correctly if course has not loaded yet', () => {
  const { container } = renderWithRedux(
    <MemoryRouter>
      <Detail match={match} />
    </MemoryRouter>, div,
  );
  expect(container).toHaveTextContent('loading');
  expect(container).not.toHaveTextContent('Add To Favorites');
});

it('renders text correctly if course has loaded', () => {
  const { container } = renderWithRedux2(
    <MemoryRouter>
      <Detail match={match} />
    </MemoryRouter>, div,
  );
  expect(container).not.toHaveTextContent('loading');
  expect(container).toHaveTextContent('Add to Favorites');
});
