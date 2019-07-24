import { AxiosError } from 'axios';

import {
    goodreadsSignIn,
    goodreadsSignInError,
    goodreadsSignInSuccess,
    goodreadsSignOut,
    goodreadsSignOutError,
    goodreadsSignOutSuccess
} from '../../actions/goodreads';

export type GoodreadsSignInAction = {
    type: 'GOODREADS_SIGN_IN';
};

export type GoodreadsSignInActionCreator = typeof goodreadsSignIn;

export type GoodreadsSignInSuccessAction = {
    type: 'GOODREADS_SIGN_IN_SUCCESS';
};

export type GoodreadsSignInSuccessActionCreator = typeof goodreadsSignInSuccess;

export type GoodreadsSignInErrorAction = {
    type: 'GOODREADS_SIGN_IN_ERROR';
    payload: AxiosError;
};

export type GoodreadsSignInErrorActionCreator = typeof goodreadsSignInError;

export type GoodreadsSignOutAction = {
    type: 'GOODREADS_SIGN_OUT';
};

export type GoodreadsSignOutActionCreator = typeof goodreadsSignOut;

export type GoodreadsSignOutSuccessAction = {
    type: 'GOODREADS_SIGN_OUT_SUCCESS';
};

export type GoodreadsSignOutSuccessActionCreator = typeof goodreadsSignOutSuccess;

export type GoodreadsSignOutErrorAction = {
    type: 'GOODREADS_SIGN_OUT_ERROR';
    payload: AxiosError;
};

export type GoodreadsSignOutErrorActionCreator = typeof goodreadsSignOutError;

export type GoodreadsAction =
    | GoodreadsSignInAction
    | GoodreadsSignInSuccessAction
    | GoodreadsSignInErrorAction
    | GoodreadsSignOutAction;
