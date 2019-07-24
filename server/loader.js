// import path from 'path';
// import fs from 'fs';
// import React from 'react';
// import Amplify from 'aws-amplify';
// import AuthClass from '@aws-amplify/auth/lib/Auth';
// import { renderToString } from 'react-dom/server';
// import Helmet from 'react-helmet';
// import { Provider } from 'react-redux';
// import { StaticRouter } from 'react-router';
// import { Frontload, frontloadServerRender } from 'react-frontload';
// import Loadable from 'react-loadable';

// import createStore from '../src/store';
// import App from '../src/app';
// import manifest from '../build/asset-manifest.json';
// import { authenticateSync } from '../src/App/actions/sync';
// import aws_exports from '../src/aws-exports';

// import type { $Request, $Response } from 'express';
// import { CustomCookieStorage } from './storage';

// Amplify.configure({
//     ...aws_exports
// });

// export default (req: $Request, res: $Response) => {
//     fs.readFile(path.resolve(__dirname, '../build/index.html'), 'utf8', (err, htmlData) => {
//         if (err) {
//             console.error('Read error', err);
//             return res.status(404).end();
//         }

//         const { store } = createStore(req.url);
//         const modules = [];
//         const context = {};

//         authenticate(req, store)
//             .then(() => render(req, store, modules, context))
//             .then(routeMarkup => send(res, store, modules, context, routeMarkup, htmlData));
//     });
// };

// async function authenticate(req, store) {
//     return await new Promise((resolve, reject) => {
//         store.dispatch(
//             authenticateSync(
//                 {
//                     authenticator: newAuth(req)
//                 },
//                 {
//                     onSuccess: resolve,
//                     onError: reject
//                 }
//             )
//         );
//     });
// }

// function newAuth(req) {
//     const authConfig = {
//         storage: new CustomCookieStorage(req.cookies)
//     };
//     if (aws_exports['aws_cognito_identity_pool_id'] || aws_exports['aws_user_pools_id']) {
//         authConfig.userPoolId = aws_exports['aws_user_pools_id'];
//         authConfig.userPoolWebClientId = aws_exports['aws_user_pools_web_client_id'];
//         authConfig.region = aws_exports['aws_cognito_region'];
//         authConfig.identityPoolId = aws_exports['aws_cognito_identity_pool_id'];
//     }
//     return new AuthClass(authConfig);
// }

// async function render(req, store, modules, context) {
//     return frontloadServerRender(() =>
//         renderToString(
//             <Loadable.Capture
//                 report={m => {
//                     modules.push(m);
//                 }}>
//                 <Provider store={store}>
//                     <StaticRouter location={req.url} context={context}>
//                         <Frontload isServer={true}>
//                             <App />
//                         </Frontload>
//                     </StaticRouter>
//                 </Provider>
//             </Loadable.Capture>
//         )
//     );
// }

// function send(res, store, modules, context, routeMarkup, htmlData) {
//     if (context.url) {
//         res.writeHead(302, {
//             Location: context.url
//         });
//         res.end();
//     } else {
//         const extractAssets = (assets, chunks) =>
//             Object.keys(assets)
//                 .filter(asset => chunks.indexOf(asset.replace('.js', '')) > -1)
//                 .map(k => assets[k]);
//         const extraChunks = extractAssets(manifest, modules).map(
//             c => `<script type="text/javascript" src="/${c.replace(/^\//, '')}"></script>`
//         );
//         const helmet = Helmet.renderStatic();

//         res.send(
//             injectHTML(htmlData, {
//                 html: helmet.htmlAttributes.toString(),
//                 title: helmet.title.toString(),
//                 link: helmet.link.toString(),
//                 meta: helmet.meta.toString(),
//                 body: routeMarkup,
//                 scripts: extraChunks,
//                 state: JSON.stringify(store.getState()).replace(/</g, '\\u003c')
//             })
//         );
//     }
// }

// function injectHTML(data, { html, title, meta, link, body, scripts, state }) {
//     data = data.replace('<html>', `<html ${html}>`);
//     data = data.replace(/<title>.*?<\/title>/g, title);
//     data = data.replace('</head>', `${meta}</head>`);
//     data = data.replace('</head>', `${link}</head>`);
//     data = data.replace(
//         '<div id="root"></div>',
//         `<div id="root">${body}</div><script>window.__PRELOADED_STATE__ = ${state}</script>`
//     );
//     data = data.replace('</body>', scripts.join('') + '</body>');
//     return data;
// }
