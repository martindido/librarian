import { fakeAction } from '../mocks/actions';
import { setShelvesAction } from '../mocks/actions/goodreads';
import { stateWithShelves } from '../mocks/reducers/goodreads';

import * as reducer from './goodreads';

describe('#initialState', () => {
    it('is an object', () => {
        expect(reducer.initialState).toBeObject();
    });
    it('has the corresponding attributes', () => {
        expect(Object.keys(reducer.initialState)).toEqual(['shelves']);
    });
    describe('#shelves', () => {
        it('is an array', () => {
            expect(reducer.initialState.shelves).toBeArray();
        });
        it('is empty', () => {
            expect(reducer.initialState.shelves).toBeEmpty();
        });
    });
});

describe('.goodreads', () => {
    it('is an function', () => {
        expect(reducer.goodreads).toBeFunction();
    });
    it('defaults the state argument to #initialState', () => {
        // @ts-ignore
        expect(reducer.goodreads(undefined, fakeAction)).toEqual(reducer.initialState);
    });
    it('returns an unmodified state for an irrelevant action', () => {
        // @ts-ignore
        expect(reducer.goodreads(stateWithShelves, fakeAction)).toEqual(stateWithShelves);
    });
    it('returns the corresponding state for a setShelvesAction', () => {
        expect(reducer.goodreads(reducer.initialState, setShelvesAction)).toEqual(stateWithShelves);
    });
});
