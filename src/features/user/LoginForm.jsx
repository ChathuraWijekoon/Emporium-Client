/* eslint-disable jsx-a11y/anchor-is-valid */
// modules
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { toast } from 'react-toastify';

// state
import { RootStoreContext } from '../../app/stores/rootStore';

const LoginForm = () => {
    const rootStore = useContext(RootStoreContext);
    const { login } = rootStore.userStore;

    const [formData, _setFormData] = useState({
        email: '',
        password: '',
    });

    return (
        <section className="section-content padding-y" style={{ minHeight: '84vh' }}>
            <div className="card mx-auto" style={{ maxWidth: 380, marginTop: 50 }}>
                <div className="card-body">
                    <h4 className="card-title mb-4">Sign in</h4>
                    <Form
                        onSubmit={(e) => {
                            e.preventDefault();
                            login(formData).catch((error) => {
                                if (error.data) {
                                    toast.error(error.data.error);
                                }
                            });
                        }}
                    >
                        <a href="#" className="btn btn-facebook btn-block mb-2">
                            <i className="fab fa-facebook-f"></i> Sign in with Facebook
                        </a>
                        <a href="#" className="btn btn-google btn-block mb-4">
                            <i className="fab fa-google"></i> Sign in with Google
                        </a>
                        <Form.Group className="form-group">
                            <Form.Control
                                type="email"
                                placeholder="Username"
                                className="form-control"
                                onChange={(e) => _setFormData({ ...formData, email: e.target.value })}
                            />
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                className="form-control"
                                onChange={(e) => _setFormData({ ...formData, password: e.target.value })}
                            />
                        </Form.Group>

                        <Form.Group className="form-group">
                            <a href="#" className="float-right">
                                Forgot password?
                            </a>
                            <div className="float-left custom-control custom-checkbox">
                                <Form.Control type="checkbox" className="custom-control-input" />
                                <Form.Label className="custom-control-label">Remember</Form.Label>
                            </div>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Login
                            </button>
                        </Form.Group>
                    </Form>
                </div>
            </div>

            <p className="text-center mt-4">
                Don't have account? <Link to="/register">Sign up</Link>
            </p>
            <br />
            <br />
        </section>
    );
};

export default LoginForm;
