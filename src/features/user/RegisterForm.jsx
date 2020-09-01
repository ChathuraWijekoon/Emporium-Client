import React from 'react';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';

const RegisterForm = () => {
    return (
        <section className="section-content padding-y">
            <div className="card mx-auto" style={{ maxWidth: 520, marginTop: 40 }}>
                <article className="card-body">
                    <header className="mb-4">
                        <h4 className="card-title">Sign up</h4>
                    </header>
                    <Form>
                        <Form.Row className="form-row">
                            <Form.Group className="col form-group">
                                <Form.Label>First name</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder="" />
                            </Form.Group>
                            <Form.Group className="col form-group">
                                <Form.Label>Last name</Form.Label>
                                <Form.Control type="text" className="form-control" placeholder="" />
                            </Form.Group>
                        </Form.Row>
                        <Form.Group className="form-group">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" className="form-control" placeholder="" />
                            <small className="form-text text-muted">
                                We'll never share your email with anyone else.
                            </small>
                        </Form.Group>
                        <Form.Group className="form-group">
                            <Form.Label>Sign up as</Form.Label>
                            <select id="userRole" className="form-control">
                                <option>Choose...</option>
                                <option>User</option>
                                <option>Seller</option>
                            </select>
                        </Form.Group>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label>Create password</label>
                                <input className="form-control" type="password" />
                            </div>
                            <div className="form-group col-md-6">
                                <label>Repeat password</label>
                                <input className="form-control" type="password" />
                            </div>
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary btn-block">
                                Register
                            </button>
                        </div>
                        <div className="form-group">
                            <label className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" />
                                <div className="custom-control-label">
                                    I am agree with <Link to="/">terms and contitions</Link>
                                </div>
                            </label>
                        </div>
                    </Form>
                </article>
            </div>
            <p className="text-center mt-4">
                Have an account? <Link to="/login">Log In</Link>
            </p>
            <br />
            <br />
        </section>
    );
};

export default RegisterForm;
