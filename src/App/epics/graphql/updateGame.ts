import { graphqlOperation, API } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { updateGameError, updateGameSuccess } from '../../actions/graphql';
import { UPDATE_GAME } from '../../constants/actions';
import { updateGame as updateGameMutation } from '../../graphql/mutations';
import { Action } from '../../types/Action';
import { UpdateGameAction } from '../../types/Action/GraphQL';
import { UpdateGameResult } from '../../types/Api';
import { UpdateGameInput } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'updateGame']);

export default (action$: ActionsObservable<UpdateGameAction>) =>
    action$.pipe(
        ofType(UPDATE_GAME),
        switchMap(
            async (action: UpdateGameAction): Promise<Action> => {
                try {
                    const game = await updateGame(action.payload);

                    return updateGameSuccess(game);
                } catch (error) {
                    logger.error(error);
                    return updateGameError(error.errors ? error.errors : [error]);
                }
            }
        )
    );

async function updateGame(input: UpdateGameInput) {
    const response = (await API.graphql(
        graphqlOperation(updateGameMutation, {
            input
        })
    )) as UpdateGameResult;

    return response.data.updateGame;
}
