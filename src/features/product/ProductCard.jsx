/* eslint-disable jsx-a11y/anchor-is-valid */
// modules
import React from 'react';
import { observer } from 'mobx-react-lite';

// utils
import { formatCurrency } from '../../app/common/util/util';

// assets
import imgShirt from '../../assets/images/products/shirt.jpg';

const ProductCard = ({ product }) => {
    return (
        <div href="#" className="card card-product-grid">
            <a href="#" className="img-wrap">
                {' '}
                <img src={imgShirt} alt="product" />{' '}
            </a>
            <figcaption className="info-wrap">
                <a href="#" className="title">
                    {product.name}
                </a>

                <div className="rating-wrap">
                    <ul className="rating-stars">
                        <li style={{ width: '80%' }} className="stars-active">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </li>
                        <li>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </li>
                    </ul>
                    <span className="label-rating text-muted"> 34 reviws</span>
                </div>
                <div className="price mt-1">{formatCurrency(product.unitPrice)}</div>
            </figcaption>
        </div>
    );
};

export default observer(ProductCard);
