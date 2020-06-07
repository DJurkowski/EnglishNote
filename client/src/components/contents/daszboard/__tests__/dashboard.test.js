import React from 'react';
import { render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import axios from 'axios';

import Dashboard from '../Dashboard';
import { store } from '../../../../store';

// jest.mock('axios');

afterEach(cleanup);

const renderComponent = () => render(
    <Provider store={store}>
        <Dashboard />
    </Provider>
)


test('renders "information" when there are no user profile', async () => {
    // axios.get.mockReturnValue(new Promise(resolve => resolve(null)));
    const {getByAltText, queryByAltText, containsMatchingElement} = renderComponent();
    expect(getByAltText('Loading...')).toBeInTheDocument();
});