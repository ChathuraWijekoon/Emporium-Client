import { observable, action, computed, runInAction, reaction, decorate, toJS } from 'mobx';
import agent from '../api/agent';

const LIMIT = 4;

class CategoryStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.predicate.keys(),
            () => {
                this.page = 0;
                this.categoryRegistry.clear();
                this.loadCategories();
            },
        );
    }

    categoryRegistry = new Map();
    category = null;
    loadingInitial = false;
    submitting = false;
    target = '';
    loading = false;
    categoryCount = 0;
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
        return Math.ceil(this.categoryCount / LIMIT);
    }

    get categories() {
        return Array.from(this.categoryRegistry.values());
    }

    setPage = (page: number) => {
        this.page = page;
    };

    loadCategories = async () => {
        this.loadingInitial = true;
        try {
            const categoriesEnvelope = await agent.Categories.list(this.axiosParams);
            const { data, count } = categoriesEnvelope;
            runInAction('loading categories', () => {
                data.forEach((category) => {
                    this.categoryRegistry.set(category._id, category);
                });
                this.categoryCount = count;
                this.loadingInitial = false;
            });
        } catch (error) {
            runInAction('load categories error', () => {
                this.loadingInitial = false;
            });
        }
    };

    loadCategory = async (id) => {
        let category = this.getCategory(id);
        if (category) {
            this.category = category;
            return toJS(category);
        } else {
            this.loadingInitial = true;
            try {
                category = await agent.Categories.details(id);
                runInAction('getting category', () => {
                    //   setActivityProps(product, this.rootStore.userStore.user!);
                    this.category = category.data;
                    this.categoryRegistry.set(category._id, category);
                    this.loadingInitial = false;
                });
                return category;
            } catch (error) {
                runInAction('get category error', () => {
                    this.loadingInitial = false;
                });
                console.log(error);
            }
        }
    };

    getCategory = (id) => {
        return this.categoryRegistry.get(id);
    };
}

decorate(CategoryStore, {
    categoryRegistry: observable,
    category: observable,
    loadingInitial: observable,
    submitting: observable,
    target: observable,
    loading: observable,
    categoryCount: observable,
    page: observable,
    predicate: observable,

    axiosParams: computed,
    totalPages: computed,

    setPredicate: action,
    setPage: action,
    loadCategories: action,
    loadCategory: action,
});

export default CategoryStore;
