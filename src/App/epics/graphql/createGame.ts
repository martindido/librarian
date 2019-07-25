import { graphqlOperation, API } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { createGameError, createGameSuccess } from '../../actions/graphql';
import { CREATE_GAME } from '../../constants/actions';
import { createGame as createGameMutation } from '../../graphql/mutations';
import { Action } from '../../types/Action';
import { CreateGameAction } from '../../types/Action/GraphQL';
import { CreateGameResult } from '../../types/Api';
import { CreateGameInput } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'createGame']);

export default (action$: ActionsObservable<CreateGameAction>) =>
    action$.pipe(
        ofType(CREATE_GAME),
        switchMap(
            async (action: CreateGameAction): Promise<Action> => {
                try {
                    const game = await createGame(action.payload);

                    return createGameSuccess(game);
                } catch (error) {
                    logger.error(error);
                    return createGameError(error.errors ? error.errors : [error]);
                }
            }
        )
    );

async function createGame(input: CreateGameInput) {
    const response = (await API.graphql(
        graphqlOperation(createGameMutation, {
            input
        })
    )) as CreateGameResult;

    return response.data.createGame;
}
