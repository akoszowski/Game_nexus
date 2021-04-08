import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios'
import sha1 from 'sha1'
import './Login.css';

const port = process.env.PORT || 5000;

export default function Login({setToken})
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

    const handleLogin = e =>
    {
        console.log("Trying to log in");

        e.preventDefault();
        axios.post("/api/login", {
            username: username,
            password: sha1(password)
        }).then(res => {
            console.log("Successfully logged in!");
            console.log(res.data.token);
            setToken(res.data);
        }).catch(err => {
            console.log("Error!");
            alert("Invalid login data. Try one more time!");
        });
    }

    return(
        <div className="login-wrapper">
            <h1>Please Log In</h1>
            <form onSubmit={handleLogin}>
                <label>
                    <p>Username</p>
                    <input required type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input required type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}