import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { SubmissionError } from 'redux-form';
import { Grid, Header, Image, Message } from 'semantic-ui-react';

import SignUpConfirmForm from '../../containers/forms/auth/SignUpConfirm';
import Page from '../../containers/pages/Page';
import logo from '../../images/logo.png';
import { SignUpConfirmFormData } from '../../types/Form/Auth/SignUpConfirm';
import { SignUpConfirmProps } from '../../types/Props/Auth/SignUpConfirm';

export default class SignUpConfirm extends Component<SignUpConfirmProps> {
    componentWillUnmount() {
        this.props.unsetCurrentUnconfirmedUser();
    }

    handleSubmit = async (payload: SignUpConfirmFormData) => {
        try {
            await this.signUpConfirm(payload);
            this.props.history.push('/sign-in');
        } catch (error) {
            throw new SubmissionError({
                _error: error.message
            });
        }
    }

    signUpConfirm = async (payload: SignUpConfirmFormData) => {
        return await new Promise((resolve, reject) => {
            this.props.signUpConfirmSync(payload, {
                onSuccess: resolve,
                onError: reject
            });
        });
    }

    render() {
        const { currentUnconfirmedUser } = this.props;

        if (!currentUnconfirmedUser) {
            return <Redirect to={'/sign-up'} />;
        }
        return (
            <Page id='SignUpConfirm' description='Librarian sign up confirmation' withHeader={false}>
                <Grid centered textAlign='center' verticalAlign='middle'>
                    <Grid.Column className='wrapper'>
                        <Header as='h2' color='black' textAlign='center' inverted>
                            <Image src={logo} /> Validate your account
                        </Header>
                        <SignUpConfirmForm onSubmit={this.handleSubmit} />
                        <Message>
                            <Message.Header>Don't have a validation code?</Message.Header>
                            Check your email or <Link to='/sign-up'>Sign Up</Link> again
                        </Message>
                    </Grid.Column>
                </Grid>
            </Page>
        );
    }
}
