import { AxiosError } from 'axios';

import {
    getShelves,
    getShelvesError,
    getShelvesSuccess,
    goodreadsSignIn,
    goodreadsSignInError,
    goodreadsSignInSuccess,
    goodreadsSignOut,
    goodreadsSignOutError,
    goodreadsSignOutSuccess,
    setShelves
} from '../../actions/goodreads';
import { Shelf } from '../Shelf';

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

export type GetShelvesAction = {
    type: 'GET_SHELVES';
};

export type GetShelvesActionCreator = typeof getShelves;

export type GetShelvesSuccessAction = {
    type: 'GET_SHELVES_SUCCESS';
    payload: Shelf[];
};

export type GetShelvesSuccessActionCreator = typeof getShelvesSuccess;

export type GetShelvesErrorAction = {
    type: 'GET_SHELVES_ERROR';
    payload: AxiosError;
};

export type GetShelvesErrorActionCreator = typeof getShelvesError;

export type SetShelvesAction = {
    type: 'SET_SHELVES';
    payload: Shelf[];
};

export type SetShelvesActionCreator = typeof setShelves;

export type GoodreadsAction =
    | GoodreadsSignInAction
    | GoodreadsSignInSuccessAction
    | GoodreadsSignInErrorAction
    | GoodreadsSignOutAction
    | GetShelvesAction
    | GetShelvesSuccessAction
    | GetShelvesErrorAction
    | SetShelvesAction;
