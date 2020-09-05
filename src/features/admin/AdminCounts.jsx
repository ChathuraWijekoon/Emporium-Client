// modules
import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

// store
import { RootStoreContext } from '../../app/stores/rootStore';

const AdminCounts = ({ setActiveTable }) => {
    const rootStore = useContext(RootStoreContext);
    const { productCount, userCount } = rootStore.adminStore;

    const [hover, _setHover] = useState('');
    const [activeCount, _setActiveCount] = useState('products');

    const handleCountClick = (countName) => {
        _setActiveCount(countName);
        setActiveTable(countName);
    };

    return (
        <div className="row">
            <div className="col-md-4">
                <article
                    className={
                        hover === 'products' || activeCount === 'products' ? 'card card-body shadow' : 'card card-body'
                    }
                    onMouseEnter={() => _setHover('products')}
                    onMouseLeave={() => _setHover('')}
                    onClick={() => handleCountClick('products')}
                >
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-primary">
                                <i className="fa fa-box-open white"></i>
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">Products</h5>
                            <p>{productCount}</p>
                        </figcaption>
                    </figure>
                </article>
            </div>
            <div className="col-md-4">
                <article
                    className={
                        hover === 'users' || activeCount === 'users' ? 'card card-body shadow' : 'card card-body'
                    }
                    onMouseEnter={() => _setHover('users')}
                    onMouseLeave={() => _setHover('')}
                    onClick={() => handleCountClick('users')}
                >
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-secondary">
                                <i className="fa fa-users white"></i>
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">Users</h5>
                            <p>{userCount}</p>
                        </figcaption>
                    </figure>
                </article>
            </div>
            <div className="col-md-4">
                <article
                    className={
                        hover === 'orders' || activeCount === 'orders' ? 'card card-body shadow' : 'card card-body'
                    }
                    onMouseEnter={() => _setHover('orders')}
                    onMouseLeave={() => _setHover('')}
                    onClick={() => handleCountClick('orders')}
                >
                    <figure className="itemside">
                        <div className="aside">
                            <span className="icon-sm rounded-circle bg-success">
                                <i className="fa fa-truck white"></i>
                            </span>
                        </div>
                        <figcaption className="info">
                            <h5 className="title">Orders</h5>
                            <p>12</p>
                        </figcaption>
                    </figure>
                </article>
            </div>
        </div>
    );
};

export default observer(AdminCounts);
