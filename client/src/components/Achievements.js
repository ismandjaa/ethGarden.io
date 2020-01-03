import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import {BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
//IMPORT REACT-ROUTER HERE.
//import { Route, Redirect } from 'react-router'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import axios from "axios";
import SimpleStorageContract from "../contracts/SimpleStorage";
import Navbar from "./Navbar"
import TextareaAutosize from '@material-ui/core/TextareaAutosize'
import {LoginContext} from "../contexts/LoginContext";
class Achievements extends Component {

    static contextType = LoginContext;


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null, accessToken: null, refreshToken: null };




    render() {
        //here i need to do something like: if data is available show data
        //otherwise default to spinner and loading.

        return (
            <div style={{}} className="Help">

                <div style={{
                    position: 'relative', left: '0%', top: '30%',

                    //before userNavbar:
                    //position: 'absolute', left: '50%', top: '30%',
                    //transform: 'translate(-50%, -50%)'
                }}>
                    <h1>Achievements</h1>


                </div>
            </div>

        );


    }
}
export default Achievements;