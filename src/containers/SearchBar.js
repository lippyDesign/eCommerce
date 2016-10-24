import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProducts } from '../actions';

const typeaheadOptions = ["bag", "wallet", "green", "leather"]

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
        // chooseItems function filters a list and returns items that contain searchText
        const chooseItems = (searchText, list) => (
            list.filter(item => item.toLowerCase().includes(searchText.toLowerCase()))
        );
        
        // get the value of the input and assign in to searchText var
        const searchInputText = this.state.term.trim();
        // if searchtext is not empty
        if (searchInputText) {
            // use choose items function to locate the typeahead options
            const searchOptions = chooseItems(searchInputText, typeaheadOptions);
            // if typeahead option not selected render typeahead options to the screen
            if (!this.state.typeaheadOptionSelected) {
                return searchOptions.map(current => (
                    <li onClick={() => this.typeaheadOptionSelected(current) } className="list-group-item" key={current}>{current}</li>)
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
        return <form className="input-group" onSubmit={this.onFormSubmit.bind(this)} >
                <input
                    placeholder="Type in a Category, Make, Model, SKU #, etc..."
                    className="form-control"
                    value={this.state.term}
                    onChange={this.onInputChange.bind(this)}
                />
                <ul className="typeaheadOptions list-group">
                    {this.getTypeaheadOptions()}
                </ul>
                <span className="input-group-btn">
                    <button type="submit" className="btn btn-secondary">
                        Submit
                    </button>
                </span>
            </form>;
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchProducts }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);