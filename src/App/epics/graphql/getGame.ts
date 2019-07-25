import { API, graphqlOperation, Storage } from 'aws-amplify';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { getGameError, getGameSuccess } from '../../actions/graphql';
import { GET_GAME } from '../../constants/actions';
import { getGame as getGameQuery } from '../../graphql/queries';
import { Action } from '../../types/Action';
import { GetGameAction } from '../../types/Action/GraphQL';
import { GetGameResult } from '../../types/Api';
import { GetGameQueryVariables } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'getGame']);

export default (action$: ActionsObservable<GetGameAction>) =>
    action$.pipe(
        ofType(GET_GAME),
        switchMap(
            async (action: GetGameAction): Promise<Action> => {
                try {
                    const game = await getGame(action.payload);

                    return game ? getGameSuccess(game) : getGameError([new Error('Not Found')]);
                } catch (error) {
                    logger.error(error);
                    return getGameError([error]);
                }
            }
        )
    );

async function getGame(variables: GetGameQueryVariables) {
    const response = (await API.graphql(graphqlOperation(getGameQuery, variables))) as GetGameResult;
    const game = response.data.getGame;

    try {
        game.logo.src = await Storage.get(`${game.id}.${game.logo.extension}`) as string;
    } catch (error) {
        // NOOP
    }
    return game;
}
