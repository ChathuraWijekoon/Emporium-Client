import { createContext } from 'react';
import { configure } from 'mobx';
import UserStore from './userStore';
import CommonStore from './commonStore';
import ProductStore from './productStore';

configure({ enforceActions: 'observed' });

export class RootStore {
    userStore: UserStore;
    commonStore: CommonStore;
    productStore: ProductStore;

    constructor() {
        this.userStore = new UserStore(this);
        this.commonStore = new CommonStore(this);
        this.productStore = new ProductStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
