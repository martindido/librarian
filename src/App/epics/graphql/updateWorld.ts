import { API, graphqlOperation } from 'aws-amplify';
import { ActionsObservable, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { updateWorldError, updateWorldSuccess } from '../../actions/graphql';
import { UPDATE_WORLD } from '../../constants/actions';
import { updateWorld as updateWorldMutation } from '../../graphql/mutations';
import { Action } from '../../types/Action';
import { UpdateWorldAction } from '../../types/Action/GraphQL';
import { UpdateWorldResult } from '../../types/Api';
import { UpdateWorldInput } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'updateWorld']);

export default (action$: ActionsObservable<UpdateWorldAction>) =>
    action$.pipe(
        ofType(UPDATE_WORLD),
        switchMap(
            async (action: UpdateWorldAction): Promise<Action> => {
                try {
                    const world = await updateWorld(action.payload);

                    return updateWorldSuccess(world);
                } catch (error) {
                    logger.error(error);
                    return updateWorldError(error.errors ? error.errors : [error]);
                }
            }
        )
    );

async function updateWorld(input: UpdateWorldInput) {
    const response = (await API.graphql(
        graphqlOperation(updateWorldMutation, {
            input
        })
    )) as UpdateWorldResult;
    const world = response.data.updateWorld;

    return {
        ...world,
        games: world.games.items
    };
}
