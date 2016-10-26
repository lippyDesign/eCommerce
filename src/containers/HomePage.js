import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';
import ProductList from './ProductList';

class HomePage extends Component {
    render() {
        return <div>
            <SearchBar
                products={this.props.products}
                dummyProducts={this.props.dummyProducts}
                typeaheadOptions={this.props.typeaheadOptions}
            />
            <ProductList />
        </div>
    }
}

function mapStateToProps({ products, dummyProducts }) {
    const typeaheadOptions = dummyProducts.reduce((prev, {make, model, genders, categories, colors, materials}) => {
        categories.forEach(category => {
            if (prev.indexOf(category) === -1) {
                prev.push(category)
            }
            if (prev.indexOf(`${make} ${category}`) === -1) {
                prev.push(`${make} ${category}`)
            }
            colors.forEach(color => {
                if (prev.indexOf(`${color} ${category}`) === -1) {
                    prev.push(`${color} ${category}`)
                }
                if (prev.indexOf(`${color} ${make} ${category}`) === -1) {
                    prev.push(`${color} ${make} ${category}`)
                }
                materials.forEach(material => {
                    if (prev.indexOf(`${material} ${category}`) === -1) {
                        prev.push(`${material} ${category}`)
                    }
                    if (prev.indexOf(`${color} ${material} ${category}`) === -1) {
                        prev.push(`${color} ${material} ${category}`)
                    }
                    genders.forEach(gender => {
                        if (prev.indexOf(`${color} ${gender} ${material} ${category}`) === -1) {
                            prev.push(`${color} ${gender} ${material} ${category}`)
                        }
                        if (prev.indexOf(`${gender} ${material} ${category}`) === -1) {
                            prev.push(`${gender} ${material} ${category}`)
                        }
                    });
                });
            });
        });
        genders.forEach(gender => {
            if (prev.indexOf(gender) === -1) {
                prev.push(gender)
            }
        });
        colors.forEach(color => {
            if (prev.indexOf(color) === -1) {
                prev.push(color)
            }
        });
        materials.forEach(material => {
            if (prev.indexOf(material) === -1) {
                prev.push(material)
            }
        });
        if (prev.indexOf(make) === -1) {
                prev.push(make)
        }
        if (prev.indexOf(model) === -1) {
                prev.push(model)
        }
        return [...prev, `${make} ${model}`];
    }, []);

    return { products, dummyProducts, typeaheadOptions };
}

export default connect(mapStateToProps)(HomePage);