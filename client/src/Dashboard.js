import React, { useEffect } from 'react';
import './Dashboard.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import Lobby from './Lobby.js'
import Settings from './Settings.js'
import Stats from './Stats.js'


function showLobby()
{
    document.getElementById("lobby-body").style.display = "block";
    document.getElementById("stats-body").style.display = "none";
    document.getElementById("settings-body").style.display = "none";
}

function showStats()
{
    document.getElementById("lobby-body").style.display = "none";
    document.getElementById("stats-body").style.display = "block";
    document.getElementById("settings-body").style.display = "none";
}

function showSettings()
{
    document.getElementById("lobby-body").style.display = "none";
    document.getElementById("stats-body").style.display = "none";
    document.getElementById("settings-body").style.display = "block";
}

export default function Dashboard({setAuthorized})
{
    function handleLogout()
    {
        cookies.remove('token');
        setAuthorized(false);
        window.location.reload();
    }

    // FIXME: tu jest user info
    // Example of function for getting basic information about the user.
    function handleUserInfo(event) {
        // FIXME: error handler

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

    useEffect(() => { showLobby() });

    return(
        <div id = "dsh" className="dashboard-wrapper">
            <div className="dashboard-banner">
                Game Nexus
            </div>
            <div className="topnav">
                <div className="top-button" onClick={showLobby}>Game Lobby</div>
                <div className="top-button" onClick={showStats}>Stats</div>
                <div className="top-button" onClick={showSettings}>Settings</div>
                <div className="top-button" onClick={handleLogout}>Log out</div>
                <div className="top-button" onClick={handleUserInfo}>Get Info Console</div>
            </div>
            <Lobby />
            <Stats />
            <Settings />
        </div>

    );
}
  