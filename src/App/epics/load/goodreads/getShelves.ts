import { ofType, ActionsObservable } from 'redux-observable';
import { map, mergeMap, startWith, take } from 'rxjs/operators';

import { getShelves, setShelves } from '../../../actions/goodreads';
import { setLoading, setNotFound } from '../../../actions/routing';
import { GET_SHELVES_ERROR, GET_SHELVES_SUCCESS, LOAD_SHELVES, SET_LOADING } from '../../../constants/actions';
import { GetShelvesErrorAction, GetShelvesSuccessAction } from '../../../types/Action/Goodreads';
import { LoadShelvesAction } from '../../../types/Action/Load';

export default (action$: ActionsObservable<LoadShelvesAction | GetShelvesSuccessAction | GetShelvesErrorAction>) =>
    action$.pipe(
        ofType(LOAD_SHELVES),
        mergeMap((loadShelvesAction) => [setLoading(true), loadShelvesAction]),
        mergeMap((SetLoadingOrLoadShelvesAction) => {
            if (SetLoadingOrLoadShelvesAction.type === SET_LOADING) {
                return [SetLoadingOrLoadShelvesAction];
            }
            return action$.pipe(
                ofType(GET_SHELVES_SUCCESS, GET_SHELVES_ERROR),
                take(1),
                map((getShelvesSuccessOrErrorAction) =>
                    getShelvesSuccessOrErrorAction.type === GET_SHELVES_SUCCESS
                        ? setShelves(getShelvesSuccessOrErrorAction.payload)
                        : setNotFound(true)
                ),
                mergeMap((setWorldsOrNotFoundAction) => [setWorldsOrNotFoundAction, setLoading(false)]),
                startWith(getShelves())
            );
        })
    );
