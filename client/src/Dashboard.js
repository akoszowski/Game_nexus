import React from 'react';
import './Dashboard.css';
import {cookies} from './cookie-manager'
import axios from "axios";

export default function Dashboard({setAuthorized})
{
    // TODO:
    //  1. checkout cookies
    //  2.

    function handleLogout()
    {
        cookies.remove('token');
        setAuthorized(false);
        window.location.reload();
    }

    // Example of function for getting basic information about the user.
    function handleUserInfo(event) {
        // TODO: error handler ?

        event.preventDefault();
        let token = cookies.get('token');
        axios.post("/api/v1/userInfo", {token: token}).then(res =>{
            const data = res.data;
            console.log(data);
            console.log(data.mail);
            console.log(data.username);
            // console.log(data.);
        }).catch((error) => {
            console.log("Error!");
            console.log(error);
            // errorFun(JSON.stringify(error.response.data));
        });
    }

    return(
        <div className="dashboard-wrapper">
            <div className="topnav">
                <div className="top-button">Game Lobby</div>
                <div className="top-button">Stats</div>
                <div className="top-button" onClick={handleUserInfo}>Settings</div>
                <div className="top-button" onClick={handleLogout}>Log out</div>
            </div>
            <div className="dashboard-content">
                <center><h1>Game Nexus Dashboard</h1></center>
            </div>
        </div>

    );
}
