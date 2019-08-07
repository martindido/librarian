import { createBrowserHistory, createMemoryHistory } from 'history';

import createRootReducer, { initialState } from './';
import { initialState as authInitialState } from './auth';
import { initialState as graphqlInitialState } from './graphql';
import { initialState as routingInitialState } from './routing';
import { initialState as searchInitialState } from './search';

describe('#initialState', () => {
    it('is an object', () => {
        expect(initialState).toBeObject();
    });
    it('has the corresponding attributes', () => {
        expect(Object.keys(initialState)).toEqual(['auth', 'goodreads', 'graphql', 'routing', 'search']);
    });
    describe('#auth', () => {
        it('is the correspongind state', () => {
            expect(initialState.auth).toEqual(authInitialState);
        });
    });
    describe('#graphql', () => {
        it('is the correspongind state', () => {
            expect(initialState.graphql).toEqual(graphqlInitialState);
        });
    });
    describe('#routing', () => {
        it('is the correspongind state', () => {
            expect(initialState.routing).toEqual(routingInitialState);
        });
    });
    describe('#search', () => {
        it('is the correspongind state', () => {
            expect(initialState.search).toEqual(searchInitialState);
        });
    });
});

describe('.createRootReducer', () => {
    it('is an function', () => {
        expect(createRootReducer).toBeFunction();
    });
    it('returns a function for a browserHistory', () => {
        expect(createRootReducer(createBrowserHistory())).toBeFunction();
    });
    it('returns a function for a memoryHistory', () => {
        expect(createRootReducer(createMemoryHistory())).toBeFunction();
    });
});
