import { 
    buildURLParams, 
    compareDates, 
    createLocationSelectionList, 
    timeEpochUTCtoLocal, 
    validateSearchParams
} from "./helperFunctions";

describe('helperFunctions', () =>{
        //COMMENT: easy to write, more advance but more harder to read testing
        it.each`
            url            | result        
            ${{}} | ${''}
            ${'some-random-variable'} | ${''}
            ${{ limit: undefined, price: undefined, sort: undefined }} | ${''}
            ${{ limit: undefined, price: undefined, sort: 'quality' }} | ${'sort=quality'}
            ${{ limit: undefined, price: 200, sort: 'quality' }} | ${'price=200&sort=quality'}
            ${{ limit: 50, fromDate: '01/01/2022', toDate: '01/01/2022' }} | ${'limit=50&fromDate=01/01/2022&toDate=01/01/2022'}
        `('Should build url params using passed parameters', ({ url, result }) => {
            let urlParams = buildURLParams(url);
            expect(urlParams).toEqual(result);
        });

        describe('createLocationsList', () =>{
            const testLocationData = {
                locations: [{
                    id: "PRG",
                    code: "PRG",
                    name: "Václav Havel Airport Prague",
                    city: {
                        id: "prague_cz",
                        name: "Prague",
                        code: "PRG",
                    },
                }]
            };

            it('Should create locations list for select input', () => {
                const result = createLocationSelectionList(testLocationData);
                expect(result).toEqual(
                    [{
                        id: 'PRG',
                        code: 'PRG',
                        label: 'Václav Havel Airport Prague',
                        city: {
                            id: 'prague_cz',
                            name: 'Prague',
                            code: 'PRG',
                        }
                    }]);
            });
            
            it('Should omit already seleced location', () =>{
                const testStateDestination = { destinationLocation: 'PRG'};
                const testStateDeparture = { departureLocation: 'PRG' };
                const testBoth = { departureLocation: 'PRG', destinationLocation: 'PRG' };
                const testDestinationResult = createLocationSelectionList(testLocationData, testStateDestination);
                const testDepartureResult = createLocationSelectionList(testLocationData, testStateDeparture);
                const testBothResult = createLocationSelectionList(testLocationData, testBoth);

                expect(testDestinationResult).toEqual([]);
                expect(testDepartureResult).toEqual([]);
                expect(testBothResult).toEqual([]);
            });
        });

    it('Should convert epoch to date', () =>{
        const testEpoch = 1658350200;
        const result = timeEpochUTCtoLocal(testEpoch);
        expect(result).toEqual('20/07/2022, 22:50:00');
    });

    //COMMENT: exhaustive but easy to read way of testing a unit
    it('Should return 0 when the same dates are passed', () => {
        const shouldBeEqual = compareDates('01.01.2022', '01.01.2022');
        expect(shouldBeEqual).toEqual(0);
    });

    it('Should return false when invalid date is passed', () => {
        const shouldBeEqual = compareDates('test-param', '01.01.2022');
        expect(shouldBeEqual).toEqual('Invalid date');
    });

    it('Should return -1 when first date is later', () => {
        const shouldBeEqual = compareDates('02.01.2022', '01.01.2022');
        expect(shouldBeEqual).toEqual(-1);
    });

    it('Should return 1 when first date is later', () => {
        const shouldBeEqual = compareDates('02.01.2022', '01.01.2022');
        expect(shouldBeEqual).toEqual(-1);
    });
    //exhaustive testing ends here

    it.each`
            params                                                                                                                              | result        
            ${{}} | ${false}
            ${{ departureLocation: undefined, destinationLocation: undefined, fromDate: undefined, toDate: undefined }}                         | ${false}
            ${{ departureLocation: 'test-location-1', destinationLocation: undefined, fromDate: undefined, toDate: '01.02.2022' }}              | ${false}
            ${{ departureLocation: 'test-location-1', destinationLocation: 'test-location-2', fromDate: '01.02.2022', toDate: undefined }}      | ${false}
            ${{ departureLocation: 'test-location-1', destinationLocation: 'test-location-2', fromDate: '01.01.2022', toDate: '01.02.2022' }}   | ${true}
            ${{ departureLocation: 'test-location-1', destinationLocation: 'test-location-2', fromDate: '01.02.2022', toDate: '01.02.2022' }}   | ${true}
            ${{ departureLocation: 'test-location-1', destinationLocation: 'test-location-2', fromDate: '01.02.2022', toDate: '02.02.2022' }}   | ${true}
        `('Should build url params using passed parameters', ({ params, result }) => {

            expect(validateSearchParams(params)).toEqual(result);
    });
});