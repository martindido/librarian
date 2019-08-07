import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { localizeReducer } from 'react-localize-redux';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { InitialState } from '../types/State';

import { auth, initialState as authInitialState } from './auth';
import { goodreads, initialState as goodreadsInitialState } from './goodreads';
import { graphql, initialState as graphqlInitialState } from './graphql';
import { initialState as routingInitialState, routing } from './routing';
import { initialState as searchInitialState, search } from './search';

export const initialState: InitialState = {
    auth: authInitialState,
    goodreads: goodreadsInitialState,
    graphql: graphqlInitialState,
    routing: routingInitialState,
    search: searchInitialState
};

export default (history: History) =>
    combineReducers({
        localize: localizeReducer,
        router: connectRouter(history),
        form: formReducer,
        auth,
        routing,
        goodreads,
        graphql,
        search
    });
