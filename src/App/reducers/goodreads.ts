import { SET_SHELVES } from '../constants/actions';
import { GoodreadsAction } from '../types/Action/Goodreads';
import { GoodreadsState } from '../types/State/Goodreads';

export const initialState: GoodreadsState = {
    shelves: []
};
export const goodreads = (state: GoodreadsState = initialState, action: GoodreadsAction) => {
    switch (action.type) {
        case SET_SHELVES:
            console.log(action.payload);
            return {
                ...state,
                shelves: action.payload
            };
        default:
            return state;
    }
};
