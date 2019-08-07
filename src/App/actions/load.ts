import { LOAD_GAME, LOAD_SHELVES, LOAD_WORLD, LOAD_WORLDS } from '../constants/actions';
import { LoadGameAction, LoadShelvesAction, LoadWorldsAction, LoadWorldAction } from '../types/Action/Load';

export function loadShelves(): LoadShelvesAction {
    return {
        type: LOAD_SHELVES
    };
}

export function loadWorlds(): LoadWorldsAction {
    return {
        type: LOAD_WORLDS
    };
}

export function loadWorld(id: string): LoadWorldAction {
    return {
        type: LOAD_WORLD,
        payload: id
    };
}

export function loadGame(id: string): LoadGameAction {
    return {
        type: LOAD_GAME,
        payload: id
    };
}
