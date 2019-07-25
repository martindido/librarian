import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { unsetCurrentUser } from '../../actions/auth';
import GoodreadsClient from '../../clients/Goodreads';
import { GOODREADS_SIGN_OUT } from '../../constants/actions';
import { Action } from '../../types/Action';
import { GoodreadsSignOutAction } from '../../types/Action/Goodreads';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'goodreads', 'signOut']);

export default (action$: ActionsObservable<GoodreadsSignOutAction>) =>
    action$.pipe(
        ofType(GOODREADS_SIGN_OUT),
        switchMap(
            async (): Promise<Action> => {
                try {
                    logger.info('');
                    await goodreadsSignOut();
                } catch (error) {
                    logger.error(error);
                }
                return unsetCurrentUser();
            }
        )
    );

function goodreadsSignOut() {
    const goodreadsClient = new GoodreadsClient();

    return goodreadsClient.signOut();
}
