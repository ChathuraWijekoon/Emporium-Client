/* eslint-disable jsx-a11y/anchor-is-valid */
// modules
import React from 'react';

// assets
import imgShirt from '../../assets/images/products/shirt.jpg';

const ProductCard = () => {
    return (
        <div href="#" className="card card-product-grid">
            <a href="#" className="img-wrap">
                {' '}
                <img src={imgShirt} alt="product" />{' '}
            </a>
            <figcaption className="info-wrap">
                <a href="#" className="title">
                    Just another product name
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
                <div className="price mt-1">$179.00</div>
            </figcaption>
        </div>
    );
};

export default ProductCard;
