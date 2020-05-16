import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from '../../containers/App';
import rootReducer from '../../reducers';

afterEach(cleanup);
const store = createStore(rootReducer);
const renderWithRedux = component => ({
  ...render(<Provider store={store}>{component}</Provider>),
});

test('renders without crashing', () => {
  renderWithRedux(<App />);
});

export default renderWithRedux;
