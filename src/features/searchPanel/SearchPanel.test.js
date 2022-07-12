import { Provider } from 'react-redux';
import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import { mockStore, fullSearchState } from '../../utilities/testUtils';
import { fetchFlightList } from '../../store/slices/flightsSlice';
import SearchPanel from "./SearchPanel";


jest.mock('../../store/slices/flightsSlice', () => ({
    ...jest.requireActual('../../store/slices/flightsSlice'),
    fetchFlightList: jest.fn()
}));

afterEach(cleanup);


// jest.mock('./store/slices/locationsSlice', () => ({
//   ...jest.requireActual('./store/slices/locationsSlice'),
//   fetchDestinationLocationsList: jest.fn(),
//   fetchDepartureLocationsList: jest.fn()
// }));

describe('SearchPanel', () => {
    it('Should match the snapshot',()=>{
        const { asFragment } = render(
            <Provider store={mockStore()}>
                <SearchPanel />
            </Provider>
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('Should fetch flgihts on Search button click', () =>{
        const store = mockStore(fullSearchState);
        console.log(store.getState());
        render(
            <Provider store={store}>
                <SearchPanel />
            </Provider>
        );

        fireEvent.click(screen.getByTestId('search-button'));

        const dispatchedActions = store.getActions();
        console.log(dispatchedActions);
    })
});