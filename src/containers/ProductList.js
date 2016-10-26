import React, { Component } from 'react';
import { connect } from 'react-redux';

class ProductList extends Component {
    renderProducts() {
        return this.props.products.map(( {id, image, price, make, model, description, colors, materials} ) => {
            return <div key={id} className="productItem">
            <ul>
                <li><img src={image}/></li>
                <li>{price}</li>
                <li>{make}</li>
                <li>{model}</li>
                <li>{description}</li>
                <li>colors:<ul>{colors.map(color => <li key={color}>{color}</li>)}</ul></li>
                <li>materials:<ul>{materials.map(material => <li key={material}>{material}</li>)}</ul></li>
            </ul>
            </div>
        })
    }

    render() {
        return <div className="productListWrapper">
        {this.renderProducts()}
        </div>
    }
}

function mapStateToProps({ products }) {
    return { products };
}

export default connect(mapStateToProps)(ProductList);