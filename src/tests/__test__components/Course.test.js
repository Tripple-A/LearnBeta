import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Course from '../../components/Course';

const course = {
  id: 1,
  provider: 'Plural Sight',
  imgUrl: 'http.//',
  title: 'Learning Testing',
  author: 'Test User',
};
afterEach(cleanup);
test('renders without crashing', () => {
  render(
    <MemoryRouter>
      <Course course={course} />
    </MemoryRouter>,
  );
});

it('renders input button correctly', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <Course course={course} />
    </MemoryRouter>,
  );
  expect(getByTestId('provider')).toHaveTextContent('Provider:');
});
