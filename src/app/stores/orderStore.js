import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import agent from '../api/agent';

const LIMIT = 4;

class OrderStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.orderRegistry.clear();
                this.loadOrders();
            },
        );
    }

    orderRegistry = new Map();
    order = null;
    loadingInitial = false;
    submitting = false;
    target = '';
    loading = false;
    orderCount = 0;
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
        return Math.ceil(this.orderCount / LIMIT);
    }

    get orders() {
        return Array.from(this.orderRegistry.values());
    }

    setPage = (page: number) => {
        this.page = page;
    };

    loadOrders = async () => {
        this.loadingInitial = true;
        try {
            const ordersEnvelope = await agent.Orders.list(this.axiosParams);
            const { data, count } = ordersEnvelope;
            runInAction('loading orders', () => {
                data.forEach((order) => {
                    this.orderRegistry.set(order._id, order);
                });
                this.orderCount = count;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load orders error', () => {
                this.loadingInitial = false;
            });
        }
    };

    loadOrder = async (id) => {
        let order = this.getOrder(id);
        if (order) {
            this.order = order;
            return toJS(order);
        } else {
            this.loadingInitial = true;
            try {
                order = await agent.Orders.details(id);
                runInAction('getting order', () => {
                    //   setActivityProps(product, this.rootStore.userStore.user!);
                    this.order = order.data;
                    this.orderRegistry.set(order._id, order);
                    this.loadingInitial = false;
                });
                return order;
            } catch (error) {
                runInAction('get order error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    getOrder = (id) => {
        return this.orderRegistry.get(id);
    };
}

decorate(OrderStore, {
    orderRegistry: observable,
    order: observable,
    loadingInitial: observable,
    submitting: observable,
    target: observable,
    loading: observable,
    orderCount: observable,
    page: observable,
    predicate: observable,

    axiosParams: computed,
    totalPages: computed,

    setPredicate: action,
    setPage: action,
    loadOrders: action,
    loadOrder: action,
});

export default OrderStore;
