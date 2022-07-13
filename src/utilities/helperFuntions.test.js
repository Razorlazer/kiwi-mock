import { 
    buildURLParams, 
    createLocationSelectionList, 
    timeEpochUTCtoLocal 
} from "./helperFunctions";

describe('helperFunctions', () =>{
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
        
});