import { AxiosError } from 'axios';

import { AmplifyError, Errors } from '../types/Sync';

export const error: AmplifyError = {
    code: 'error',
    name: 'error',
    message: 'error'
};

export const errorString: AmplifyError = 'error';

export const errors: Errors = [error];

export const errorStrings: Errors = [errorString];

export const axiosError: AxiosError = {
    ...error,
    config: {},
    isAxiosError: true
};
