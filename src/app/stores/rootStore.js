import { createContext } from 'react';
import { configure } from 'mobx';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ProductStore from './productStore';
import AdminStore from './adminStore';
import CategoryStore from './categoryStore';
import CartStore from './cartStore';
import OrderStore from './orderStore';

configure({ enforceActions: 'observed' });

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;
    adminStore: AdminStore;
    categoryStore: CategoryStore;
    cartStore: CartStore;
    orderStore: OrderStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.productStore = new ProductStore(this);
        this.adminStore = new AdminStore(this);
        this.categoryStore = new CategoryStore(this);
        this.cartStore = new CartStore(this);
        this.orderStore = new OrderStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
