import { graphqlOperation, API } from 'aws-amplify';
import { ofType, ActionsObservable } from 'redux-observable';
import { forkJoin, timer } from 'rxjs';
import { debounce, map, switchMap } from 'rxjs/operators';

import { setSearchResults } from '../../actions/search';
import { SEARCH_ALL, SET_SEARCH_RESULTS } from '../../constants/actions';
import { searchGames as searchGamesQuery, searchWorlds as searchWorldsQuery } from '../../graphql/queries';
import { SearchAllAction } from '../../types/Action/GraphQL';
import { SearchGamesResult, SearchWorldsResult } from '../../types/Api';
import { SearchCategory, SearchResults } from '../../types/Search';
import { createLogger } from '../../utils';

const loggerWorlds = createLogger(['epics', 'graphql', 'search', 'worlds']);
const loggerGames = createLogger(['epics', 'graphql', 'search', 'games']);

export default (action$: ActionsObservable<SearchAllAction>) =>
    action$.pipe(
        ofType(SEARCH_ALL),
        debounce(() => timer(500)),
        switchMap((action: SearchAllAction) => {
            return forkJoin(searchWorldsFork(action.payload), searchGamesFork(action.payload));
        }),
        map((categories) => {
            const searchResults: SearchResults = {};

            categories.forEach((category) => {
                if (category.results.length) {
                    searchResults[category.name] = category;
                }
            });
            return setSearchResults(Object.keys(searchResults).length ? searchResults : []);
        }),
        ofType(SET_SEARCH_RESULTS)
    );

async function searchWorldsFork(value: string) {
    const category: SearchCategory = {
        name: 'worlds',
        results: []
    };

    try {
        const results = await searchWorlds(value);

        results.forEach((result) =>
            category.results.push({
                title: result.name,
                path: `/worlds/${result.id}`
            })
        );
    } catch (error) {
        loggerWorlds.error(error);
    }
    return category;
}

async function searchGamesFork(value: string) {
    const category: SearchCategory = {
        name: 'games',
        results: []
    };

    try {
        const results = await searchGames(value);

        results.forEach((result) =>
            category.results.push({
                title: result.name,
                path: `/worlds/${result.world.id}/games/${result.id}`
            })
        );
    } catch (error) {
        loggerGames.error(error);
    }
    return category;
}

async function searchWorlds(value: string) {
    const response = (await API.graphql(
        graphqlOperation(searchWorldsQuery, {
            filter: {
                name: {
                    matchPhrasePrefix: value
                }
            }
        })
    )) as SearchWorldsResult;

    return response.data.searchWorlds.items;
}

async function searchGames(value: string) {
    const response = (await API.graphql(
        graphqlOperation(searchGamesQuery, {
            filter: {
                name: {
                    matchPhrasePrefix: value
                }
            }
        })
    )) as SearchGamesResult;

    return response.data.searchGames.items;
}
