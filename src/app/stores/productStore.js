import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { history } from '../..';

const LIMIT = 4;

class ProductStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.productRegistry.clear();
                // this.loadProducts();
            },
        );
    }

    productRegistry = new Map();
    product = null;
    loadingInitial = false;
    submitting = false;
    target = '';
    loading = false;
    productCount = 0;
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
        return Math.ceil(this.productCount / LIMIT);
    }

    get products() {
        return Array.from(this.productRegistry.values());
    }

    setPage = (page) => {
        this.page = page;
    };

    loadProducts = async () => {
        this.loadingInitial = true;
        try {
            const productsEnvelope = await agent.Products.list(this.axiosParams);
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
                product = await agent.Products.details(id);
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
                console.log(error);
            }
        }
    };

    getProduct = (id) => {
        return this.productRegistry.get(id);
    };

    createProduct = async (categoryId, product) => {
        this.submitting = true;
        try {
            const response = await agent.Products.create(product, categoryId);
            runInAction('create product', () => {
                this.productRegistry.set(response.data._id, response.data);
                this.submitting = false;
            });
            history.push(`/sell/product/${response.data._id}`);
        } catch (error) {
            runInAction('create product error', () => {
                this.submitting = false;
            });
            toast.error(error.data?.error);
            console.log(error.response);
        }
    };

    editProduct = async (product) => {
        this.submitting = true;
        try {
            await agent.Products.update(product);
            runInAction('editing product', () => {
                this.productRegistry.set(product._id, product);
                this.product = product;
                this.submitting = false;
            });
            // history.push(`/admin/product/${product._id}`);
            toast.success('Successfully updated product');
        } catch (error) {
            runInAction('edit product error', () => {
                this.submitting = false;
            });
            toast.error(error.data.error);
        }
    };

    uploadProductPhoto = async (product, file) => {
        this.submitting = true;
        try {
            const response = await agent.Products.uploadPhoto(product._id, file);
            runInAction('uploading product photo', () => {
                this.productRegistry.set(product._id, product);
                this.product.photo = response.data;
                this.submitting = false;
            });
            // history.push(`/admin/product/${product._id}`);
            window.location.reload();
            toast.success('Successfully uploaded product photo');
        } catch (error) {
            runInAction('uploading product photo error', () => {
                this.submitting = false;
            });
            toast.error(error.data.error);
            console.log(error);
        }
    };
}

decorate(ProductStore, {
    productRegistry: observable,
    product: observable,
    loadingInitial: observable,
    submitting: observable,
    target: observable,
    loading: observable,
    productCount: observable,
    page: observable,
    predicate: observable,

    axiosParams: computed,
    totalPages: computed,

    setPredicate: action,
    deletePredicate: action,
    setPage: action,
    loadProducts: action,
    loadProduct: action,
    createProduct: action,
    editProduct: action,
    uploadProductPhoto: action,
});

export default ProductStore;
