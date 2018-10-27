import type { User } from './User';
import type { Profile } from './Profile';

export type SetLoadingAction = {
    type: 'SET_LOADING',
    payload: boolean
};

export type SetNotFoundAction = {
    type: 'SET_NOT_FOUND',
    payload: boolean
};

export type IncrementAction = {
    type: 'INCREMENT_COUNTER',
    payload: number
};

export type DecrementAction = {
    type: 'DECREMENT_COUNTER',
    payload: number
};

export type CompleteUpdateAction = {
    type: 'COMPLETE_UPDATE_COUNTER',
    payload: number
};

export type SignInAction = {
    type: 'SIGN_IN',
    payload: User
};

export type SignUpAction = {
    type: 'SIGN_UP',
    payload: User
};

export type LogoutAction = {
    type: 'LOGOUT'
};

export type AuthenticateAction = {
    type: 'AUTHENTICATE',
    payload: boolean
};

export type SetCurrentUserAction = {
    type: 'SET_CURRENT_USER',
    payload: User
};

export type UnsetCurrentUserAction = {
    type: 'UNSET_CURRENT_USER'
};

export type EstablishCurrentUserAction = {
    type: 'ESTABLISH_CURRENT_USER'
};

export type GetCurrentProfileAction = {
    type: 'GET_CURRENT_PROFILE',
    payload: number
};

export type SetCurrentProfileAction = {
    type: 'SET_CURRENT_PROFILE',
    payload: Profile
};

export type UnsetCurrentProfileAction = {
    type: 'UNSET_CURRENT_PROFILE'
};

export type CounterAction =
    | IncrementAction
    | DecrementAction
    | CompleteUpdateAction;

export type AuthAction =
    | SignInAction
    | SignUpAction
    | LogoutAction
    | AuthenticateAction
    | SetCurrentUserAction
    | UnsetCurrentUserAction
    | EstablishCurrentUserAction;

export type ProfileAction =
    | GetCurrentProfileAction
    | SetCurrentProfileAction
    | UnsetCurrentProfileAction;

export type Action =
    | SetLoadingAction
    | SetNotFoundAction
    | CounterAction
    | AuthAction
    | ProfileAction;
