import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import getWeb3 from "../utils/getWeb3";
import PlantBase from "../contracts/PlantBase";

import {PageContext} from "../contexts/PageContext";
import {LoginContext} from "../contexts/LoginContext";

class Shop extends Component {

    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null };


    componentDidMount = async () => {
        try {
            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contract instance.
            const networkId = await web3.eth.net.getId();
            const instance = new web3.eth.Contract(
                PlantBase.abi,
                "0x25F7f77ce006C2F5BeC35d8D4a820e3Ad47f1d90",
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

    buyPlant = async () => {
        const { accounts, contract } = this.state;

        const assumedPurchaseValue = 1000000000000000;
        //get this from user
        const shippingFee = await contract.methods.shippingFee().call();

        const value = +assumedPurchaseValue + +shippingFee;

        const options = {from: accounts[0], value: value};

        const test = contract.methods.mint().send(options )
        .on('receipt', function(receipt) {
            // receipt example
            console.log(receipt);
        })
    };


    render() {
        return (

            <div style={{}} className="Shop">

                <div style={{
                    position: 'relative', left: '50%', top: '50%',
                    transform: 'translate(-50%, 0%)'
                }}>
                    <h1>Shop</h1>
                    <p>
                        Welcome to the ethgarden shop!
                    </p>

                    <Button variant="outline-primary" onClick = {this.buyPlant} >Buy Plant</Button><Button variant="outline-primary"   >Refund Plant</Button><Button variant="outline-primary"   >boom</Button>

                </div>
            </div>

        );
    }
}
export default Shop;