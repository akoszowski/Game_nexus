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

function playTTTSingle()
{

}

function playTTTMulti()
{

}

function playSabacc()
{
    
}

export default function Lobby()
{

    return (
        <div id = "lobby-body" className="lobby-content main-content">
            <div className="vert vert-header" onClick = {playTTTSingle}>Kółko and Krzyżyk (Single)</div>

            <div className="vert vert-header" onClick = {playTTTMulti}>Kółko and Krzyżyk (Multi)</div>

            <div className="vert vert-header" onClick = {playSabacc}>Sabaac</div>
        </div>
    )
}