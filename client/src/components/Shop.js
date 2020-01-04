import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import getWeb3 from "../utils/getWeb3";
import PlantBase from "../contracts/PlantBase";

import {PageContext} from "../contexts/PageContext";
import {LoginContext} from "../contexts/LoginContext";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


class Shop extends Component {

    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null, open: false };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    getInput = async () => {

        this.setState({ open: false });
        const price = document.getElementById("finalPrice").value;
        console.log("this is the price: " + price + " eth");

        const { accounts, contract } = this.state;

        const PurchaseValue = price * 1000000000000000000;
        //get this from user
        const shippingFee = await contract.methods.shippingFee().call();

        const value = +PurchaseValue + +shippingFee;

        const options = {from: accounts[0], value: value};

        const test = contract.methods.mint().send(options )
            .on('receipt', function(receipt) {
                // receipt example
                console.log(receipt);
            })

    };

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
            this.setState({ web3, accounts, contract: instance });


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

    promptDialog = async () => {

        this.handleClickOpen();
        console.log();

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

                    <Button variant="outline-primary" onClick = {this.promptDialog} >Buy Plant</Button>

                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Name your price</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Get a random plant with attributes matching your pricepoint.
                            <br></br>
                            This plant is refundable.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="finalPrice"
                            label="Price in ETH"
                            type="price"
                            halfwidth = "true"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.getInput} color="primary">
                            Buy plant
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

        );
    }
}
export default Shop;