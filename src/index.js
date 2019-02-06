import React from 'react';
import Amplify from 'aws-amplify';
import { render, hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { Frontload } from 'react-frontload';
import { ConnectedRouter } from 'connected-react-router';
import createStore from './store';
import App from './App';
import * as serviceWorker from './serviceWorker';
import aws_exports from './aws-exports';

Amplify.configure({
    ...aws_exports,
    Auth: {
        cookieStorage: {
            domain: '.rolecenter.com',
            secure: false
        }
    }
});

const { store, history } = createStore();
const Application = (
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Frontload noServerRender={true}>
                <App />
            </Frontload>
        </ConnectedRouter>
    </Provider>
);
const root: ?Element = document.getElementById('root');

if (root) {
    if (root.hasChildNodes() === true) {
        Loadable.preloadReady().then(() => {
            hydrate(Application, root);
        });
    } else {
        render(Application, root);
    }
    serviceWorker.register();
}
