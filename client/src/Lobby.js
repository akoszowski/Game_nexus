import React from 'react';
import './Dashboard.css';
import './Lobby.css';
import {cookies} from './cookie-manager'
import axios from "axios";
import e from 'cors';


// Dummy Data
// Server-name / game_inprogress / numbers of players in lobby.
const KKSingle = [
    ["K & K (Single) 1", false, 0],
    ["K & K (Single) 2", true, 1],
    ["K & K (Single) 3", true, 1],
    ["K & K (Single) 4", false, 0],
    ["K & K (Single) 5", false, 0]
]

const KKMulti = [
    ["K & K (Multi) 1", false, 0],
    ["K & K (Multi) 2", true, 2],
    ["K & K (Multi) 3", false, 1],
    ["K & K (Multi) 4", false, 0],
    ["K & K (Multi) 5", true, 2]
]

// Server-name / game_inprogress / numbers of players in lobby.
const Sabaac = [
    ["Sabaac 1", true, 5],
    ["Sabaac 2", true, 6],
    ["Sabaac 3", false, 1],
    ["Sabaac 4", false, 6],
    ["Sabaac 5", false, 0]
]

export default function Lobby()
{
    const contentParse = (tab, maxPlayers) => tab.map(element => {
        const classList = element[1] ? "vert vert-game vert-offline" : "vert vert-game";

        return (<div className={classList}>
            <div className="info-tag">{element[0]}</div>
            <div className="info-tag">{element[2]} / {maxPlayers} players</div>
            </div>);
    });

    const KKSingleContent = contentParse(KKSingle, 1);
    const KKSMultiContent = contentParse(KKMulti, 2);
    const SabaacContent = contentParse(Sabaac, 6);

    const toggleDisplay = (divname) => document.getElementById(divname).classList.toggle('obj-hidden');
    const toggleKKS = () => toggleDisplay("KKSW");
    const toggleKKM = () => toggleDisplay("KKMW");
    const toggleSabaac = () => toggleDisplay("SabaccW");

    return (
        <div id = "lobby-body" className="lobby-content main-content">
            <div className="vert vert-header" onClick = {toggleKKS}>Kółko and Krzyżyk (Single)</div>
            <div className="vert-wrapper obj-hidden" id="KKSW">{ KKSingleContent }</div>

            <div className="vert vert-header" onClick = {toggleKKM}>Kółko and Krzyżyk (Multi)</div>
            <div className="vert-wrapper obj-hidden" id="KKMW"> { KKSMultiContent } </div>

            <div className="vert vert-header" onClick = {toggleSabaac}>Sabaac</div>
            <div className="vert-wrapper" id="SabaccW"> { SabaacContent } </div>
        </div>
    )
}