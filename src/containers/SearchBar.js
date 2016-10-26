import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProducts } from '../actions';

class SearchBar extends Component {
    constructor() {
        super();
        this.state = {
            term: '',
            searchOptionSelected: false
        };
    }

    onInputChange(event) {
        this.setState({
            term: event.target.value,
            searchOptionSelected: false
        })
    }

    getTypeaheadOptions() {
        const productList = this.props.dummyProducts;
        const options = productList.map
        // chooseItems function filters a list and returns items that contain searchText
        const chooseItems = (searchText, list) => {
            return list.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
        }
        // get the value of the input and assign it to searchText var
        const searchInputText = this.state.term.trim();
        // if searchtext is not empty
        if (searchInputText) {
            // use choose items function to locate the typeahead options
            const searchOptions = chooseItems(searchInputText, this.props.typeaheadOptions);
            // if typeahead option not yet selected render list of typeahead options to the screen
            if (!this.state.searchOptionSelected) {
                return searchOptions.map(current => (
                    <li
                        onClick={() => this.typeaheadOptionSelected(current) }
                        className="typeaheadOptionsListItem"
                        key={current}
                    >
                        {current}
                    </li>)
                );
            }
        }
    }

    typeaheadOptionSelected(option) {
        this.setState({
            term: option,
            searchOptionSelected: true
        })
    }

    onFormSubmit(event) {
        event.preventDefault();
        // go and fetch product data
        this.props.fetchProducts(this.state.term);
        // clear search bar
        this.setState({ term: '' });
    }

    render() {
        return <form className="searchProductForm" onSubmit={this.onFormSubmit.bind(this)} >
                <span className="searchProductInputAndButtonWrapper">
                    <input
                        placeholder="Type in a Category, Make, Model, SKU #, etc..."
                        className="searchProductInput"
                        value={this.state.term}
                        onChange={this.onInputChange.bind(this)}
                    />
                    <button type="submit" className="searchProductButton">
                        Search
                    </button>
                </span>
                <ul className="typeaheadOptionsList">
                    {this.getTypeaheadOptions()}
                </ul>
            </form>;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);