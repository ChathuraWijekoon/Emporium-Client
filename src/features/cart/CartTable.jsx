/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// assets
import imgPayments from '../../assets/images/cart/payments.png';

// utils
import { formatCurrency } from '../../app/common/util/util';

// uploads url
const uploadsUrl = process.env.REACT_APP_UPLOADS_URL;

const CartTable = () => {
    const rootStore = useContext(RootStoreContext);
    const { cart } = rootStore.cartStore;
    const { user } = rootStore.userStore;

    const [total, _setTotal] = useState({
        discount: 0,
        total: 0,
    });

    useEffect(() => {
        if (cart) {
            const sum = cart.products.reduce((acc, curr) => {
                return acc + curr.subTotal;
            }, 0);

            _setTotal({
                discount: 0,
                total: sum,
            });
        }
    }, [cart]);

    useEffect(() => {
        if (window) {
            window.payhere.onCompleted = () => {
                console.log('Success');
            }
            
            window.payhere.onDismissed = () => {
                console.log('Dismissed');
            }            
            
            window.payhere.onError = () => {
                console.log('Error');
            }            
        }
    }, [])

    const handlePaymentClick = () => {
        const payment = {
            sandbox: true,
            merchant_id: process.env.REACT_APP_PAYHERE_MERCHANT_ID,    
            return_url: "http://localhost:3000",     
            cancel_url: "http://localhost:3000",     
            notify_url: "http://localhost:5000/notify",
            order_id: `order_${cart._id}`,
            items: cart._id,
            amount: parseFloat(total.total).toFixed(2),
            currency: "LKR",
            email: user.email,
            first_name: user.name,
            last_name: user.name,
            phone: '0715520912',
		    address: 'No.1, Galle Road',
		    city: 'Colombo',
		    country: 'Sri Lanka',
        };

        window.payhere.startPayment(JSON.parse(JSON.stringify(payment)));

    }

    return (
        <section className="section-content padding-y">
            <div className="container">
                <div className="row">
                    <main className="col-md-9">
                        <div className="card">
                            <table className="table table-borderless table-shopping-cart">
                                <thead className="text-muted">
                                    <tr className="small text-uppercase">
                                        <th scope="col">Product</th>
                                        <th scope="col" width="120">
                                            Quantity
                                        </th>
                                        <th scope="col" width="120">
                                            Price
                                        </th>
                                        <th scope="col" className="text-right" width="200">
                                            {' '}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cart &&
                                        cart.products.map((product) => (
                                            <tr key={product._id}>
                                                <td>
                                                    <figure className="itemside">
                                                        <div className="aside">
                                                            <img
                                                                src={`${uploadsUrl}/${product.product.photo}`}
                                                                className="img-sm"
                                                            />
                                                        </div>
                                                        <figcaption className="info">
                                                            <a href="#" className="title text-dark">
                                                                {product.product.name}
                                                            </a>
                                                            <p className="text-muted small">
                                                                Description: {product.product.description}
                                                            </p>
                                                        </figcaption>
                                                    </figure>
                                                </td>
                                                <td>
                                                    {/* <select className="form-control">
                                                        <option>1</option>
                                                        <option>2</option>
                                                        <option>3</option>
                                                        <option>4</option>
                                                    </select> */}
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        value={product.quantity}
                                                        disabled
                                                    />
                                                </td>
                                                <td>
                                                    <div className="price-wrap">
                                                        <var className="price">{formatCurrency(product.subTotal)}</var>
                                                        <small className="text-muted">
                                                            {' '}
                                                            {formatCurrency(product.product.unitPrice)} each{' '}
                                                        </small>
                                                    </div>
                                                </td>
                                                <td className="text-right">
                                                    <a
                                                        data-original-title="Save to Wishlist"
                                                        title=""
                                                        href=""
                                                        className="btn btn-light"
                                                        data-toggle="tooltip"
                                                    >
                                                        {' '}
                                                        <i className="fa fa-heart"></i>
                                                    </a>
                                                    <a href="" className="btn btn-light">
                                                        {' '}
                                                        Remove
                                                    </a>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>

                            <div className="card-body border-top">
                                <button type="button" className="btn btn-primary float-md-right" onClick={handlePaymentClick}>
                                    {' '}
                                    Make Purchase <i className="fa fa-chevron-right"></i>{' '}
                                </button>
                                <a href="#" className="btn btn-light">
                                    {' '}
                                    <i className="fa fa-chevron-left"></i> Continue shopping{' '}
                                </a>
                            </div>
                        </div>

                        <div className="alert alert-success mt-3">
                            <p className="icontext">
                                <i className="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks
                            </p>
                        </div>
                    </main>
                    <aside className="col-md-3">
                        <div className="card mb-3">
                            <div className="card-body">
                                <form>
                                    <div className="form-group">
                                        <label>Have coupon?</label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                name=""
                                                placeholder="Coupon code"
                                            />
                                            <span className="input-group-append">
                                                <button className="btn btn-primary">Apply</button>
                                            </span>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="card">
                            <div className="card-body">
                                <dl className="dlist-align">
                                    <dt>Total price:</dt>
                                    <dd className="text-right">{formatCurrency(total.total)}</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Discount:</dt>
                                    <dd className="text-right">{formatCurrency(total.discount)}</dd>
                                </dl>
                                <dl className="dlist-align">
                                    <dt>Total:</dt>
                                    <dd className="text-right  h5">
                                        <strong>{formatCurrency(total.total)}</strong>
                                    </dd>
                                </dl>
                                <hr />
                                <p className="text-center mb-3">
                                    <img src={imgPayments} height="26" />
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default observer(CartTable);
