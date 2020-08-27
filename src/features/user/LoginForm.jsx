import React from 'react'
import { Form } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

const LoginForm = () => {
    return (
        <div className="section">
            <div className="container">
                <Form>
                    <h3 class="my-3">Sign In</h3>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                    </Form.Group>

                    <Form.Group controlId="formBasicCheckbox">
                        <Form.Check type="checkbox" label="Remember me!" />
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                    <p className="forgot-password text-right">
                        Forgot <a href="#">password?</a>
                    </p>
                </Form>
            </div>
        </div>
    );
}

export default LoginForm;