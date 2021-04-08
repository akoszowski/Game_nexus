import React, { useState } from 'react';
import PropTypes from 'prop-types';
import sha1 from 'sha1'
import axios from 'axios';
import './Register.css';

const port = process.env.PORT || 5000;

export default function Register({setToken})
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [repPassword, setRepPassword] = useState();
    const repRegisterInput = document.getElementById("repPassword");

    const handleRegister = e =>
    {
        console.log("Trying to register");

        e.preventDefault();
        if (password === repPassword) {
            axios.post("/api/register", {
                username: username,
                password: sha1(password)
            }).then(res => {
                console.log("Successfully registered!");
                console.log(res.data.token);
                alert("Successfully registered! Please login");
            }).catch(e => {});
            //     .catch(err => {
            //     console.log(err);
            //     alert("Account with such username already exists. Try one more time!");
            // });
        }
        else
        {
            alert("Different passwords!");
            repRegisterInput.value = "";
        }
    }

    return(
        <div className="register-wrapper">
            <h1>Create new account</h1>
            <form onSubmit={handleRegister}>
                <label>
                    <p>Username</p>
                    <input required type="text" onChange={e => setUserName(e.target.value)} />
                </label>
                <label>
                    <p>Password</p>
                    <input required type="password" onChange={e => setPassword(e.target.value)} />
                </label>
                <label>
                    <p>Repeat Password</p>
                    <input id = "repPassword" required type="password" onChange={e => setRepPassword(e.target.value)} />
                </label>
                <div>
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

Register.propTypes =
    {
        setToken: PropTypes.func.isRequired
    };