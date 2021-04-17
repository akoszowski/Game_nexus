import React, {useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tabs";
import './Login.css';
import axios from 'axios'
import sha1 from 'sha1'
import 'react-phone-number-input/style.css'
import {cookies} from './cookie-manager'

function Login({setAuthorized}) 
{
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState(" ");
    const [name, setName] = useState("");

    function error(errorMsg){
        setErrorMsg(errorMsg);
        setPassword("");
    }

    function resetError(){
        setErrorMsg(" ");
    }

    function handleLogin(event) {
         const errorFun = error;

        event.preventDefault();
        axios.post("/api/v1/login", {
            email: email,
            password: sha1(password)
        }).then((response) => {
            console.log("Success!");
            cookies.set('token', response.data.token, {path: '/'});
            setAuthorized(true);
            console.log(cookies.get('token'));
        }).catch(function (error) {
            console.log("Error!");
            console.log(error.response.data);
            errorFun(JSON.stringify(error.response.data));
        });
    }

    function handleRegister(event) {
        const errorFun = error;

        event.preventDefault();
        axios.post("/api/v1/register", {
            email: email,
            name: name,
            password: sha1(password),
        }).then((response) => {
            console.log("Success!");
            cookies.set('token', response.data.token, {path: '/'});
            setAuthorized(true);
            console.log(cookies.get('token'));
        }).catch((error) => {
            console.log("Error!");
            console.log(error);
            errorFun(JSON.stringify(error.response.data));
        });
    }

    return (
        <div className="Login">
            <Tabs onSelect={resetError} >
                <Tab eventKey="LoginTab" title="Login" onClick={resetError} tabClassName="noborder">
                    <div className="error"> {errorMsg}</div>
                    <Form onSubmit={(e) => handleLogin(e)}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <div className="error">⠀</div>
                    </Form>
                </Tab>
                <Tab eventKey="Register" title="Register" onClick={resetError}>
                    <div className="error"> {errorMsg}</div>
                    <Form onSubmit={(e) => handleRegister(e)}>
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                autoFocus
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="name">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                autoFocus
                                required
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group size="lg" controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Register
                        </Button>
                        <div className="error">⠀</div>
                    </Form>
                </Tab>
            </Tabs>
        </div>
    );
}

export default Login;