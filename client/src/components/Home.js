import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { BrowserRouter as Router} from 'react-router-dom';
//IMPORT REACT-ROUTER HERE.
//import { Route, Redirect } from 'react-router'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage";
class Home extends Component {

    render() {
        return (

            <div style={{}} className="Home">

                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1>Home</h1>
                    <p>
                        React router is currently routing to Home.js
                    </p>
                </div>
            </div>

        );
    }
}
export default Home;