import { LocalizeContextProps } from 'react-localize-redux';
import { RouteComponentProps } from 'react-router-dom';

import { GoodreadsSignInActionCreator } from '../../Action/Goodreads';
import { SignInSyncActionCreator } from '../../Action/Sync';

export type SignInDispatchProps = Readonly<{
    signInSync: SignInSyncActionCreator;
    goodreadsSignIn: GoodreadsSignInActionCreator;
}>;

export type SignInProps = RouteComponentProps & LocalizeContextProps & SignInDispatchProps;
