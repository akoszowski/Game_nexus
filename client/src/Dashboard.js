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
    const [data, setData] = useState({username: null, email:null,  games:[], statsInfo: [], rankingInfo: []});

    function handleLogout()
    {
        cookies.remove('token');
        setAuthorized(false);
        window.location.reload();
    }

    useEffect(() => {
        const fetchData = async () => {
            let token = cookies.get('token');

            const userInfo = await axios.post("/api/v1/userInfo", {token: token});

            const gamesInfo = await axios.get("api/v1/gamesInfo");

            const statsInfo = await axios.get("api/v1/statsInfo", {
                params: {
                    username: userInfo.data.username
                },
            });

            const rankingInfo = await axios.get("api/v1/rankingInfo");

            setData({
                username: userInfo.data.username,
                email: userInfo.data.email,
                games: gamesInfo.data,
                statsInfo: statsInfo.data,
                rankingInfo: rankingInfo.data
            });
        };

        fetchData();
        showLobby();
    }, []);

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
                <div id = "namebutton" className="top-button right-button">[{data.username}]</div>
            </div>
            <Lobby mailvalue = {data.email} />
            <Stats games = {data.games} username = {data.username} statsInfo= {data.statsInfo}/>
            <Ranking games = {data.games} username = {data.username} rankingInfo= {data.rankingInfo}/>
            <Settings usernamevalue = {data.email} />
        </div>

    );
}
  