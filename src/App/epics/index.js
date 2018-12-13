import { combineEpics } from 'redux-observable';
import signIn from './auth/signIn';
import signUp from './auth/signUp';
import signUpConfirm from './auth/signUpConfirm';
import signOut from './auth/signOut';
import setCurrentUser from './auth/setCurrentUser';
import unsetCurrentUser from './auth/unsetCurrentUser';
import establishCurrentUser from './auth/establishCurrentUser';
import getWorlds from './graphql/getWorlds';
import createWorld from './graphql/createWorld';
import updateWorld from './graphql/updateWorld';
import createGame from './graphql/createGame';
import getWorld from './graphql/getWorld';
import search from './graphql/search';
import createWorldSubmit from './submit/graphql/createWorld';
import updateWorldSubmit from './submit/graphql/updateWorld';
import createGameSubmit from './submit/graphql/createGame';

export const epics = combineEpics(
    signIn,
    signUp,
    signUpConfirm,
    signOut,
    setCurrentUser,
    unsetCurrentUser,
    establishCurrentUser,
    getWorlds,
    createWorld,
    updateWorld,
    createGame,
    getWorld,
    search,
    createWorldSubmit,
    updateWorldSubmit,
    createGameSubmit
);
