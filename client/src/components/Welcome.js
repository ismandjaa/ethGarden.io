import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import getWeb3 from "../utils/getWeb3";
import {Redirect, useHistory} from "react-router-dom";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import {LoginContext} from "../contexts/LoginContext";
import { withStyles } from '@material-ui/core/styles';
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import GreyArrow from '../img/greyarrow.png';


const styles = theme => ({



    card: {
        maxWidth: 560,
        type: "dark",
        backgroundColor: "#303030",
        color: "#E0E0E0",
    },
    title: {
        fontSize: 14,
        color: "white",
    },
    media: {
        height: 140,
        paddingTop: '56.25%', // 16:9
    },
    pos: {
        marginBottom: 12,
    },
});




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

            const currentApi = "https://ethgarden.io/api/";

            const self = this;

            await axios.get(currentApi + 'users/'+ accounts)
                .then(async response => {

                    //console.log("user found, signing what's retrieved:");
                    //console.log(response.data.nonce);
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: " + response.data.nonce.toString(), web3.currentProvider.selectedAddress, "greattesting");
                    //console.log(signature);
                    //console.log("checksum:");
                    //console.log(web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress));
                    axios.post(currentApi + 'tokensig/', { "signature": signature, "nonce": response.data.nonce.toString(), "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            //console.log("tokens received:");
                            //console.log(response.data);
                            const refreshToken = response.data.refresh;
                            const accessToken = response.data.access;
                            this.setState({refreshToken: refreshToken, accessToken: accessToken });

                            const {setAccessToken, setRefreshToken, toggleLoginTrue} = self.context;
                            setAccessToken(accessToken);
                            setRefreshToken(refreshToken);

                            toggleLoginTrue();


                        });


                }).catch(async function(error) {
                    //console.log(error);
                    //console.log("user not found signing 1");
                    const signature = await web3.eth.personal.sign("Ethgarden login nonce: 1", web3.currentProvider.selectedAddress, "greattesting");

                    axios.post(currentApi + 'tokensig/', { "signature": signature, "nonce": 1, "address": web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress)})
                        .then(response => {
                            //console.log("tokens received:");
                            //console.log(response.data);
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
        const { classes } = this.props;

        const spinnerActive = false;

        if (this.spinnerActive === true){
            return (
                <div style={{}} className="Home">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)', color: "#303030"
                    }}>
                        <h1>Loading</h1>
                        <div style={{
                            position: 'absolute', left: '50%', top: '120%',
                            transform: 'translate(-50%, -50%)', color: "#303030"
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
            //console.log("You have web3!");
            return (

                <div style={{}} className="Welcome">

                    <div style={{
                        position: 'absolute', left: '50%', top: '30%',
                        transform: 'translate(-50%, -50%)', color: '#303030',
                    }}>
                        <h1>Welcome!</h1>

                        <h4> You already have web3 installed! </h4>
                        <p> To play the game just hit the Login button!  </p>
                    </div>


                    <div style={{
                        position: 'absolute', left: '50%', top: '80%',
                        transform: 'translate(-50%, -50%)'
                    }}>

                        <img src={GreyArrow} height="100" width="280" style={{position: 'relative', left: '60%'}}/>

                        <Card className={classes.card} raised={true}>

                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" align={"center"}>
                                        Testnet !
                                    </Typography>

                                    <Typography variant="body2" component="p">
                                        Ethgarden is currently live on the Ropsten testnet.
                                        This means that you need testnet ethereum to play the game!
                                    </Typography>
                                    <br></br>
                                    <Typography gutterBottom variant="body1" component="p">
                                        Faucet: <a href="https://faucet.ropsten.be/">faucet.ropsten.be</a>
                                    </Typography>
                                </CardContent>

                        </Card>

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
                        transform: 'translate(-50%, -50%)', color: '#303030'
                    }}>
                        <h1>Welcome!</h1>
                            <p>To play Ethgarden you need to install Metamask :(</p>
                            <p>You can do se here: <a href="https://metamask.io/">Metamask.io</a></p>

                    </div>

                    <div style={{
                        position: 'absolute', left: '50%', top: '90%',
                        transform: 'translate(-50%, -50%)'
                    }}>

                        <img src={GreyArrow} height="100" width="280" style={{position: 'relative', left: '60%'}}/>

                        <Card className={classes.card} raised={true}>

                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2" align={"center"}>
                                    Testnet !
                                </Typography>
                                <Typography variant="body2" component="p">
                                    Ethgarden is currently live on the Ropsten testnet.
                                    This means that you need testnet ethereum to play the game!
                                </Typography>
                                <br/>
                                <Typography gutterBottom variant="body1" component="p">
                                    Faucet: <a href="https://faucet.ropsten.be/">faucet.ropsten.be</a>
                                </Typography>
                            </CardContent>

                        </Card>

                    </div>
                </div>

            );
        }
    }
}
export default withStyles(styles)(Welcome);