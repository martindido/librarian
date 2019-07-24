import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { map } from 'rxjs/operators';

import { goodreadsSignInError, goodreadsSignInSuccess } from '../../actions/goodreads';
import GoodreadsClient from '../../clients/Goodreads';
import { GOODREADS_SIGN_IN } from '../../constants/actions';
import { Action } from '../../types/Action';
import { GoodreadsSignInAction } from '../../types/Action/Goodreads';
import createLogger from '../../utils/logger';

const logger = createLogger(['epics', 'goodreads', 'signIn']);

export default (action$: ActionsObservable<GoodreadsSignInAction>) =>
    action$.pipe(
        ofType(GOODREADS_SIGN_IN),
        map(
            (action: GoodreadsSignInAction): Action => {
                try {
                    logger.info('');
                    goodreadsSignIn();
                    return goodreadsSignInSuccess();
                } catch (error) {
                    logger.error(error);
                    return goodreadsSignInError(error);
                }
            }
        )
    );

function goodreadsSignIn() {
    const goodreadsClient = new GoodreadsClient();

    return goodreadsClient.signIn();
}
