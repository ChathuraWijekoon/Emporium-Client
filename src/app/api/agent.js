import axios from 'axios';
import { history } from '../..';
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

axios.interceptors.request.use(
    (config) => {
        const token = window.localStorage.getItem('jwt');
        if (token) config.headers.Authorization = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
        toast.error('Network error - make sure API is running!');
    }
    const { status, data, config } = error.response;
    if (status === 404) {
        history.push('/notfound');
    }
    if (status === 401) {
        window.localStorage.removeItem('jwt');
        history.push('/login');
        toast.info('Your session has expired, please login again');
    }
    if (status === 400 && config.method === 'get' && data.errors.hasOwnProperty('id')) {
        history.push('/notfound');
    }
    if (status === 500) {
        toast.error('Server error - check the terminal for more info!');
    }
    throw error.response;
});

const responseBody = (response) => response.data;

const requests = {
    get: (url) => axios.get(url).then(responseBody),
    post: (url, body) => axios.post(url, body).then(responseBody),
    put: (url, body) => axios.put(url, body).then(responseBody),
    del: (url) => axios.delete(url).then(responseBody),
    postForm: (url, file) => {
        let formData = new FormData();
        formData.append('File', file);
        return axios
            .post(url, formData, {
                headers: { 'Content-type': 'multipart/form-data' },
            })
            .then(responseBody);
    },
    putForm: (url, file) => {
        let formData = new FormData();
        formData.append('file', file);
        return axios
            .put(url, formData, {
                headers: { 'Content-type': 'multipart/form-data' },
            })
            .then(responseBody);
    },
};

const User = {
    current: () => requests.get('/auth/me'),
    login: (user) => requests.post(`/auth/login`, user),
    register: (user) => requests.post(`/auth/register`, user),
    social: (user) => requests.post(`/auth/social`, user),
};

const Products = {
    list: (params) => axios.get('/products', { params: params }).then(responseBody),
    details: (id) => requests.get(`/products/${id}`),
    create: (product, categoryId) => requests.post(`/categories/${categoryId}/products`, product),
    update: (product) => requests.put(`/products/${product._id}`, product),
    uploadPhoto: (id, photo) => requests.putForm(`/products/${id}/photo`, photo),
};

const Admin = {
    listProducts: (params) => axios.get('/admin/products', { params: params }).then(responseBody),
    detailsProduct: (id) => requests.get(`/admin/products/${id}`),
    updateProduct: (product) => requests.put(`/admin/products/${product._id}`, product),
    uploadProductPhoto: (id, photo) => requests.putForm(`/admin/products/${id}/photo`, photo),
    deleteProduct: (id: string) => requests.del(`/admin/products/${id}`),
    listUsers: (params) => axios.get('/users', { params: params }).then(responseBody),
    detailsUser: (id) => requests.get(`/users/${id}`),
};

const Categories = {
    list: (params) => axios.get('/categories', { params: params }).then(responseBody),
    details: (id) => requests.get(`/categories/${id}`),
};

const Carts = {
    list: (params) => axios.get('/carts', { params: params }).then(responseBody),
    details: (id) => requests.get(`/carts/${id}`),
    create: (cart) => requests.post(`/carts`, cart),
    update: (cart) => requests.put(`/carts/${cart._id}`, cart),
};

export default {
    User,
    Products,
    Admin,
    Categories,
    Carts,
};
