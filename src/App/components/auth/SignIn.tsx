import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { Grid, Header, Image, Message } from 'semantic-ui-react';

import SignInForm from '../../containers/forms/auth/SignIn';
import Page from '../../containers/pages/Page';
import logo from '../../images/logo.png';
import { SignInFormData } from '../../types/Form/Auth/SignIn';
import { SignInProps } from '../../types/Props/Auth/SignIn';

export default class SignIn extends Component<SignInProps> {
    private handleSubmit = async (signInFormData: SignInFormData) => {
        try {
            await this.signIn(signInFormData);
            this.props.goodreadsSignIn();
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            });
        }
    }

    private signIn = async (signInFormData: SignInFormData) => {
        return new Promise((resolve, reject) => {
            this.props.signInSync(signInFormData, {
                onSuccess: resolve,
                onError: reject
            });
        });
    }

    public render = () => {
        return (
            <Page id='SignIn' description='Librarian sign in' withHeader={false}>
                <Grid centered textAlign='center' verticalAlign='middle'>
                    <Grid.Column className='wrapper'>
                        <Header as='h2' color='black' textAlign='center' inverted>
                            <Image src={logo} /> Login to your account
                        </Header>
                        <SignInForm onSubmit={this.handleSubmit} />
                        <Message>
                            <Message.Header>Don't have an account?</Message.Header>
                            <Link to='/sign-up'>Sign Up</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Page>
        );
    }
}
