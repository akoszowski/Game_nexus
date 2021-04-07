import React, { useState } from 'react';
import './Register.css';

const port = process.env.PORT || 5000;

async function registerUser(credentials)
{
    return fetch(`http://localhost:${port}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
}


export default function Register()
{
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [repPassword, setRepPassword] = useState();
    const repRegisterInput = document.getElementById("repPassword");

    const handleRegister = async e =>
    {
        e.preventDefault();
        if (password === repPassword)
            registerUser({
                username,
                password
            });
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