import { AxiosError } from 'axios';

import {
    GET_SHELVES,
    GET_SHELVES_ERROR,
    GET_SHELVES_SUCCESS,
    GOODREADS_SIGN_IN,
    GOODREADS_SIGN_IN_ERROR,
    GOODREADS_SIGN_IN_SUCCESS,
    GOODREADS_SIGN_OUT,
    GOODREADS_SIGN_OUT_ERROR,
    GOODREADS_SIGN_OUT_SUCCESS,
    SET_SHELVES
} from '../constants/actions';
import {
    GetShelvesAction,
    GetShelvesErrorAction,
    GetShelvesSuccessAction,
    GoodreadsSignInAction,
    GoodreadsSignInErrorAction,
    GoodreadsSignInSuccessAction,
    GoodreadsSignOutAction,
    GoodreadsSignOutErrorAction,
    GoodreadsSignOutSuccessAction,
    SetShelvesAction
} from '../types/Action/Goodreads';
import { Shelf } from '../types/Shelf';

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

export function getShelves(): GetShelvesAction {
    return {
        type: GET_SHELVES
    };
}

export function getShelvesSuccess(shelves: Shelf[]): GetShelvesSuccessAction {
    return {
        type: GET_SHELVES_SUCCESS,
        payload: shelves
    };
}

export function getShelvesError(error: AxiosError): GetShelvesErrorAction {
    return {
        type: GET_SHELVES_ERROR,
        payload: error
    };
}

export function setShelves(shelves: Shelf[]): SetShelvesAction {
    return {
        type: SET_SHELVES,
        payload: shelves
    };
}
