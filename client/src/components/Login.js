import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import SimpleStorageContract from "../contracts/SimpleStorage";

class Login extends Component {

    state = { storageValue: 0, web3: null, accounts: null, contract: null };

    componentDidMount = async () => {

        try {
            // Get network provider and web3 instance.
            console.log("lets login");
            const web3 = await getWeb3();

            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            console.log(accounts);

            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = SimpleStorageContract.networks[networkId];
            const instance = new web3.eth.Contract(
                SimpleStorageContract.abi,
                deployedNetwork && deployedNetwork.address,
            );

            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance }, this.runExample);
        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }
    };
    signLogin = async () => {
        const { web3 } = this.state;
        const signed = null;
        //const accounts = await web3.eth.getAccounts();
        const account = await web3.currentProvider.selectedAddress;
        web3.eth.personal.sign(account, web3.currentProvider.selectedAddress, "greattesting", getit())
            .then(console.log, getit());

        function getit(callback){
            console.log("was called" + callback);
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