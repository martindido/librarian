import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap, startWith, take, tap } from 'rxjs/operators';

import { getCurrentLanguage } from '../../../actions/locale';
import {
    GET_CURRENT_LANGUAGE_ERROR,
    GET_CURRENT_LANGUAGE_SUCCESS,
    GET_CURRENT_LANGUAGE_SYNC
} from '../../../constants/actions';
import { GetCurrentLanguageErrorAction, GetCurrentLanguageSuccessAction } from '../../../types/Action/Locale';
import { GetCurrentLanguageSyncAction } from '../../../types/Action/Sync';

export default (
    action$: ActionsObservable<
        GetCurrentLanguageSyncAction | GetCurrentLanguageSuccessAction | GetCurrentLanguageErrorAction
    >
) =>
    action$.ofType<GetCurrentLanguageSyncAction>(GET_CURRENT_LANGUAGE_SYNC).pipe(
        mergeMap((getCurrentLanguageSyncAction) =>
            action$
                .ofType<GetCurrentLanguageSuccessAction | GetCurrentLanguageErrorAction>(
                    GET_CURRENT_LANGUAGE_SUCCESS,
                    GET_CURRENT_LANGUAGE_ERROR
                )
                .pipe(
                    take(1),
                    onError(GET_CURRENT_LANGUAGE_ERROR, getCurrentLanguageSyncAction),
                    ofType(GET_CURRENT_LANGUAGE_SUCCESS),
                    onSuccess(getCurrentLanguageSyncAction),
                    startWith(getCurrentLanguage())
                )
        )
    );

function onError(type: string, getCurrentLanguageSyncAction: GetCurrentLanguageSyncAction) {
    return tap((resultAction: GetCurrentLanguageSuccessAction | GetCurrentLanguageErrorAction) => {
        if (resultAction.type === type) {
            getCurrentLanguageSyncAction.meta.onError(resultAction.payload);
        }
    });
}

function onSuccess(getCurrentLanguageSyncAction: GetCurrentLanguageSyncAction) {
    return tap((getCurrentLanguageSuccessAction: GetCurrentLanguageSuccessAction) =>
        getCurrentLanguageSyncAction.meta.onSuccess(getCurrentLanguageSuccessAction.payload)
    );
}
