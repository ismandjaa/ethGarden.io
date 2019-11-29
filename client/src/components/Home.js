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
import axios from "axios";
import SimpleStorageContract from "../contracts/SimpleStorage";
class Home extends Component {


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null };

    componentDidMount = async () => {



        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.




            const signature = await web3.eth.personal.sign("1", web3.currentProvider.selectedAddress, "greattesting");
            console.log(signature + " hello");
            this.setState({ signature, web3, accounts });

            const nonce = await axios.get(`http://ethgarden.pythonanywhere.com/users/`+ accounts)
                .then(res => {
                    console.log("this is nonce:" + res);
                    console.log(res.data);
                });

            axios.post(`http://ethgarden.pythonanywhere.com/api/tokensig/`, { "signature": signature, "nonce": 1 })
                .then(res => {
                    console.log("this is res:" + res);
                    console.log(res.data);
                });

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }


    };



    render() {

        return (

            <div style={{}} className="Home">

                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1>You've been logged in!</h1>

                    <p>
                        your address is:
                    </p>
                    <h5>{this.state.accounts}</h5>

                </div>
            </div>

        );
    }
}
export default Home;