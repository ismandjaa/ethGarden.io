import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import {TokenContext} from "../contexts/TokenContext";
import axios from "axios";

class Login extends Component {

    static contextType = TokenContext;


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null, accessToken: null, refreshToken: null };

    componentDidMount = async () => {


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

                            const {setAccessToken, setRefreshToken} = self.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);
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
        return (

            <div style={{}} className="Home">

                <div style={{
                    position: 'absolute', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <h1>Login</h1>
                    <p>
                        Using Metamask
                    </p>
                </div>
            </div>

        );
    }


}
export default Login;