import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import agent from '../api/agent';

const LIMIT = 4;

class AdminStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.productRegistry.clear();
                this.userRegistry.clear();
                this.loadProducts();
                this.loadUsers();
            },
        );
    }

    productRegistry = new Map();
    product = null;
    userRegistry = new Map();
    user = null;
    loadingInitial = false;
    submitting = false;
    target = '';
    loading = false;
    productCount = 0;
    userCount = 0;
    page = 0;
    predicate = new Map();

    setPredicate = (predicate, value) => {
        this.predicate.clear();
        if (predicate !== 'all') {
            this.predicate.set(predicate, value);
        }
    };

    get axiosParams() {
        const params = new URLSearchParams();
        // params.append('limit', String(LIMIT));
        // params.append('page', `${this.page ? this.page * LIMIT : 0}`);
        this.predicate.forEach((value, key) => {
            params.append(key, value);
        });
        return params;
    }

    get totalPages() {
        return Math.ceil(this.productCount / LIMIT);
    }

    get products() {
        return Array.from(this.productRegistry.values());
    }

    get users() {
        return Array.from(this.userRegistry.values());
    }

    setPage = (page: number) => {
        this.page = page;
    };

    loadProducts = async () => {
        this.loadingInitial = true;
        try {
            const productsEnvelope = await agent.Admin.listProducts(this.axiosParams);
            const { data, count } = productsEnvelope;
            runInAction('loading activities', () => {
                data.forEach((product) => {
                    this.productRegistry.set(product._id, product);
                });
                this.productCount = count;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load activities error', () => {
                this.loadingInitial = false;
            });
        }
    };

    loadProduct = async (id) => {
        let product = this.getProduct(id);
        if (product) {
            this.product = product;
            return toJS(product);
        } else {
            this.loadingInitial = true;
            try {
                product = await agent.Admin.detailsProduct(id);
                runInAction('getting activity', () => {
                    //   setActivityProps(product, this.rootStore.userStore.user!);
                    this.product = product.data;
                    this.productRegistry.set(product._id, product);
                    this.loadingInitial = false;
                });
                return product;
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                });
            }
        }
    };

    getProduct = (id) => {
        return this.productRegistry.get(id);
    };

    // Users
    loadUsers = async () => {
        this.loadingInitial = true;
        try {
            const usersEnvelope = await agent.Admin.listUsers(this.axiosParams);
            const { data, count } = usersEnvelope;
            runInAction('loading users', () => {
                data.forEach((user) => {
                    this.userRegistry.set(user._id, user);
                });
                this.userCount = count;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load users error', () => {
                this.loadingInitial = false;
            });
        }
    };
}

decorate(AdminStore, {
    productRegistry: observable,
    product: observable,
    userRegistry: observable,
    user: observable,
    loadingInitial: observable,
    submitting: observable,
    target: observable,
    loading: observable,
    productCount: observable,
    userCount: observable,
    page: observable,
    predicate: observable,

    axiosParams: computed,
    totalPages: computed,

    setPredicate: action,
    setPage: action,
    loadProducts: action,
    loadProduct: action,
    loadUsers: action,
});

export default AdminStore;
