import { Auth } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import { setCurrentLanguageError, setCurrentLanguageSuccess } from '../../actions/locale';
import { SET_CURRENT_LANGUAGE } from '../../constants/actions';
import { Action } from '../../types/Action';
import { SetCurrentLanguageAction } from '../../types/Action/Locale';
import { Language } from '../../types/Locale';
import { createLogger } from '../../utils';

const logger = createLogger(['epics', 'locale', 'setCurrentLanguage']);

export default (action$: ActionsObservable<SetCurrentLanguageAction>) =>
    action$.pipe(
        ofType(SET_CURRENT_LANGUAGE),
        switchMap(
            async (action: SetCurrentLanguageAction): Promise<Action> => {
                try {
                    await setCurrentLanguage(action.payload);
                    return setCurrentLanguageSuccess();
                } catch (error) {
                    logger.error(error);
                    return setCurrentLanguageError(error);
                }
            }
        )
    );

async function setCurrentLanguage(language: Language) {
    const user = await Auth.currentAuthenticatedUser();

    await Auth.updateUserAttributes(user, {
        locale: language
    });
}
