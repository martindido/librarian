import { SIGN_UP } from '../../constants/actions';
import { signUpSuccess, signUpError } from '../../actions/auth';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { Auth } from 'aws-amplify';
import createLogger from '../../utils/logger';

import type { SignUpAction } from '../../types/Action/Auth';
import type { ActionsObservable, Promise } from 'redux-observable';

const logger = createLogger(['epics', 'auth', 'signUp']);

export default (action$: ActionsObservable<SignUpAction>) =>
    action$.pipe(
        ofType(SIGN_UP),
        switchMap(
            async (action: SignUpAction): Promise => {
                try {
                    return signUpSuccess(await signUp(action.payload));
                } catch (error) {
                    logger.error(error);
                    return signUpError(error);
                }
            }
        )
    );

async function signUp(credentials) {
    const data = await Auth.signUp({
        username: credentials.username,
        password: credentials.password,
        attributes: {
            email: credentials.email,
            nickname: credentials.username
        }
    });

    return {
        username: data.user.username
    };
}
