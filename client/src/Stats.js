import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import './Stats.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Stats({games, username, statsInfo})
{

    // useEffect(() => {
    //     console.log("Sending get stats request")
    //     axios.get("api/v1/statsInfo", {
    //         params: {
    //             username: username
    //         },
    //     }).then(res => {
    //         console.log("Got stats data");
    //         setUserStatsRows(res.data);
    //     }).catch(err => {
    //         console.log("Error downloading userStats data!");
    //         console.log(err);
    //     })
    // });

    return (
        <div id ="stats-body" className="stats-content main-content">
            {games.map((gamesRow, gamesRowIndex) => {
                    console.log(statsInfo);
                    const totalGames = statsInfo.filter(statsRow => statsRow.game === gamesRow.game).length;
                    const wins = statsInfo.filter(statsRow => statsRow.game === gamesRow.game && statsRow.result === 1).length;
                    return <div>
                        <h1>{gamesRow.game}</h1>
                        <Table bordered class="stats-table">
                            <thead>
                            <tr>
                                <th className="username">Username</th>
                                <th className="date">Date</th>
                                <th className="result">Result</th>
                            </tr>
                            </thead>

                            {statsInfo.filter(statsRow => statsRow.game === gamesRow.game).map(row => {
                                    return <tbody>
                                    <tr>
                                        <td className="username">{row.username}</td>
                                        <td className="date">{row.date}</td>
                                        <td className="result">{row.result}</td>
                                    </tr>
                                    </tbody>;
                                }
                            )}
                            <br/>
                            <p>Total wins: {wins}</p>
                            <p>Total losses: {totalGames - wins}</p>
                            <p>Ratio: {(wins/totalGames * 100).toFixed()}%</p>
                        </Table>
                    </div>;
                }
            )}
        </div>
    );
}