import Loadable from 'react-loadable';

import Loading from '../containers/pages/Loading';

export const path = '/shelves';
export const Shelves = Loadable({
    loader: () => import(/* webpackChunkName: "shelves" */ '../containers/pages/Shelves'),
    loading: Loading,
    modules: ['shelves']
});
