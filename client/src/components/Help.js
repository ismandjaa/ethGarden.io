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
class Help extends Component {

    static contextType = LoginContext;


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null, accessToken: null, refreshToken: null };

    componentDidMount = async () => {
        console.log(this.state.accounts);



        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();


            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.




            // console.log(signature + " hello");
            // this.setState({ signature, web3, accounts });
            // console.log(this.state.accounts);

            const currentApi = "https://ethgarden.pythonanywhere.com";

            const nonce = await axios.get(currentApi + '/users/'+ accounts)
                .then(async response => {

                    console.log("user found, signing what's retrieved");
                    console.log("this is the retrieved nonce:");
                    console.log(response.data.nonce);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: " + response.data.nonce.toString(), web3.currentProvider.selectedAddress, "greattesting");
                    console.log(signature);
                    console.log(response.data.nonce.toString());
                    console.log("checksum:");
                    console.log(web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress));
                    axios.post(`https://ethgarden.pythonanywhere.com/api/tokensig/`, { "signature": signature, "nonce": response.data.nonce.toString(), "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;
                            this.setState({refreshToken: refreshToken, accessToken: accessToken });
                        });


                }).catch(async function(error) {
                    console.log(error);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: 1", web3.currentProvider.selectedAddress, "greattesting");

                    axios.post(`https://ethgarden.pythonanywhere.com/api/tokensig/`, { "signature": signature, "nonce": 1, "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh.toString();
                            const accessToken = response.data.access.toString();
                            this.setState({refreshToken: refreshToken, accessToken: accessToken });
                        });
                });

            this.setState({accounts: accounts });
            const {toggleLoginTrue, toggleLoginFalse} = this.context;
            toggleLoginTrue();


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `reload page please`,
            );
            console.error(error);
        }


    };



    render() {
        //here i need to do something like: if data is available show data
        //otherwise default to spinner and loading.


        if (this.state.accounts != null) {




            return (
                <div style={{}} className="Home">

                    <div style={{
                        position: 'relative', left: '0%', top: '30%',

                        //before userNavbar:
                        //position: 'absolute', left: '50%', top: '30%',
                        //transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Logged In!</h1>

                        <p>
                            This is your current working account:
                        </p>
                        <h5>{this.state.accounts}</h5>

                        <p>This is your current Access Token:</p>

                        <TextareaAutosize
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder={this.state.accessToken}
                        />

                        <p>This is your current Refresh Token:</p>

                        <TextareaAutosize
                            rowsMax={4}
                            aria-label="maximum height"
                            placeholder={this.state.refreshToken}
                        />


                        <p>shop button:</p>
                        <Link to="/Shop"><Button variant="outline-primary" onClick = {null} >Ethgarden Shop</Button></Link>

                    </div>
                </div>

            );


        }

        else if (this.state.accounts == null){

            return (
                <div style={{}} className="Home">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Loading</h1>
                        <div style={{
                            position: 'absolute', left: '50%', top: '120%',
                            transform: 'translate(-50%, -50%)'
                        }}>

                            <Spinner animation="border" role="status">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </div>

                    </div>
                </div>

            );
        }


    }
}
export default Help;