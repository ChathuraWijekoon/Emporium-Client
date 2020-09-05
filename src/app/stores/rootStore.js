import { createContext } from 'react';
import { configure } from 'mobx';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ProductStore from './productStore';
import AdminStore from './adminStore';

configure({ enforceActions: 'observed' });

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;
    adminStore: AdminStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.productStore = new ProductStore(this);
        this.adminStore = new AdminStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
