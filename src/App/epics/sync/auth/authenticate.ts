import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, startWith, take, tap } from 'rxjs/operators';

import { authenticate } from '../../../actions/auth';
import { AUTHENTICATE_ERROR, AUTHENTICATE_SUCCESS, AUTHENTICATE_SYNC } from '../../../constants/actions';
import { AuthenticateErrorAction, AuthenticateSuccessAction } from '../../../types/Action/Auth';
import { AuthenticateSyncAction } from '../../../types/Action/Sync';

export default (
    action$: ActionsObservable<AuthenticateSyncAction | AuthenticateSuccessAction | AuthenticateErrorAction>
) =>
    action$.ofType<AuthenticateSyncAction>(AUTHENTICATE_SYNC).pipe(
        mergeMap((authenticateSyncAction: AuthenticateSyncAction) =>
            action$
                .ofType<AuthenticateSuccessAction | AuthenticateErrorAction>(AUTHENTICATE_SUCCESS, AUTHENTICATE_ERROR)
                .pipe(
                    take(1),
                    onError(AUTHENTICATE_ERROR, authenticateSyncAction),
                    ofType(AUTHENTICATE_SUCCESS),
                    onSuccess(authenticateSyncAction as AuthenticateSyncAction),
                    startWith(authenticate((authenticateSyncAction as AuthenticateSyncAction).payload.authenticator))
                )
        )
    );

function onError(type: string, authenticateSyncAction: AuthenticateSyncAction) {
    return tap((resultAction: AuthenticateSuccessAction | AuthenticateErrorAction) => {
        if (resultAction.type === type) {
            authenticateSyncAction.meta.onError(resultAction.payload);
        }
    });
}

function onSuccess(authenticateSyncAction: AuthenticateSyncAction) {
    return tap((authenticateSuccessAction: AuthenticateSuccessAction) =>
        authenticateSyncAction.meta.onSuccess(authenticateSuccessAction.payload)
    );
}
