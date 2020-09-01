/* eslint-disable jsx-a11y/anchor-is-valid */
// modules
import React from 'react';
import { observer } from 'mobx-react-lite';
import ReactStars from 'react-rating-stars-component';

// utils
import { formatCurrency } from '../../app/common/util/util';

// uploads url
const uploadsUrl = process.env.REACT_APP_UPLOADS_URL;

const ProductCard = ({ product }) => {
    return (
        <div href="#" className="card card-product-grid">
            <a href="#" className="img-wrap">
                {' '}
                <img src={`${uploadsUrl}/${product.photo}`} alt="product" />{' '}
            </a>
            <figcaption className="info-wrap">
                <a href="#" className="title">
                    {product.name}
                </a>

                <div className="rating-wrap row">
                    {product.averageRating && (
                        <div className="col-md-7 pr-0">
                            <ReactStars size={20} value={product.averageRating} edit={false} />
                        </div>
                    )}
                    <div className={`${product.averageRating ? 'col-md-5 px-0 pt-1' : 'col-md-12 pl-2'}`}>
                        <span className="label-rating text-muted">
                            {' '}
                            {product.reviewCount}{' '}
                            {!product.reviewCount ? 'Not Reviewed Yet' : product.reviewCount > 1 ? 'reviews' : 'review'}
                        </span>
                    </div>
                </div>
                <div className="price mt-1">{formatCurrency(product.unitPrice)}</div>
            </figcaption>
        </div>
    );
};

export default observer(ProductCard);
