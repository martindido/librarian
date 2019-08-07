import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import NotFount from '../containers/pages/NotFound';
import AdminRoute from '../containers/routes/Admin';
import AuthenticatedRoute from '../containers/routes/Authenticated';
import DualRoute from '../containers/routes/Dual';
import UnauthenticatedRoute from '../containers/routes/Unauthenticated';
import { path as GamePath, Game } from '../routes/Game';
import { path as HomePath, Home } from '../routes/Home';
import { Shelves } from '../routes/Shelves';
import { path as WorldPath, World } from '../routes/World';
// import { Worlds } from '../routes/Worlds';
import { path as AdminCreateGamePath, AdminCreateGame } from '../routes/admin/create/Game';
import { path as AdminCreateWorldPath, AdminCreateWorld } from '../routes/admin/create/World';
import { path as AdminUpdateGamePath, AdminUpdateGame } from '../routes/admin/update/Game';
import { path as AdminUpdateWorldPath, AdminUpdateWorld } from '../routes/admin/update/World';
import { path as SignInPath, SignIn } from '../routes/auth/SignIn';
import { path as SignOutPath, SignOut } from '../routes/auth/SignOut';
import { path as SignUpPath, SignUp } from '../routes/auth/SignUp';
import { path as SignUpConfirmPath, SignUpConfirm } from '../routes/auth/SignUpConfirm';
import { RoutesProps } from '../types/Props/Routes/Routes';

export default class Routes extends Component<RoutesProps> {
    componentDidUpdate(prevProps: RoutesProps) {
        if (this.props.location !== prevProps.location) {
            this.props.setNotFound(false);
            this.props.setPreviousLocation(prevProps.location);
        }
    }

    render() {
        return (
            <Switch>
                <DualRoute exact path={HomePath} unauthenticatedComponent={Home} authenticatedComponent={Shelves} />
                <AdminRoute exact path={AdminCreateWorldPath} component={AdminCreateWorld} />
                <AdminRoute exact path={AdminUpdateWorldPath} component={AdminUpdateWorld} />
                <AdminRoute exact path={AdminCreateGamePath} component={AdminCreateGame} />
                <AdminRoute exact path={AdminUpdateGamePath} component={AdminUpdateGame} />
                <AuthenticatedRoute exact path={GamePath} component={Game} />
                <AuthenticatedRoute exact path={WorldPath} component={World} />
                <AuthenticatedRoute exact path={SignOutPath} component={SignOut} />
                <UnauthenticatedRoute exact path={SignInPath} component={SignIn} />
                <UnauthenticatedRoute exact path={SignUpPath} component={SignUp} />
                <UnauthenticatedRoute exact path={SignUpConfirmPath} component={SignUpConfirm} />
                <Route component={NotFount} />
            </Switch>
        );
    }
}
