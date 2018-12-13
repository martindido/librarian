import Loadable from 'react-loadable';
import Loading from '../../containers/pages/Loading';

export const path = '/worlds/:worldId/admin';
export const AdminWorld = Loadable({
    loader: () => import(/* webpackChunkName: "adminWorld" */ '../../containers/admin/World'),
    loading: Loading,
    modules: ['AdminWorld']
});