import { RouteComponentProps } from 'react-router-dom';

import { SignOutActionCreator } from '../../Action/Auth';
import { GoodreadsSignOutActionCreator } from '../../Action/Goodreads';

export type SignOutDispatchProps = Readonly<{
    signOut: SignOutActionCreator;
    goodreadsSignOut: GoodreadsSignOutActionCreator;
}>;

export type SignOutProps = RouteComponentProps & SignOutDispatchProps;
