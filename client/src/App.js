import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Login from './Login';
import Pools from './Pools';
import Timetable from './Timetable';
import Dashboard from './Dashboard';
import {listen} from './state-manager'
import {cookies} from './cookie-manager'
import {isDefined} from './helpers'
import axios from 'axios'
import Jumbotron from 'react-bootstrap/Jumbotron'

function App() {
    const [authorized, setAuthorized] = useState(null);

    if (!authorized)
    {
        return (
            <div className="bg">
                        <div className="App">
                            <Login setAuthorized={setAuthorized} />
                        </div>
                </div>
        );
    } 
    else 
    {
        return (
            <div className="app-wrapper">
                <Dashboard setAuthorized={setAuthorized}/>
            </div>
        );
    }
}

export default App;
