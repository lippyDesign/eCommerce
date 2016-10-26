import { FETCH_PRODUCTS } from '../actions';

import { dummyData } from './products.js';

const findNeededItems = (collectionOfArrays, searchText) => {
    const splitText = searchText.split(' ');
    console.log(splitText)
    collectionOfArrays.forEach( arr => {
        const {make, model, genders, categories, colors, materials} = arr;
        arr.allOptions = [make, model, ...genders, ...categories, ...colors, ...materials]
    })
    return collectionOfArrays.filter(arr => {
        if (splitText.every(word => arr.allOptions.indexOf(word) !== -1)) {
            return arr
        }
    });
}

export default function(state = [], action) {
    // if bad request, use dummy data
    console.log(action)
    if (action.error) {
        switch (action.type) {
            case FETCH_PRODUCTS:
                return findNeededItems(dummyData, "leather bag");
        }
    }
    switch (action.type) {
        case FETCH_PRODUCTS:
            return [action.payload.data];
    }
    return state;
}