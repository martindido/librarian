import { Auth } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { getCurrentLanguageError, getCurrentLanguageSuccess } from '../../actions/locale';
import { GET_CURRENT_LANGUAGE } from '../../constants/actions';
import { Action } from '../../types/Action';
import { GetCurrentLanguageAction } from '../../types/Action/Locale';
import createLogger from '../../utils/logger';

const logger = createLogger(['epics', 'locale', 'getCurrentLanguage']);

export default (action$: ActionsObservable<GetCurrentLanguageAction>) =>
    action$.pipe(
        ofType(GET_CURRENT_LANGUAGE),
        switchMap(
            async (action: GetCurrentLanguageAction): Promise<Action> => {
                try {
                    return getCurrentLanguageSuccess(await getCurrentLanguage());
                } catch (error) {
                    logger.error(error);
                    return getCurrentLanguageError(error);
                }
            }
        )
    );

async function getCurrentLanguage() {
    const user = await Auth.currentUserInfo();

    if (user && user.attributes.locale) {
        return user.attributes.locale;
    }
    return 'en';
}
