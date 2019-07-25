import { ofType, ActionsObservable } from 'redux-observable';
import { map, mergeMap, startWith, take } from 'rxjs/operators';

import { listWorlds, setWorlds } from '../../../actions/graphql';
import { setLoading, setNotFound } from '../../../actions/routing';
import { LIST_WORLDS_ERROR, LIST_WORLDS_SUCCESS, LOAD_WORLDS, SET_LOADING } from '../../../constants/actions';
import { ListWorldsErrorAction, ListWorldsSuccessAction } from '../../../types/Action/GraphQL';
import { LoadWorldsAction } from '../../../types/Action/Load';

export default (action$: ActionsObservable<LoadWorldsAction | ListWorldsSuccessAction | ListWorldsErrorAction>) =>
    action$.pipe(
        ofType(LOAD_WORLDS),
        mergeMap((loadWorldsAction) => [setLoading(true), loadWorldsAction]),
        mergeMap((SetLoadingOrLoadWorldsAction) => {
            if (SetLoadingOrLoadWorldsAction.type === SET_LOADING) {
                return [SetLoadingOrLoadWorldsAction];
            }
            return action$.pipe(
                ofType(LIST_WORLDS_SUCCESS, LIST_WORLDS_ERROR),
                take(1),
                map((listWorldsSuccessOrErrorAction) =>
                    listWorldsSuccessOrErrorAction.type === LIST_WORLDS_SUCCESS
                        ? setWorlds(listWorldsSuccessOrErrorAction.payload)
                        : setNotFound(true)
                ),
                mergeMap((setWorldsOrNotFoundAction) => [setWorldsOrNotFoundAction, setLoading(false)]),
                startWith(listWorlds())
            );
        })
    );
