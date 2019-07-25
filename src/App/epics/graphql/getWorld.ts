import { API, graphqlOperation, Storage } from 'aws-amplify';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { getWorldError, getWorldSuccess } from '../../actions/graphql';
import { GET_WORLD } from '../../constants/actions';
import { getWorld as getWorldQuery } from '../../graphql/queries';
import { Action } from '../../types/Action';
import { GetWorldAction } from '../../types/Action/GraphQL';
import { GetWorldResult } from '../../types/Api';
import { Game } from '../../types/Game';
import { GetWorldQueryVariables } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'getWorld']);

export default (action$: ActionsObservable<GetWorldAction>) =>
    action$.pipe(
        ofType(GET_WORLD),
        switchMap(
            async (action: GetWorldAction): Promise<Action> => {
                try {
                    const world = await getWorld(action.payload);

                    return world ? getWorldSuccess(world) : getWorldError([new Error('Not Found')]);
                } catch (error) {
                    logger.error(error);
                    return getWorldError([error]);
                }
            }
        )
    );

async function getWorld(variables: GetWorldQueryVariables) {
    const response = (await API.graphql(graphqlOperation(getWorldQuery, variables))) as GetWorldResult;
    const world = {
        ...response.data.getWorld,
        games: await Promise.all(
            response.data.getWorld.games.items.map(async (game: Game) => {
                try {
                    game.logo.src = (await Storage.get(`${game.id}.${game.logo.extension}`)) as string;
                } catch (error) {}
                return game;
            })
        )
    };

    try {
        world.logo.src = (await Storage.get(`${world.id}.${world.logo.extension}`)) as string;
    } catch (error) {}
    return world;
}
