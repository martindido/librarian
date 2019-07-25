import { ofType, ActionsObservable } from 'redux-observable';
import { map, mergeMap, startWith, take } from 'rxjs/operators';

import { getGame, setGame } from '../../../actions/graphql';
import { setLoading, setNotFound } from '../../../actions/routing';
import { GET_GAME_ERROR, GET_GAME_SUCCESS, LOAD_GAME, SET_LOADING } from '../../../constants/actions';
import { GetGameErrorAction, GetGameSuccessAction } from '../../../types/Action/GraphQL';
import { LoadGameAction } from '../../../types/Action/Load';

export default (action$: ActionsObservable<LoadGameAction | GetGameSuccessAction | GetGameErrorAction>) =>
    action$.pipe(
        ofType(LOAD_GAME),
        mergeMap((loadGameAction) => [setLoading(true), loadGameAction]),
        mergeMap((SetLoadingOrLoadGameAction) => {
            if (SetLoadingOrLoadGameAction.type === SET_LOADING) {
                return [SetLoadingOrLoadGameAction];
            }
            return action$.pipe(
                ofType(GET_GAME_SUCCESS, GET_GAME_ERROR),
                take(1),
                map((loadGameSuccessOrErrorAction) =>
                    loadGameSuccessOrErrorAction.type === GET_GAME_SUCCESS
                        ? setGame(loadGameSuccessOrErrorAction.payload)
                        : setNotFound(true)
                ),
                mergeMap((setGameOrNotFoundAction) => [setGameOrNotFoundAction, setLoading(false)]),
                startWith(getGame((SetLoadingOrLoadGameAction as LoadGameAction).payload))
            );
        })
    );
