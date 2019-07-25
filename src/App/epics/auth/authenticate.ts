import { Auth } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { mergeMap, switchMap } from 'rxjs/operators';

import { authenticateError, authenticateSuccess, setCurrentUser, unsetCurrentUser } from '../../actions/auth';
import { AUTHENTICATE, AUTHENTICATE_SUCCESS } from '../../constants/actions';
import { Action } from '../../types/Action';
import { AuthenticateAction } from '../../types/Action/Auth';
import { Authenticator } from '../../types/Auth';
import { User } from '../../types/User';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'auth', 'authenticate']);

export default (action$: ActionsObservable<AuthenticateAction>) =>
    action$.pipe(
        ofType(AUTHENTICATE),
        switchMap(
            async (action: AuthenticateAction): Promise<Action> => {
                try {
                    return authenticateSuccess(await authenticate(action.payload));
                } catch (error) {
                    logger.error(error);
                    return authenticateError(error);
                }
            }
        ),
        mergeMap((action) => {
            const actions = [action];

            if (action.type === AUTHENTICATE_SUCCESS) {
                actions.unshift(setCurrentUser(action.payload));
            } else {
                actions.unshift(unsetCurrentUser());
            }
            return actions;
        })
    );

async function authenticate(authenticator?: Authenticator) {
    const auth = authenticator || Auth;
    const session = await auth.currentSession();
    const token = session.getIdToken().decodePayload();
    const isAdmin = !!token['cognito:groups'] && token['cognito:groups'].includes('admins');
    const user: User = {
        username: token['cognito:username']
    };

    if (isAdmin) {
        user.isAdmin = isAdmin;
    }
    return user;
}
