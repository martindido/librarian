import { graphqlOperation, API, Storage } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { listWorldsError, listWorldsSuccess } from '../../actions/graphql';
import { LIST_WORLDS } from '../../constants/actions';
import { listWorlds as listWorldsQuery } from '../../graphql/queries';
import { Action } from '../../types/Action';
import { ListWorldsAction } from '../../types/Action/GraphQL';
import { ListWorldsResult } from '../../types/Api';
import createLogger from '../../utils/logger';

const logger = createLogger(['epics', 'graphql', 'listWorlds']);

export default (action$: ActionsObservable<ListWorldsAction>) =>
    action$.pipe(
        ofType(LIST_WORLDS),
        switchMap(
            async (): Promise<Action> => {
                try {
                    const worlds = await listWorlds();

                    return listWorldsSuccess(worlds);
                } catch (error) {
                    logger.error(error);
                    return listWorldsError([error]);
                }
            }
        )
    );

async function listWorlds() {
    const response = (await API.graphql(
        graphqlOperation(listWorldsQuery, {
            limit: 100
        })
    )) as ListWorldsResult;
    const worlds = response.data.listWorlds.items;

    for (const world of worlds) {
        try {
            world.logo.src = (await Storage.get(`${world.id}.${world.logo.extension}`)) as string;
        } catch (error) {
            // NOOP
        }
    }
    return worlds;
}
