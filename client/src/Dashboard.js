import React from 'react';

export default function Dashboard({setToken}) {
    const handleLogout = e =>
    {
        console.log("Logged out");

        setToken(false);
    }

    return (
        <div class="dashboard">
            <center><h2>Game Nexus Dashboard</h2></center>
            <center><button onClick={handleLogout}>Logout</button></center>
        </div>
    );
}