import { Component } from 'react';

import { SignOutProps } from '../../types/Props/Auth/SignOut';

export default class SignOut extends Component<SignOutProps> {
    componentWillMount() {
        this.props.signOut();
        this.props.goodreadsSignOut();
        this.props.history.push('/');
    }

    render() {
        return null;
    }
}
