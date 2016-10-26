import axios from 'axios';


// set up the root url using the provided API key
const API_KEY = 'blahblahblah';
const ROOT_URL = `http://api.blehblehbleh?appid=${API_KEY}`;

// set up the variable to be consistant across files
export const FETCH_PRODUCTS = 'FETCH_PRODUCTS';

// fetch products function
export function fetchProducts(category) {
    // the products should be accessible by combining root url and product category 
    const url = `${ROOT_URL}&q=${category},us`;
    // make request to the server using axios library
    const request = axios.get(url);
    return {
        type: FETCH_PRODUCTS,
        payload: request
    }
}