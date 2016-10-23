import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
    renderProducts() {
        return this.props.products.map( product => {
            return <div key={product.id}>{product.make}</div>
        })
    }

    render() {
        console.log(this.props.products)
        return <div>
        {this.renderProducts()}
        </div>
    }
}

function mapStateToProps({ products }) {
    return { products };
}

export default connect(mapStateToProps)(ProductList);