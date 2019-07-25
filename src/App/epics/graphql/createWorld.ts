import { graphqlOperation, API } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { createWorldError, createWorldSuccess } from '../../actions/graphql';
import { CREATE_WORLD } from '../../constants/actions';
import { createWorld as createWorldMutation } from '../../graphql/mutations';
import { Action } from '../../types/Action';
import { CreateWorldAction } from '../../types/Action/GraphQL';
import { CreateWorldResult } from '../../types/Api';
import { CreateWorldInput } from '../../types/GraphQL';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'graphql', 'createWorld']);

export default (action$: ActionsObservable<CreateWorldAction>) =>
    action$.pipe(
        ofType(CREATE_WORLD),
        switchMap(
            async (action: CreateWorldAction): Promise<Action> => {
                try {
                    const world = await createWorld(action.payload);

                    return createWorldSuccess(world);
                } catch (error) {
                    logger.error(error);
                    return createWorldError(error.errors ? error.errors : [error]);
                }
            }
        )
    );

async function createWorld(input: CreateWorldInput) {
    const response = (await API.graphql(
        graphqlOperation(createWorldMutation, {
            input
        })
    )) as CreateWorldResult;
    const world = response.data.createWorld;

    return {
        ...world,
        games: world.games.items
    };
}
