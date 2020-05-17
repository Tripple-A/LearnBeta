import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import { render, cleanup } from '@testing-library/react';
import renderWithRedux from './App.test';
import Detail from '../../containers/Details';

const div = document.createElement('div');
const match = {
    params:{
        id: '1',
    }
};
const courses = [{
 id:1
}]

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
    const { container } = renderWithRedux(
      <MemoryRouter>
        <Detail match={match} courses={courses} />
      </MemoryRouter>, div,
    );
    expect(container).not.toHaveTextContent('loading');
    expect(container).toHaveTextContent('Add To Favorites');
  }); 
  