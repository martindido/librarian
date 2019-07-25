import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, startWith, take, tap } from 'rxjs/operators';

import { signIn } from '../../../actions/auth';
import { SIGN_IN_ERROR, SIGN_IN_SUCCESS, SIGN_IN_SYNC } from '../../../constants/actions';
import { SignInErrorAction, SignInSuccessAction } from '../../../types/Action/Auth';
import { SignInSyncAction } from '../../../types/Action/Sync';

export default (action$: ActionsObservable<SignInSyncAction | SignInSuccessAction | SignInErrorAction>) =>
    action$
        .ofType<SignInSyncAction>(SIGN_IN_SYNC)
        .pipe(
            mergeMap((signInSyncAction: SignInSyncAction) =>
                action$
                    .ofType<SignInSuccessAction | SignInErrorAction>(SIGN_IN_SUCCESS, SIGN_IN_ERROR)
                    .pipe(
                        take(1),
                        onError(SIGN_IN_ERROR, signInSyncAction),
                        ofType(SIGN_IN_SUCCESS),
                        onSuccess(signInSyncAction),
                        startWith(signIn(signInSyncAction.payload.credentials))
                    )
            )
        );

function onError(type: string, signInSyncAction: SignInSyncAction) {
    return tap((resultAction: SignInSuccessAction | SignInErrorAction) => {
        if (resultAction.type === type) {
            signInSyncAction.meta.onError(resultAction.payload);
        }
    });
}

function onSuccess(signInSyncAction: SignInSyncAction) {
    return tap((signInSuccessAction: SignInSuccessAction) =>
        signInSyncAction.meta.onSuccess(signInSuccessAction.payload)
    );
}
