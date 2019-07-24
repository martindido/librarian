import Amplify from 'aws-amplify';
import { ConnectedRouter } from 'connected-react-router';
import React from 'react';
import { hydrate, render } from 'react-dom';
import { Frontload } from 'react-frontload';
import Loadable from 'react-loadable';
import { LocalizeProvider } from 'react-localize-redux';
import { Provider } from 'react-redux';

import App from './App';
import aws_exports from './aws-exports';
import * as serviceWorker from './serviceWorker';
import createStore from './store';

Amplify.configure({
    ...aws_exports,
    Auth: {
        cookieStorage: {
            domain: '.librarian.world',
            secure: false
        }
    }
});

const { store, history } = createStore();
const Application = (
    <Provider store={store}>
        <LocalizeProvider store={store}>
            <ConnectedRouter history={history}>
                <Frontload noServerRender={true}>
                    <App />
                </Frontload>
            </ConnectedRouter>
        </LocalizeProvider>
    </Provider>
);
const root = document.getElementById('root');

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
