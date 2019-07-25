import { SIGN_UP_CONFIRM } from '../../constants/actions';
import { signUpConfirmSuccess, signUpConfirmError } from '../../actions/auth';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { Auth } from 'aws-amplify';
import { createLogger } from '../../utils';
import { SignUpConfirmAction } from '../../types/Action/Auth';
import { ActionsObservable } from 'redux-observable';
import { Action } from '../../types/Action';
import { Confirmation } from '../../types/Auth';

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
