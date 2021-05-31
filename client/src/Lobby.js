import React from 'react';
import './Dashboard.css';
import './Lobby.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import e from 'cors';

// FIXME:
//  ->  przed wejściem do gry: api/v1/newGame {username: , game: }
//  ->  po res status 200: https://game-nexus-rps.herokuapp.com/game/start {username: }
//  ->  jeśli dostaniesz status 400, to gracz ma jeszcze aktywną rozgrywkę
//  ->  i teraz w res masz urla na którego robisz redirect w nowej karcie

function playRPSSingle() {
    window.open("https://game-nexus-ttt.herokuapp.com/single", "_blank");
}

function playRPSMulti() {
    window.open("https://game-nexus-ttt.herokuapp.com", "_blank");
}

function playTTTSingle() {
    window.open("https://game-nexus-rps.herokuapp.com/single", "_blank");
}

function playTTTMulti() {
    window.open("https://game-nexus-rps.herokuapp.com/ ", "_blank");
}

function playSabacc() {

}

export default function Lobby({mailvalue})
{

    return (
        <div id = "lobby-body" className="lobby-content main-content">
            <div className="vert vert-header" onClick = {playRPSSingle}>Rock-paper-scissors (Single)</div>

            <div className="vert vert-header" onClick = {playRPSMulti}>Rock-paper-scissors (Multi)</div>

            <div className="vert vert-header" onClick = {playTTTSingle}>Tic-tac-toe (Single)</div>

            <div className="vert vert-header" onClick = {playTTTMulti}>Tic-tac-toe (Multi)</div>

            <div className="vert vert-header" onClick = {playSabacc}>Sabaac</div>
        </div>
    )
}