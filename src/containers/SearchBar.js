import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchProducts } from '../actions';

const typeaheadOptions = ["bag", "wallet", "purse"]

class SearchBar extends Component {
    constructor() {
        super();
        this.state = { term: '' };
    }

    onInputChange(event) {
        this.setState({
            term: event.target.value
        })
    }

    getTypeaheadOptions() {
        if (this.refs.productSearchInput) {
            const searchText = this.refs.productSearchInput.value.trim();
            const availableOptions = typeaheadOptions.filter(current => current === searchText);
            console.log(availableOptions)
        }
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
                    ref="productSearchInput"
                />
                <span className="typeaheadOptions">
                    {this.getTypeaheadOptions()}
                </span>
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