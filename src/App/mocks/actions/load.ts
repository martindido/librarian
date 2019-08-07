import { LOAD_GAME, LOAD_SHELVES, LOAD_WORLD, LOAD_WORLDS } from '../../constants/actions';
import { LoadGameAction, LoadShelvesAction, LoadWorldsAction, LoadWorldAction } from '../../types/Action/Load';
import { game } from '../game';
import { world } from '../world';

export const loadShelvesAction: LoadShelvesAction = {
    type: LOAD_SHELVES
};

export const loadWorldsAction: LoadWorldsAction = {
    type: LOAD_WORLDS
};

export const loadWorldAction: LoadWorldAction = {
    type: LOAD_WORLD,
    payload: world.id
};

export const loadGameAction: LoadGameAction = {
    type: LOAD_GAME,
    payload: game.id
};
