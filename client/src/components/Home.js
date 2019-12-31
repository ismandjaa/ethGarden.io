import React, { Component } from "react";
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter as Router, Redirect, Link} from 'react-router-dom';
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import axios from "axios";
import {TokenContext} from "../contexts/TokenContext";


class Home extends Component {

    static contextType = TokenContext;


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

            const currentApi = "http://139.59.135.10:8000/";

            const self = this;

            const nonce = await axios.get(currentApi + 'users/'+ accounts)
                .then(async response => {

                    console.log("user found, signing what's retrieved");
                    console.log("this is the retrieved nonce:");
                    console.log(response.data.nonce);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: " + response.data.nonce.toString(), web3.currentProvider.selectedAddress, "greattesting");
                    console.log(signature);
                    console.log(response.data.nonce.toString());
                    console.log("checksum:");
                    console.log(web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress));
                    axios.post(currentApi + 'api/tokensig/', { "signature": signature, "nonce": response.data.nonce.toString(), "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;
                            this.setState({refreshToken: refreshToken, accessToken: accessToken });

                            const {setAccessToken, setRefreshToken} = this.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);

                            console.log(this.context)


                        });


                }).catch(async function(error) {
                    console.log(error);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: 1", web3.currentProvider.selectedAddress, "greattesting");

                    axios.post(currentApi + 'api/tokensig/', { "signature": signature, "nonce": 1, "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            console.log("tokens received:");
                            console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;

                            self.setState({refreshToken: refreshToken, accessToken: accessToken });

                            const {setAccessToken, setRefreshToken} = self.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);

                            console.log(self.context)
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

    axiosPost = async () => {

        const web3 = await getWeb3();

        const currentApi = "http://139.59.135.10:8000/";

        console.log("FUCK YOU");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "badges/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
            .then(response => {
                console.log(response);
            });

    };



    render() {
                //here i need to do something like: if data is available show data
        //otherwise default to spinner and loading.

            return (
                <div style={{}} className="Home">

                    <div style={{
                        position: 'relative', left: '0%', top: '30%',

                        //before userNavbar:
                        //position: 'absolute', left: '50%', top: '30%',
                        //transform: 'translate(-50%, -50%)'
                    }}>
                        <h1>Plants:</h1>

                        <p>
                            These are your plants:
                        </p>
                        <h5>{this.state.accounts}</h5>

                        <p>shop button:</p>
                        <Button variant="outline-primary" onClick = {this.axiosPost} >Ethgarden Shop</Button>

                    </div>
                </div>

            );


        }

}
export default Home;