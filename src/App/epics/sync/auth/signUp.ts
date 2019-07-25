import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, startWith, take, tap } from 'rxjs/operators';

import { signUp } from '../../../actions/auth';
import { SIGN_UP_ERROR, SIGN_UP_SUCCESS, SIGN_UP_SYNC } from '../../../constants/actions';
import { SignUpErrorAction, SignUpSuccessAction } from '../../../types/Action/Auth';
import { SignUpSyncAction } from '../../../types/Action/Sync';

export default (action$: ActionsObservable<SignUpSyncAction | SignUpSuccessAction | SignUpErrorAction>) =>
    action$
        .ofType<SignUpSyncAction>(SIGN_UP_SYNC)
        .pipe(
            mergeMap((signUpSyncAction) =>
                action$
                    .ofType<SignUpSuccessAction | SignUpErrorAction>(SIGN_UP_SUCCESS, SIGN_UP_ERROR)
                    .pipe(
                        take(1),
                        onError(SIGN_UP_ERROR, signUpSyncAction),
                        ofType(SIGN_UP_SUCCESS),
                        onSuccess(signUpSyncAction),
                        startWith(signUp(signUpSyncAction.payload.credentials))
                    )
            )
        );

function onError(type: string, signUpSyncAction: SignUpSyncAction) {
    return tap((resultAction: SignUpSuccessAction | SignUpErrorAction) => {
        if (resultAction.type === type) {
            signUpSyncAction.meta.onError(resultAction.payload);
        }
    });
}

function onSuccess(signUpSyncAction: SignUpSyncAction) {
    return tap((signUpSuccessAction: SignUpSuccessAction) =>
        signUpSyncAction.meta.onSuccess(signUpSuccessAction.payload)
    );
}
