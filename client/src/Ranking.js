import React, {useState, useEffect} from 'react';
import './Dashboard.css';
import './Ranking.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Ranking({games, username, rankingInfo})
{
    return (
        <div id ="ranking-body" className="ranking-content main-content">
            {games.map((gamesRow, gamesRowIndex) => {
                    return <div>
                        <h1>{gamesRow.game}</h1>
                        <Table bordered class="ranking-table">
                            <thead>
                            <tr>
                                <th className="place">Place</th>
                                <th className="username">Username</th>
                                <th className="winds">Total wins</th>
                            </tr>
                            </thead>

                            {rankingInfo.filter(rankingRow => rankingRow.game === gamesRow.game).map((row, rowIndex) => {
                                    return <tbody>
                                    <tr>
                                        <td className="place">{rowIndex + 1}</td>
                                        <td className="username">{row.username}</td>
                                        <td className="wins">{row.wins}</td>
                                    </tr>
                                    </tbody>;
                                }
                            )}
                        </Table>
                    </div>;
                }
            )}
        </div>
    );
}