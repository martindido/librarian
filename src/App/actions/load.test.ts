import { loadGameAction, loadShelvesAction, loadWorldsAction, loadWorldAction } from '../mocks/actions/load';
import { game } from '../mocks/game';
import { world } from '../mocks/world';

import * as actionCreators from './load';

describe('.loadShelves', () => {
    it('returns the corresponding action', () => {
        expect(actionCreators.loadShelves()).toEqual(loadShelvesAction);
    });
});

describe('.loadWorlds', () => {
    it('returns the corresponding action', () => {
        expect(actionCreators.loadWorlds()).toEqual(loadWorldsAction);
    });
});

describe('.loadWorld', () => {
    it('returns the corresponding action', () => {
        expect(actionCreators.loadWorld(world.id)).toEqual(loadWorldAction);
    });
});

describe('.loadGame', () => {
    it('returns the corresponding action', () => {
        expect(actionCreators.loadGame(game.id)).toEqual(loadGameAction);
    });
});
