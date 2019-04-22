import { createStore, applyMiddleware, compose } from 'redux';
// $FlowFixMe
import { createBrowserHistory, createMemoryHistory } from 'history';
import { routerMiddleware } from 'connected-react-router';
import { createEpicMiddleware } from 'redux-observable';
import createRootReducer, { initialState as reducersInitialState } from './App/reducers/index';
import { epics } from './App/epics';

import type { Store } from 'redux';
import type { State } from './App/types/State';
import type { Action } from './App/types/Action';

export default (url: string = '/') => {
    const history = getHistory(url);
    const epicMiddleware = createEpicMiddleware();
    const middlewares = [epicMiddleware, routerMiddleware(history)];
    const enhancers = getInitialEnhancers();
    const composedEnhancers = composeEnhancers(middlewares, enhancers);
    const initialState = getInitialState();
    const store: Store<State, Action> = createStore(createRootReducer(history), initialState, composedEnhancers);

    epicMiddleware.run(epics);
    return {
        store,
        history
    };
};

export const isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);

function getHistory(url) {
    return isServer
        ? createMemoryHistory({
              initialEntries: [url]
          })
        : createBrowserHistory();
}

function getInitialEnhancers() {
    const enhancers = [];

    if (isServer || process.env.NODE_ENV !== 'development' || typeof window.devToolsExtension !== 'function') {
        return enhancers;
    }
    enhancers.push(window.devToolsExtension());
    return enhancers;
}

function composeEnhancers(middlewares, enhancers) {
    return compose(
        applyMiddleware(...middlewares),
        ...enhancers
    );
}

function getInitialState() {
    if (isServer) {
        return reducersInitialState;
    }
    const initialState = window.__PRELOADED_STATE__;

    delete window.__PRELOADED_STATE__;
    return initialState;
}
