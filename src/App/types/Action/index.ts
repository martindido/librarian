import { AuthAction } from './Auth';
import { GoodreadsAction } from './Goodreads';
import { GraphQLAction } from './GraphQL';
import { LoadAction } from './Load';
import { LocaleAction } from './Locale';
import { RoutingAction } from './Routing';
import { SearchAction } from './Search';
import { StorageAction } from './Storage';
import { SyncAction } from './Sync';

export type Action =
    | AuthAction
    | GoodreadsAction
    | GraphQLAction
    | LoadAction
    | LocaleAction
    | RoutingAction
    | SearchAction
    | StorageAction
    | SyncAction;
