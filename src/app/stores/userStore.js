import { observable, computed, action, runInAction, decorate } from 'mobx';
import agent from '../api/agent';
import { history } from '../..';

class UserStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    user = null;

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (values) => {
        try {
            const user = await agent.User.login(values);
            runInAction(() => {
                this.user = user;
            });
            this.rootStore.commonStore.setToken(user.token);
            // this.rootStore.modalStore.closeModal();
            history.push('/');
        } catch (error) {
            throw error;
        }
    };

    register = async (values) => {
        try {
            const user = await agent.User.register(values);
            this.rootStore.commonStore.setToken(user.token);
            // this.rootStore.modalStore.closeModal();
            history.push('/');
        } catch (error) {
            throw error;
        }
    };

    getUser = async () => {
        try {
            const user = await agent.User.current();
            runInAction(() => {
                this.user = user.data;
            });
        } catch (error) {
            console.log(error);
        }
    };

    logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    };
}

decorate(UserStore, {
    user: observable,

    isLoggedIn: computed,

    login: action,
    register: action,
    getUser: action,
    logout: action,
});

export default UserStore;
