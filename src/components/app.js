import React, { Component } from 'react';

import SearchBar from '../containers/SearchBar';
import ProductList from '../containers/ProductList';

export default class App extends Component {
  render() {
    return <div>
      <SearchBar />
      <ProductList />
    </div>;
  }
}
