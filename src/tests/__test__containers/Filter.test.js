import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import Filter from '../../containers/Filter';
import renderWithRedux from './App.test';

const div = document.createElement('div');
it('renders with redux', () => {
  renderWithRedux(
    <Filter />, div,
  );
});
