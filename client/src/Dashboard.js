import React from 'react';
import './Dashboard.css';

export default function Dashboard({setToken}) 
{

  function logOut()
  {
    localStorage.clear();
    window.location.reload();
  }

  return(
    <div className="dashboard-wrapper">
      <div className="topnav">
        <div className="top-button">Game Lobby</div>
        <div className="top-button">Stats</div>
        <div className="top-button">Settings</div>
        <div className="top-button" onClick={logOut}>Log out</div>
      </div>
      <div className="dashboard-content">
        <center><h1>Game Nexus Dashboard</h1></center>
      </div>
    </div>
    
  );
}