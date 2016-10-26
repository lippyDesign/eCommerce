import { combineReducers } from 'redux';

import ProductsReducer from './ProductsReducer'
import ProductListReducer from './ProductListReducer'

const rootReducer = combineReducers({
  dummyProducts: ProductListReducer,
  products: ProductsReducer
});

export default rootReducer;
