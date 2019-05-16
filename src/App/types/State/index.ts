import { RouterState } from 'connected-react-router';
import { LocalizeState } from 'react-localize-redux';
import { FormStateMap } from 'redux-form';

import { AuthState } from './Auth';
import { GraphQLState } from './GraphQL';
import { RoutingState } from './Routing';
import { SearchState } from './Search';

export type InitialState = Readonly<{
    auth: AuthState;
    routing: RoutingState;
    graphql: GraphQLState;
    search: SearchState;
}>;

export type State = InitialState &
    Readonly<{
        localize: LocalizeState;
        router: RouterState;
        form: FormStateMap;
    }>;
