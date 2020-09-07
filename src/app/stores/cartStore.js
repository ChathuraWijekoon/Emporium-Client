import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { history } from '../..';

const LIMIT = 4;

class CartStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.cartRegistry.clear();
            },
        );
    }

    cartRegistry = new Map();
    cart = null;
    loadingInitial = false;
    submitting = false;
    target = '';
    loading = false;
    cartCount = 0;
    page = 0;
    predicate = new Map();
    loadAll = false;

    setPredicate = (predicate, value) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        } else {
            this.loadAll = value;
        }
    };

    deletePredicate = () => {
        this.predicate.clear();
    };

    get axiosParams() {
        const params = new URLSearchParams();
        if (!this.loadAll) {
            params.append('limit', String(LIMIT));
            params.append('page', `${this.page ? this.page * LIMIT : 1}`);
        }
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        });
        return params;
    }

    get totalPages() {
        return Math.ceil(this.cartCount / LIMIT);
    }

    get carts() {
        return Array.from(this.cartRegistry.values());
    }

    setPage = (page) => {
        this.page = page;
    };

    loadCarts = async () => {
        this.loadingInitial = true;
        try {
            const cartsEnvelope = await agent.Carts.list(this.axiosParams);
            const { data, count } = cartsEnvelope;
            runInAction('loading carts', () => {
                data.forEach((cart) => {
                    this.cartRegistry.set(cart._id, cart);
                });
                this.cartCount = count;
                this.cart = data[0];
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load carts error', () => {
                this.loadingInitial = false;
            });
        }
    };

    loadCart = async (id) => {
        let cart = this.getCart(id);
        if (cart) {
            this.cart = cart;
            return toJS(cart);
        } else {
            this.loadingInitial = true;
            try {
                cart = await agent.Carts.details(id);
                runInAction('getting cart', () => {
                    //   setActivityProps(product, this.rootStore.userStore.user!);
                    this.cart = cart.data;
                    this.cartRegistry.set(cart._id, cart);
                    this.loadingInitial = false;
                });
                return cart;
            } catch (error) {
                runInAction('get cart error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    getCart = (id) => {
        return this.cartRegistry.get(id);
    };

    createCart = async (cart) => {
        this.submitting = true;
        try {
            const response = await agent.Carts.create(cart);
            runInAction('create cart', () => {
                this.cartRegistry.set(response.data._id, response.data);
                this.submitting = false;
            });
            // history.push(`/sell/product/${response.data._id}`);
            toast.success('Successfully added cart item');
        } catch (error) {
            runInAction('create cart error', () => {
                this.submitting = false;
            });
            toast.error(error.data?.error);
            console.log(error.response);
        }
    };

    editCart = async (cart) => {
        this.submitting = true;
        try {
            await agent.Carts.update(cart);
            runInAction('editing cart', () => {
                this.cartRegistry.set(cart._id, cart);
                this.cart = cart;
                this.submitting = false;
            });
            // history.push(`/admin/product/${product._id}`);
            toast.success('Successfully updated cart');
        } catch (error) {
            runInAction('edit product error', () => {
                this.submitting = false;
            });
            toast.error(error.data?.error);
            console.log(error);
        }
    };
}

decorate(CartStore, {
    cartRegistry: observable,
    cart: observable,
    loadingInitial: observable,
    submitting: observable,
    target: observable,
    loading: observable,
    cartCount: observable,
    page: observable,
    predicate: observable,

    axiosParams: computed,
    totalPages: computed,

    setPredicate: action,
    deletePredicate: action,
    setPage: action,
    loadCarts: action,
    loadCart: action,
    createCart: action,
    editCart: action,
});

export default CartStore;
