import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage";
import {Redirect} from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import {TokenContext} from "../contexts/TokenContext";
import {LoginContext} from "../contexts/LoginContext";
class Welcome extends Component {


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null, accessToken: null, refreshToken: null };

    static contextType = LoginContext;


//welcome should host the login code
    // when navbar sets "loggingin" to true
    // start logging in, show a spinner
    // if login is successful set login context true, and "loggingin" to false
    // if login not successfull show error, revert to "loggingin" false a.k.a welcome screen.

    componentDidUpdate = async () => {
        const {spinner, toggleSpinnerFalse} = this.context;

        if(spinner){
            this.spinnerActive = true;
            toggleSpinnerFalse();
            this.loggingin();

        }
    };


    loggingin = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();

            const currentApi = "http://134.209.225.213/";

            const self = this;

            await axios.get(currentApi + 'users/'+ accounts)
                .then(async response => {

                    console.log("user found, signing what's retrieved:");
                    console.log(response.data.nonce);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: " + response.data.nonce.toString(), web3.currentProvider.selectedAddress, "greattesting");
                    console.log(signature);
                    console.log("checksum:");
                    console.log(web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress));
                    axios.post(currentApi + 'api/tokensig/', { "signature": signature, "nonce": response.data.nonce.toString(), "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;
                            this.setState({refreshToken: refreshToken, accessToken: accessToken });

                            const {setAccessToken, setRefreshToken, toggleLoginTrue} = self.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);

                            toggleLoginTrue();


                        });


                }).catch(async function(error) {
                    console.log(error);
                    console.log("user not found signing 1");
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: 1", web3.currentProvider.selectedAddress, "greattesting");

                    axios.post(currentApi + 'api/tokensig/', { "signature": signature, "nonce": 1, "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;

                            self.setState({refreshToken: refreshToken, accessToken: accessToken });

                            const {setAccessToken, setRefreshToken, toggleLoginTrue} = self.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);

                            toggleLoginTrue();
                        });
                });

        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `reload page please`,
            );
            console.error(error);
        }
    };



    render() {

        const spinnerActive = false;

        if (this.spinnerActive === true){
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


        if (typeof web3 !== "undefined") {
            console.log("You have web3!");
            return (

                <div style={{}} className="Welcome">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Welcome!</h1>

                        <h4> You already have web3 installed! </h4>
                        <p> To play the game just hit the Login button!  </p>
                    </div>
                </div>

            );
        }
        else if (typeof web3 === "undefined"){
            console.log("You don't have web3 :(");
            return (

                <div style={{}} className="Welcome">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Welcome!</h1>
                            <p>To play Ethgarden you need to install Metamask :(</p>
                            <p>You can do se here: <a href="https://metamask.io/">Metamask.io</a></p>

                    </div>
                </div>

            );
        }
    }
}
export default Welcome;