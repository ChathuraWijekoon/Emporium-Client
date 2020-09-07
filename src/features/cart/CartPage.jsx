// modules
import React, { useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

// components
import CartTable from './CartTable';

const CartPage = () => {
    const rootStore = useContext(RootStoreContext);
    // const { cart, loadCart } = rootStore.cartStore;

    // useEffect(() => {
    //     if (cart) {
    //         loadCart(cart._id);
    //     }
    // }, [cart, loadCart]);

    return (
        <>
            <section className="section-pagetop bg">
                <div className="container">
                    <h2 className="title-page">Shopping cart</h2>
                </div>
            </section>

            <CartTable />

            <section className="section-name bg padding-y">
                <div className="container">
                    <h6>Payment and refund policy</h6>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
                        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
                        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
                        non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </section>
        </>
    );
};

export default observer(CartPage);
