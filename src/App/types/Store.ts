import { Store as ReduxStore } from 'redux';

import { Action } from './Action';
import { State } from './State';

export type Store = ReduxStore<State, Action>;
