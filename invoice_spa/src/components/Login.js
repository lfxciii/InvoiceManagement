import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                email: "",
                password: ""
            };
    }

    // populate state with user email and password
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    // user attempts to login
    async loginUser() {

        if (this.state.email === "" ||
            this.state.password === "") {
            alert("Please insert valid data");
        } else {

            // log user in
            let response = await fetch("auth/local", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...this.state })
            });

            if (response.status !== 200) {
                alert("Unable to login");
            } else { // request success            
                window.location = "/loggedin";
            }
        }
    }

    // login via google
    async loginGoogle() {

        // not sure what to do here? getting cors error eventhough cors is added manually had to set mode
        let response = await fetch("http://localhost:8000/auth/google", { mode: 'no-cors' });

        if (response.status !== 200) {
            alert("Unable to redirect");
        } else { // request success                    
        }
    }

    render() {
        return (
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" onChange={this.handleChange} name="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" onChange={this.handleChange} name="password" placeholder="Password" />
                </Form.Group>
                <a
                    className="btn btn-success"
                    onClick={this.loginUser.bind(this)}>Login</a>

                <a
                    className="btn btn-danger m-2"
                    href="http://localhost:9000/auth/google">Google Login</a>
                <a
                    className="btn btn-primary"
                    href="http://localhost:9000/auth/google">Facebook Login</a>
            </Form>
        );
    }
}