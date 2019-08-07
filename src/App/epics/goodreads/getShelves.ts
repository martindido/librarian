import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { getShelvesError, getShelvesSuccess } from '../../actions/goodreads';
import GoodreadsClient from '../../clients/Goodreads';
import { GET_SHELVES } from '../../constants/actions';
import { Action } from '../../types/Action';
import { GetShelvesAction } from '../../types/Action/Goodreads';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'goodreads', 'signIn']);

export default (action$: ActionsObservable<GetShelvesAction>) =>
    action$.pipe(
        ofType(GET_SHELVES),
        switchMap(
            async (): Promise<Action> => {
                try {
                    return getShelvesSuccess(await getShelves());
                } catch (error) {
                    logger.error(error);
                    return getShelvesError(error);
                }
            }
        )
    );

async function getShelves() {
    const goodreadsClient = new GoodreadsClient();

    return goodreadsClient.getShelves();
}
