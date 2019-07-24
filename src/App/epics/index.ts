import { combineEpics } from 'redux-observable';

import authenticate from './auth/authenticate';
import signIn from './auth/signIn';
import signOut from './auth/signOut';
import signUp from './auth/signUp';
import signUpConfirm from './auth/signUpConfirm';
import goodreadsSignIn from './goodreads/goodreadsSignIn';
import goodreadsSignOut from './goodreads/goodreadsSignOut';
import createGame from './graphql/createGame';
import createWorld from './graphql/createWorld';
import getGame from './graphql/getGame';
import getWorld from './graphql/getWorld';
import listWorlds from './graphql/listWorlds';
import search from './graphql/search';
import updateGame from './graphql/updateGame';
import updateWorld from './graphql/updateWorld';
import loadGame from './load/graphql/getGame';
import loadWorld from './load/graphql/getWorld';
import loadWorlds from './load/graphql/listWorlds';
import getCurrentLanguage from './locale/getCurrentLanguage';
import setCurrentLanguage from './locale/setCurrentLanguage';
import uploadFile from './storage/uploadFile';
import authenticateSync from './sync/auth/authenticate';
import signInSync from './sync/auth/signIn';
import signUpSync from './sync/auth/signUp';
import signUpConfirmSync from './sync/auth/signUpConfirm';
import createGameSync from './sync/graphql/createGame';
import createWorldSync from './sync/graphql/createWorld';
import updateGameSync from './sync/graphql/updateGame';
import updateWorldSync from './sync/graphql/updateWorld';
import getCurrentLanguageSync from './sync/locale/getCurrentLanguage';

export const epics = combineEpics(
    authenticate,
    signIn,
    signUp,
    signUpConfirm,
    signOut,
    goodreadsSignIn,
    goodreadsSignOut,
    listWorlds,
    createWorld,
    updateWorld,
    createGame,
    updateGame,
    loadWorlds,
    loadWorld,
    getWorld,
    loadGame,
    getGame,
    search,
    authenticateSync,
    signInSync,
    signUpSync,
    signUpConfirmSync,
    createWorldSync,
    updateWorldSync,
    createGameSync,
    updateGameSync,
    getCurrentLanguageSync,
    uploadFile,
    setCurrentLanguage,
    getCurrentLanguage
);
