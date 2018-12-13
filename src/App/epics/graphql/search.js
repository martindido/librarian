import { SEARCH_ALL, SET_SEARCH_RESULTS } from '../../constants/actions';
import { setSearchResults } from '../../actions/search';
import { ofType } from 'redux-observable';
import { debounce, switchMap, map } from 'rxjs/operators';
import { forkJoin, timer } from 'rxjs';
import { API, graphqlOperation } from 'aws-amplify';
import { searchWorlds as searchWorldsQuery, searchGames as searchGamesQuery } from '../../graphql/queries';

import type { SearchAllAction } from '../../types/Action';
import type { ActionsObservable } from 'redux-observable';

export default (action$: ActionsObservable<SearchAllAction>) =>
    action$.pipe(
        ofType(SEARCH_ALL),
        debounce(() => timer(500)),
        switchMap(
            (action: SearchAllAction) => {
                return forkJoin(
                    searchWorldsFork(action.payload),
                    searchGamesFork(action.payload)
                );
            }
        ),
        map(categories => {
            const searchResults = {};

            categories.forEach(category => {
                if (category.results.length) {
                    searchResults[category.name] = category;
                }
            });
            return setSearchResults(Object.keys(searchResults).length ? searchResults : []);
        }),
        ofType(SET_SEARCH_RESULTS)
    );

async function searchWorldsFork(value) {
    const category = {
        name: 'worlds',
        results: []
    };

    try {
        const results = await searchWorlds(value);

        results.forEach(result =>
            category.results.push({
                title: result.name,
                path: `/worlds/${ result.id }`
            })
        );
    }
    catch (error) {
        console.log('searchAll', 'world', 'error', error);
    }
    return category;
}

async function searchGamesFork(value) {
    const category = {
        name: 'games',
        results: []
    };

    try {
        const results = await searchGames(value);

        results.forEach(result =>
            category.results.push({
                title: result.name,
                path: `/worlds/${ result.world.id }/games/${ result.id }`
            })
        );
    }
    catch (error) {
        console.log('searchAll', 'game', 'error', error);
    }
    return category;
}

async function searchWorlds(value) {
    const response = await API.graphql(graphqlOperation(searchWorldsQuery, {
        filter: {
            name: {
                matchPhrasePrefix: value
            }
        }
    }));

    return response.data.searchWorlds.items;
}

async function searchGames(value) {
    const response = await API.graphql(graphqlOperation(searchGamesQuery, {
        filter: {
            name: {
                matchPhrasePrefix: value
            }
        }
    }));

    return response.data.searchGames.items;
}
