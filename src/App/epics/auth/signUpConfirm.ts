import { Auth } from 'aws-amplify';
import { ofType } from 'redux-observable';
import { ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { signUpConfirmError, signUpConfirmSuccess } from '../../actions/auth';
import { SIGN_UP_CONFIRM } from '../../constants/actions';
import { Action } from '../../types/Action';
import { SignUpConfirmAction } from '../../types/Action/Auth';
import { Confirmation } from '../../types/Auth';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'auth', 'signUpConfirm']);

export default (action$: ActionsObservable<SignUpConfirmAction>) =>
    action$.pipe(
        ofType(SIGN_UP_CONFIRM),
        switchMap(
            async (action: SignUpConfirmAction): Promise<Action> => {
                try {
                    return signUpConfirmSuccess(await signUpConfirm(action.payload));
                } catch (error) {
                    logger.error(error);
                    return signUpConfirmError(error);
                }
            }
        )
    );

async function signUpConfirm(confirmation: Confirmation) {
    return await Auth.confirmSignUp(confirmation.username, confirmation.code);
}
