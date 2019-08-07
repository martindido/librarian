import { loadGame, loadShelves, loadWorld, loadWorlds } from '../../actions/load';

export type LoadShelvesAction = {
    type: 'LOAD_SHELVES';
};

export type LoadShelvesActionCreator = typeof loadShelves;

export type LoadWorldsAction = {
    type: 'LOAD_WORLDS';
};

export type LoadWorldsActionCreator = typeof loadWorlds;

export type LoadWorldAction = {
    type: 'LOAD_WORLD';
    payload: string;
};

export type LoadWorldActionCreator = typeof loadWorld;

export type LoadGameAction = {
    type: 'LOAD_GAME';
    payload: string;
};

export type LoadGameActionCreator = typeof loadGame;

export type LoadAction = LoadWorldsAction | LoadWorldAction | LoadGameAction;
