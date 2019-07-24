import { Auth } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { unsetCurrentUser } from '../../actions/auth';
import { SIGN_OUT } from '../../constants/actions';
import { Action } from '../../types/Action';
import { SignOutAction } from '../../types/Action/Auth';
import createLogger from '../../utils/logger';

const logger = createLogger(['epics', 'auth', 'signOut']);

export default (action$: ActionsObservable<SignOutAction>) =>
    action$.pipe(
        ofType(SIGN_OUT),
        switchMap(
            async (): Promise<Action> => {
                try {
                    await Auth.signOut();
                } catch (error) {
                    logger.error(error);
                }
                return unsetCurrentUser();
            }
        )
    );
