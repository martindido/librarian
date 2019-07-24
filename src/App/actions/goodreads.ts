import { AxiosError } from 'axios';

import {
    GOODREADS_SIGN_IN,
    GOODREADS_SIGN_IN_ERROR,
    GOODREADS_SIGN_IN_SUCCESS,
    GOODREADS_SIGN_OUT,
    GOODREADS_SIGN_OUT_ERROR,
    GOODREADS_SIGN_OUT_SUCCESS
} from '../constants/actions';
import {
    GoodreadsSignInAction,
    GoodreadsSignInErrorAction,
    GoodreadsSignInSuccessAction,
    GoodreadsSignOutAction,
    GoodreadsSignOutErrorAction,
    GoodreadsSignOutSuccessAction
} from '../types/Action/Goodreads';

export function goodreadsSignIn(): GoodreadsSignInAction {
    return {
        type: GOODREADS_SIGN_IN
    };
}

export function goodreadsSignInSuccess(): GoodreadsSignInSuccessAction {
    return {
        type: GOODREADS_SIGN_IN_SUCCESS
    };
}

export function goodreadsSignInError(error: AxiosError): GoodreadsSignInErrorAction {
    return {
        type: GOODREADS_SIGN_IN_ERROR,
        payload: error
    };
}

export function goodreadsSignOut(): GoodreadsSignOutAction {
    return {
        type: GOODREADS_SIGN_OUT
    };
}

export function goodreadsSignOutSuccess(): GoodreadsSignOutSuccessAction {
    return {
        type: GOODREADS_SIGN_OUT_SUCCESS
    };
}

export function goodreadsSignOutError(error: AxiosError): GoodreadsSignOutErrorAction {
    return {
        type: GOODREADS_SIGN_OUT_ERROR,
        payload: error
    };
}
