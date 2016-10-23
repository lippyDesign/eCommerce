import { FETCH_PRODUCTS } from '../actions';

import { dummyData } from './products.js';

export default function(state = [], action) {
    // if bad request, use dummy data
    if (action.error) {
        switch (action.type) {
            case FETCH_PRODUCTS:
                return dummyData;
        }
    }
    switch (action.type) {
        case FETCH_PRODUCTS:
            return [action.payload.data];
    }
    return state;
}