import React, { Component } from 'react';
import { InputField } from 'react-semantic-redux-form';
import { Field } from 'redux-form';
import { Form, Message } from 'semantic-ui-react';

import { SignUpFormProps } from '../../../types/Form/Auth/SignUp';
import * as validations from '../../../utils/validations';

const hasMinLength8 = validations.hasMinLength(8);

export default class SignUp extends Component<SignUpFormProps> {
    render() {
        const { handleSubmit, submitting, invalid, error } = this.props;

        return (
            <Form size='large' onSubmit={handleSubmit} loading={submitting} error={invalid}>
                <Field
                    component={InputField}
                    name='credentials[email]'
                    fluid
                    icon='mail'
                    iconPosition='left'
                    placeholder='Email'
                    type='email'
                    validate={[validations.isRequired, validations.isValidEmail]}
                />
                <Field
                    component={InputField}
                    name='credentials[username]'
                    fluid
                    icon='at'
                    iconPosition='left'
                    placeholder='Username'
                    validate={[validations.isRequired]}
                />
                <Field
                    component={InputField}
                    name='credentials[password]'
                    fluid
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    validate={[validations.isRequired, hasMinLength8, validations.isValidPassword]}
                />
                <Form.Button fluid size='massive' inverted>
                    Sign Up
                </Form.Button>
                {error ? <Message error content={error} /> : null}
            </Form>
        );
    }
}
