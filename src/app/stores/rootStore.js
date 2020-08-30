import { createContext } from 'react';
import { configure } from 'mobx';
import ProductStore from './productStore';

configure({ enforceActions: 'observed' });

export class RootStore {
    productStore: ProductStore;

    constructor() {
        this.productStore = new ProductStore(this);
    }
}

export const RootStoreContext = createContext(new RootStore());
