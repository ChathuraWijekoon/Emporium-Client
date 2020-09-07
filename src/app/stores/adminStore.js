import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import { toast } from 'react-toastify';
import agent from '../api/agent';
import { history } from '../..';

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

    // products
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

    editProduct = async (product) => {
        this.submitting = true;
        try {
            await agent.Admin.updateProduct(product);
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
            const response = await agent.Admin.uploadProductPhoto(product._id, file);
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

    deleteProduct = async (id) => {
        this.submitting = true;
        try {
            await agent.Admin.deleteProduct(id);
            runInAction('deleting product', () => {
                this.productRegistry.delete(id);
                this.submitting = false;
            });
            toast.success('Product deleted successfully');
            history.push('/admin');
        } catch (error) {
            runInAction('delete product error', () => {
                this.submitting = false;
            });
            console.log(error);
            toast.error(error.data.error);
        }
    };

    getProduct = (id) => {
        return this.productRegistry.get(id);
    };

    getUser = (id) => {
        return this.userRegistry.get(id);
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

    loadUser = async (id) => {
        let user = this.getUser(id);
        if (user) {
            this.user = user;
            return toJS(user);
        } else {
            this.loadingInitial = true;
            try {
                user = await agent.Admin.detailsUser(id);
                runInAction('getting activity', () => {
                    //   setActivityProps(product, this.rootStore.userStore.user!);
                    this.user = user.data;
                    this.userRegistry.set(user._id, user);
                    this.loadingInitial = false;
                });
                return user;
            } catch (error) {
                runInAction('get activity error', () => {
                    this.loadingInitial = false;
                });
            }
        }
    };

    editUser = async (user) => {
        this.submitting = true;
        try {
            await agent.Admin.updateUser(user);
            runInAction('editing user', () => {
                this.userRegistry.set(user._id, user);
                this.user = user;
                this.submitting = false;
            });
            // history.push(`/admin/product/${product._id}`);
            toast.success('Successfully updated user');
        } catch (error) {
            runInAction('edit user error', () => {
                this.submitting = false;
            });
            toast.error(error.data.error);
        }
    };

    createProduct = async (categoryId, product) => {
        this.submitting = true;
        try {
            const response = await agent.Products.create(product, categoryId);
            runInAction('create product', () => {
                this.productRegistry.set(response.data._id, response.data);
                this.submitting = false;
            });
            history.push(`/admin/product/${response.data._id}`);
        } catch (error) {
            runInAction('create product error', () => {
                this.submitting = false;
            });
            toast.error(error.data?.error);
            console.log(error.response);
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
    editProduct: action,
    createProduct: action,
    uploadProductPhoto: action,
    deleteProduct: action,
    loadUsers: action,
    loadUser: action,
    editUser: action,
});

export default AdminStore;
