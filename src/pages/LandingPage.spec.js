import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { mockStore } from '../utilities/testUtils';
import LandingPage from './LandingPage';

test('renders learn react link', () => {
    const { asFragment } = render(
        <Provider store={mockStore()}>
            <LandingPage />
        </Provider>
    );

    expect(asFragment(<LandingPage />)).toMatchSnapshot();
});
