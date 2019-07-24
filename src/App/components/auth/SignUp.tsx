import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { Grid, Header, Image, Message } from 'semantic-ui-react';

import SignUpForm from '../../containers/forms/auth/SignUp';
import Page from '../../containers/pages/Page';
import logo from '../../images/logo.png';
import { SignUpFormData } from '../../types/Form/Auth/SignUp';
import { SignUpProps } from '../../types/Props/Auth/SignUp';
import { User } from '../../types/User';

export default class SignUp extends Component<SignUpProps> {
    handleSubmit = async (payload: SignUpFormData) => {
        try {
            const user = await this.signUp(payload);

            this.props.setCurrentUnconfirmedUser(user);
            this.props.history.push(`/sign-up-confirm`);
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            });
        }
    }

    signUp = async (payload: SignUpFormData) => {
        return await new Promise<User>((resolve, reject) => {
            this.props.signUpSync(payload, {
                onSuccess: resolve,
                onError: reject
            });
        });
    }

    render() {
        const { currentUnconfirmedUser } = this.props;

        if (currentUnconfirmedUser) {
            return <Redirect to={'/sign-up-confirm'} />;
        }
        return (
            <Page id='SignUp' description='Librarian sign up' withHeader={false}>
                <Grid centered textAlign='center' verticalAlign='middle'>
                    <Grid.Column className='wrapper'>
                        <Header as='h2' color='black' textAlign='center' inverted>
                            <Image src={logo} /> Create a new account
                        </Header>
                        <SignUpForm onSubmit={this.handleSubmit} />
                        <Message>
                            <Message.Header>Already have an account?</Message.Header>
                            <Link to='/sign-in'>Sign In</Link>
                        </Message>
                    </Grid.Column>
                </Grid>
            </Page>
        );
    }
}
