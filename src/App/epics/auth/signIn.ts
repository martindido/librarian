import { Auth } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { signInError, signInSuccess } from '../../actions/auth';
import { SIGN_IN } from '../../constants/actions';
import { Action } from '../../types/Action';
import { SignInAction } from '../../types/Action/Auth';
import { Credentials } from '../../types/Auth';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'auth', 'signIn']);

export default (action$: ActionsObservable<SignInAction>) =>
    action$.pipe(
        ofType(SIGN_IN),
        switchMap(
            async (action: SignInAction): Promise<Action> => {
                try {
                    return signInSuccess(await signIn(action.payload));
                } catch (error) {
                    logger.error(error);
                    return signInError(error);
                }
            }
        )
    );

async function signIn(credentials: Credentials) {
    const data = await Auth.signIn(credentials.username, credentials.password);

    return {
        username: data.username
    };
}
