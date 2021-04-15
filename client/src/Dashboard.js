// import React, {Component} from 'react';
// import './Dashboard.css';
// import './Login.css'
// import axios from 'axios'
// import {changeRootState, send, checkCookies} from './state-manager'
import {cookies} from './cookie-manager'
// import Table from 'react-bootstrap/Table'
// import Button from 'react-bootstrap/Button'
// import Spinner from 'react-bootstrap/Spinner'
// import 'bootstrap/dist/css/bootstrap.min.css';
// import {isDefined, minutesToStr} from './helpers'

import React from 'react';
import './Dashboard.css';

export default function Dashboard({setAuthorized})
{
    // TODO: checkout cookies

    function logOut()
    {
        cookies.remove('token');
        setAuthorized(false);
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

// class Dashboard extends Component {
//
//     constructor() {
//         super();
//         this.state = {
//             waitForServer: true,
//             rows: [],
//             errorMsg: "",
//             poolInfo: new Map()
//         };
//     }
//
//     getPoolInfo(id) {
//         let res  = this.state.poolInfo.get(id);
//         return res ? res : {nazwa:"",adres:""};
//     }
//
//     componentDidMount() {
//         changeRootState({});
//         let token = cookies.get("token");
//         axios.get('/api/v1/list', {params: {token: token}}).then((res) => {
//             const data = res.data;
//             console.log(data);
//             this.setState({rows: data.rows, waitForServer: false});
//             data.rows.map((row)=> {
//                 axios.get('/api/v1/poolInfo', {
//                     params: {
//                         id: row.idbasenu
//                     }
//                 }).then((res) => {
//                     let data = res.data[0];
//                     this.setState((prevState) => {
//                         let copy = Object.assign({}, prevState);
//                         copy.poolInfo.set(data.id, {nazwa: data.nazwa, adres: data.adres});
//                         console.log(copy);
//                         return copy;
//                     });
//                 }).catch((err) => this.setState({errorMsg: err.message}));
//             });
//         }).catch((err) => {
//             this.setState({errorMsg: "Error downloading reservation data: \n" + err});
//         });
//     }
//
//     render() {
//         checkCookies();
//         return <div className="dashboard">
//             <div className="error">{this.state.errorMsg}</div>
//             <Table bordered className="dashboardTable">
//                 <thead>
//                     <tr>
//                         <th className="id">Id</th>
//                         <th className="name=">Name</th>
//                         <th className="address">Adress</th>
//                         <th className="nrtoru">Pool lane no.</th>
//                         <th className="date">Date</th>
//                         <th className="from">From</th>
//                         <th className="to">To</th>
//                     </tr>
//                 </thead>
//                 {this.state.waitForServer ?
//                     (
//                         <tbody>
//                             <tr>
//                                 <th colSpan="100%"><Spinner animation="border" role="status"/></th>
//                             </tr>
//                         </tbody>
//                     )
//                     : (this.state.rows.length == 0 ?
//                             (<tbody>
//                                     <tr>
//                                         <th colSpan="100%">You have no upcoming reservations</th>
//                                     </tr>
//                                 </tbody>
//                             )
//                             :
//                             (this.state.rows.map((row, rowIndex) => {
//                                 console.log(row);
//                                 return <tbody>
//                                     <tr className="poolsRow">
//                                         <td className="numer">{row.id}</td>
//                                         <td className="name"> {this.getPoolInfo(row.idbasenu).nazwa}</td>
//                                         <td className="address">{this.getPoolInfo(row.idbasenu).adres}</td>
//                                         <td className="nrtoru">{row.nrtoru}</td>
//                                         <td className="date">{new Date(row.dzien).toLocaleDateString("pl-PL")}</td>
//                                         <td className="from">{minutesToStr(row.czasod)}</td>
//                                         <td className="to">{minutesToStr(row.czasdo)}</td>
//                                     </tr>
//                                 </tbody>;
//                             }))
//                     )
//                 }
//             </Table>
//             <div className="buttons">
//                 <Button className="newButton" onClick={(e) => changeRootState({page: "pools"})}>New reservation</Button>
//                 <Button className="newButton" onClick={(e) => send("logout", {detail: e})}>Logout</Button>
//             </div>
//         </div>;
//     }
// }

// export default Dashboard;