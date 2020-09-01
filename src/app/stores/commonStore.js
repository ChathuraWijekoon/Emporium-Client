import { observable, action, reaction, decorate } from 'mobx';

class CommonStore {
    rootStore;
    constructor(rootStore) {
        this.rootStore = rootStore;

        reaction(
            () => this.token,
            (token) => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            },
        );
    }

    token = window.localStorage.getItem('jwt');
    appLoaded = false;

    setToken = (token) => {
        this.token = token;
    };

    setAppLoaded = () => {
        this.appLoaded = true;
    };
}

decorate(CommonStore, {
    token: observable,
    appLoaded: observable,

    setToken: action,
    setAppLoaded: action,
});

export default CommonStore;
