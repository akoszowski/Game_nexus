import React from 'react';
//import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';
import Dashboard from './Dashboard';
import Login from './Login';
import useToken from './useToken';
import Register from './Register';


function App()
{
    const { token, setToken } = useToken();

    console.log(token);
    console.log(setToken);

    if (!token)
    {
        return (
            <div className = "wrapper">
                <Login setToken={setToken} />
                <Register />
            </div>
        );
    }

    return (
        <div className = "app-wrapper">
            <Dashboard setToken={setToken} />
        </div>
    );
}

export default App;