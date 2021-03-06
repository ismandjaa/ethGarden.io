import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import {Redirect} from 'react-router-dom';
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import axios from "axios";
import {LoginContext} from "../contexts/LoginContext";


class Help extends Component {



    static contextType = LoginContext;


    state = { storageValue: 0, web3: null, accounts: null, contract: null, signature: null, nonce: null, accessToken: null, refreshToken: null };



    getGreens = async () => {

        const web3 = await getWeb3();

        const currentApi = "https://ethgarden.io/api/";

        console.log("Here are your greens:");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "users/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress) + "/greens")
            .then(response => {
                console.log(response.data.greens);
            });

    };

    getPlants = async () => {

        const web3 = await getWeb3();

        const currentApi = "https://ethgarden.io/api/";

        console.log("Here are your plants:");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "plants/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
            .then(response => {
                console.log(response.data);
            });

    };

    getAvailableBadges = async () => {

        const web3 = await getWeb3();

        const currentApi = "https://ethgarden.io/api/";

        console.log("Here are the available badges:");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "badges/")
            .then(response => {
                console.log(response.data);
            });

    };

    getMyBadges = async () => {

        const web3 = await getWeb3();

        const currentApi = "https://ethgarden.io/api/";

        console.log("Here are your badges:");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "badges/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
            .then(response => {
                console.log(response.data);
            });

    };

    claimBadge = async () => {

        const web3 = await getWeb3();

        const currentApi = "https://ethgarden.io/api/";

        console.log("Here are your badges:");

        const config = {
            headers: {'Authorization': "bearer " + this.context.accessToken}
        };

        await axios.get(currentApi + "badges/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
            .then(response => {
                console.log(response.data);
            });

    };


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
                        <h1>Help!</h1>

                        <Button variant="outline-primary" onClick = {this.getGreens} >See Greens</Button>
                        <Button variant="outline-primary" onClick = {this.getPlants} >See Plants</Button>
                        <Button variant="outline-primary" onClick = {this.getAvailableBadges} >See all badges</Button>
                        <Button variant="outline-primary" onClick = {this.getMyBadges} >See my badges</Button>

                    </div>
                </div>

            );


    }
}
export default Help;