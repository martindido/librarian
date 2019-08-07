import { GET_SHELVES, GET_SHELVES_ERROR, GET_SHELVES_SUCCESS, SET_SHELVES } from '../../constants/actions';
import {
    GetShelvesAction,
    GetShelvesErrorAction,
    GetShelvesSuccessAction,
    SetShelvesAction
} from '../../types/Action/Goodreads';
import { axiosError } from '../error';
import { shelf } from '../shelf';

export const getShelvesAction: GetShelvesAction = {
    type: GET_SHELVES
};

export const getShelvesSuccessAction: GetShelvesSuccessAction = {
    type: GET_SHELVES_SUCCESS,
    payload: [shelf]
};

export const getShelvesErrorAction: GetShelvesErrorAction = {
    type: GET_SHELVES_ERROR,
    payload: axiosError
};

export const setShelvesAction: SetShelvesAction = {
    type: SET_SHELVES,
    payload: [shelf]
};
