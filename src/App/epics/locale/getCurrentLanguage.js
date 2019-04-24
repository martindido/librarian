import { GET_CURRENT_LANGUAGE } from '../../constants/actions';
import { getCurrentLanguageSuccess, getCurrentLanguageError } from '../../actions/locale';
import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { Auth } from 'aws-amplify';
import createLogger from '../../utils/logger';

import type { ActionsObservable, Promise } from 'redux-observable';
import type { GetCurrentLanguageAction } from '../../types/Action/Locale';

const logger = createLogger(['epics', 'locale', 'getCurrentLanguage']);

export default (action$: ActionsObservable<GetCurrentLanguageAction>) =>
    action$.pipe(
        ofType(GET_CURRENT_LANGUAGE),
        switchMap(
            async (action: GetCurrentLanguageAction): Promise => {
                try {
                    return getCurrentLanguageSuccess(await getCurrentLanguage());
                } catch (error) {
                    logger.error(error);
                    return getCurrentLanguageError(error);
                }
            }
        )
    );

async function getCurrentLanguage(language) {
    const user = await Auth.currentUserInfo();

    return user.attributes.locale;
}
