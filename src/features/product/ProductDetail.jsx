/* eslint-disable jsx-a11y/anchor-is-valid */
// moduels
import React, { useEffect, useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import ReactStars from 'react-rating-stars-component';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// utils
import { formatCurrency } from '../../app/common/util/util';

// components
import LoadingComponent from '../../app/layout/LoadingComponent';

// uploads url
const uploadsUrl = process.env.REACT_APP_UPLOADS_URL;

const ProductDetail = ({ match, history }) => {
    const rootStore = useContext(RootStoreContext);
    const { product, loadProduct, loadingInitial } = rootStore.productStore;

    const [formData, _setFormData] = useState({
        quantity: 1,
    });

    useEffect(() => {
        loadProduct(match.params.id);
    }, [loadProduct, match.params.id, history]);

    if (loadingInitial) return <LoadingComponent content="Loading product..." />;

    if (!product) return <h2>Product not found</h2>;

    return (
        <div className="card">
            <div className="row no-gutters">
                <aside className="col-md-6">
                    <article className="gallery-wrap">
                        <div className="img-big-wrap">
                            <Link to={`/product/${product._id}`}>
                                <img src={`${uploadsUrl}/${product.photo}`} alt={product.name} />
                            </Link>
                        </div>
                        <div className="thumbs-wrap">
                            <Link to={`/product/${product._id}`} className="item-thumb">
                                {' '}
                                <img src={`${uploadsUrl}/${product.photo}`} alt={product.name} />
                            </Link>
                        </div>
                    </article>
                </aside>
                <main className="col-md-6 border-left">
                    <article className="content-body">
                        <h2 className="title">{product.name}</h2>

                        <div className="rating-wrap my-3 row">
                            <div className="col-md-2 pr-0">
                                <ReactStars size={20} value={product.averageRating} edit={false} />
                            </div>
                            <div className="col-md-6 pt-1">
                                <small className="label-rating text-muted">{product.reviewCount || 0} reviews</small>
                                <small className="label-rating text-success">
                                    {' '}
                                    <i className="fa fa-clipboard-check"></i> 154 orders{' '}
                                </small>
                            </div>
                        </div>

                        <div className="mb-3">
                            <var className="price h4">{formatCurrency(product.unitPrice)}</var>
                            <span className="text-muted">/per {product.stock.unitOfMeasure.toLowerCase()}</span>
                        </div>

                        <p>{product.description}</p>

                        <dl className="row">
                            <dt className="col-sm-3">Category</dt>
                            <dd className="col-sm-9">{product.category.name}</dd>

                            <dt className="col-sm-3">Quantity</dt>
                            <dd className="col-sm-9">{product.stock.quantity}</dd>

                            <dt className="col-sm-3">Delivery</dt>
                            <dd className="col-sm-9">Island Wide</dd>
                        </dl>

                        <hr />
                        <form>
                            <div className="form-row">
                                <div className="form-group col-md flex-grow-0">
                                    <label>Quantity</label>
                                    <div className="input-group mb-3 input-spinner">
                                        <div className="input-group-prepend">
                                            <button
                                                className="btn btn-light font-weight-bold"
                                                type="button"
                                                id="button-plus"
                                                onClick={() =>
                                                    _setFormData({ ...formData, quantity: formData.quantity + 1 })
                                                }
                                            >
                                                {' '}
                                                +{' '}
                                            </button>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={formData.quantity}
                                            onChange={(e) => _setFormData({ ...formData, quantity: e.target.value })}
                                        />
                                        <div className="input-group-append">
                                            <button
                                                className="btn btn-light font-weight-bold"
                                                type="button"
                                                id="button-minus"
                                                onClick={() =>
                                                    _setFormData({
                                                        ...formData,
                                                        quantity: formData.quantity !== 0 ? formData.quantity - 1 : 0,
                                                    })
                                                }
                                            >
                                                {' '}
                                                &minus;
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group col-md">
                                    <label>Select size</label>
                                    <div className="mt-1">
                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" name="select_size" className="custom-control-input" />
                                            <div className="custom-control-label">Small</div>
                                        </label>

                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" name="select_size" className="custom-control-input" />
                                            <div className="custom-control-label">Medium</div>
                                        </label>

                                        <label className="custom-control custom-radio custom-control-inline">
                                            <input type="radio" name="select_size" className="custom-control-input" />
                                            <div className="custom-control-label">Large</div>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </form>
                        <button className="btn btn-primary font-weight-bold mr-2"> Buy now </button>
                        <button className="btn btn-outline-primary font-weight-bold">
                            {' '}
                            <span className="text">Add to cart</span> <i className="fas fa-shopping-cart"></i>{' '}
                        </button>
                    </article>
                </main>
            </div>
        </div>
    );
};

export default observer(ProductDetail);
