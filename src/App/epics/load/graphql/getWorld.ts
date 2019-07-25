import { ofType, ActionsObservable } from 'redux-observable';
import { map, mergeMap, startWith, take } from 'rxjs/operators';

import { getWorld, setWorld } from '../../../actions/graphql';
import { setLoading, setNotFound } from '../../../actions/routing';
import { GET_WORLD_ERROR, GET_WORLD_SUCCESS, LOAD_WORLD, SET_LOADING } from '../../../constants/actions';
import { GetWorldErrorAction, GetWorldSuccessAction } from '../../../types/Action/GraphQL';
import { LoadWorldAction } from '../../../types/Action/Load';

export default (action$: ActionsObservable<LoadWorldAction | GetWorldSuccessAction | GetWorldErrorAction>) =>
    action$.pipe(
        ofType(LOAD_WORLD),
        mergeMap((loadWorldAction) => [setLoading(true), loadWorldAction]),
        mergeMap((SetLoadingOrLoadWorldAction) => {
            if (SetLoadingOrLoadWorldAction.type === SET_LOADING) {
                return [SetLoadingOrLoadWorldAction];
            }
            return action$.pipe(
                ofType(GET_WORLD_SUCCESS, GET_WORLD_ERROR),
                take(1),
                map((loadWorldSuccessOrErrorAction) =>
                    loadWorldSuccessOrErrorAction.type === GET_WORLD_SUCCESS
                        ? setWorld(loadWorldSuccessOrErrorAction.payload)
                        : setNotFound(true)
                ),
                mergeMap((setWorldOrNotFoundAction) => [setWorldOrNotFoundAction, setLoading(false)]),
                startWith(getWorld((SetLoadingOrLoadWorldAction as LoadWorldAction).payload))
            );
        })
    );
