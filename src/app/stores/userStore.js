import { observable, computed, action, runInAction, decorate } from 'mobx';
import agent from '../api/agent';
import { history } from '../..';

class UserStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;
    }

    isAdmin = false;
    user = null;

    get isLoggedIn() {
        return !!this.user;
    }

    login = async (values) => {
        try {
            const user = await agent.User.login(values);
            if (user.success) {
                runInAction(() => {
                    this.user = user;
                });
                this.rootStore.commonStore.setToken(user.token);
                const userProfile = await agent.User.current();
                if(userProfile.success && userProfile.data.role === "admin") {
                    this.isAdmin = true;
                }
            }
           
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

    social = async (values) => {
        try {
            const user = await agent.User.social(values);
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
