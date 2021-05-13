import React, { useEffect, useState } from 'react';
import './Dashboard.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import Lobby from './Lobby.js'
import Settings from './Settings.js'
import Stats from './Stats.js'
import Ranking from './Ranking';


function showLobby()
{
    document.getElementById("lobby-body").style.display = "block";
    document.getElementById("stats-body").style.display = "none";
    document.getElementById("ranking-body").style.display = "none";
    document.getElementById("settings-body").style.display = "none";
}

function showStats()
{
    document.getElementById("lobby-body").style.display = "none";
    document.getElementById("stats-body").style.display = "block";
    document.getElementById("ranking-body").style.display = "none";
    document.getElementById("settings-body").style.display = "none";
}

function showRanking()
{
    document.getElementById("lobby-body").style.display = "none";
    document.getElementById("stats-body").style.display = "none";
    document.getElementById("ranking-body").style.display = "block";
    document.getElementById("settings-body").style.display = "none";
}

function showSettings()
{
    document.getElementById("lobby-body").style.display = "none";
    document.getElementById("stats-body").style.display = "none";
    document.getElementById("ranking-body").style.display = "none";
    document.getElementById("settings-body").style.display = "block";
}

export default function Dashboard({setAuthorized})
{
    const [mailvalue, setMail] = useState();

    function handleLogout()
    {
        cookies.remove('token');
        setAuthorized(false);
        window.location.reload();
    }

    function handleUserInfo(event) {
        // FIXME: error handler

        if (event)
            event.preventDefault();
        
        let data = null;
        let token = cookies.get('token');
        axios.post("/api/v1/userInfo", {token: token}).then(res =>{
            
            data = res.data;
            if (document.getElementById("namebutton"))
                document.getElementById("namebutton").innerHTML = "[" + data.username + "]";

            setMail(data.mail);
            return data.username;
            
        }).catch((error) => {
            console.log("Error!");
            console.log(error);
            // errorFun(JSON.stringify(error.response.data));
        });
    }

    async function getUserName()
    {
        await handleUserInfo();
        console.log("Mail set: " + mailvalue);
    }

    useEffect(() => { 
        showLobby(); 
        getUserName();
    });

    return(
        <div id = "dsh" className="dashboard-wrapper">
            <div className="dashboard-banner">
                Game Nexus
            </div>
            <div className="topnav">
                <div className="top-button" onClick={showLobby}>Game Lobby</div>
                <div className="top-button" onClick={showStats}>Stats</div>
                <div className="top-button" onClick={showRanking}>Ranking</div>
                <div className="top-button" onClick={showSettings}>Settings</div>
                <div className="top-button" onClick={handleLogout}>Log out</div>
                <div id = "namebutton" className="top-button right-button" onClick={handleUserInfo}>[Username]</div>
            </div>
            <Lobby mailvalue = {mailvalue} />
            <Stats mailvalue = {mailvalue} />
            <Ranking />
            <Settings usernamevalue = {mailvalue} />
        </div>

    );
}
  