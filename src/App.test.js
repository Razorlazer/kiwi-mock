import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from './utilities/testUtils';
import App from './App';

test('renders learn react link', () => {
  const { asFragment } = render(
    <Provider store={mockStore()}>
      <App />
    </Provider>
  );

  expect(asFragment(<App />)).toMatchSnapshot();
});
