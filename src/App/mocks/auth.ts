import { Confirmation, Credentials } from '../types/Auth';

import { user, USERNAME } from './user';

export const CODE = '123456';
export const EMAIL = 'librarian@librarian.com';
export const PASSWORD = 'abc123';
export const RESULT = 'ok';

export const confirmation: Confirmation = {
    ...user,
    code: CODE
};

export const credentials: Credentials = {
    username: USERNAME,
    password: PASSWORD
};

export const credentialsWithEmail: Credentials = {
    email: EMAIL,
    username: USERNAME,
    password: PASSWORD
};
