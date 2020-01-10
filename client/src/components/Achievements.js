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
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Divider from '@material-ui/core/Divider';
import GreenLock from "../img/greenlock.png";


const styles = theme => ({
    card: {
        maxWidth: 345,
        backgroundColor: "#fafafa"
    },
    title: {
        fontSize: 14,
    },
    media: {
        height: 140,
        paddingTop: '56.25%', // 16:9
    },
    pos: {
        marginBottom: 12,
    },
});

let getGreens = 0;

class Achievements extends Component {

    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null, achievements: 0, greensState: 0};


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
            this.setState({ web3, accounts, contract: instance });

            const currentApi = "https://ethgarden.io/api/";
            const config = {
                headers: {'Authorization': "bearer " + this.context.accessToken}
            };
            await axios.get(currentApi + "badges/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    console.log("Here are your badges:");
                    console.log(response.data.length);
                    this.setState({achievements: response.data.length})
                });


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }


        if (this.state.achievements === 0){
            console.log("achievements was 0");
            document.getElementById("Button1").setAttribute("disabled", "false");
        }

        this.getTheGreens();
    };


    getTheGreens = async () => {
        const {greens} = this.context;
        this.setState({greensState: greens});
        setTimeout(this.getTheGreens, 500);
    };



    render() {
        const { classes } = this.props;
        return (

            <div style={{}} className="Shop">

                <div align="center">
                    <h4 style={{color: "grey"}}>Achievements</h4>

                    <br/>

                    <Grid
                        container xl={11} spacing={5}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                        <Grid item xl={2}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    alt="nice plant"
                                    height="325"
                                    width="225"
                                    image= {GreenLock}
                                    title="smallplant"
                                />
                                <h4 style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 100 </h4>
                                <CardContent>
                                    <Button id="Button1" disabled={true} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Divider/>
                        <Grid item xl={2}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    alt="nice plant"
                                    height="325"
                                    width="225"
                                    image= {GreenLock}
                                    title="smallplant"
                                />
                                <h4 style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 1000</h4>
                                <CardContent>
                                    <Button id="Button2" disabled={true} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xl={2}>
                            <Card className={classes.card}>
                                <CardMedia
                                    component="img"
                                    alt="nice plant"
                                    height="325"
                                    width="225"
                                    image= {GreenLock}
                                    title="smallplant"
                                />
                                <h4 style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 10000 </h4>
                                <CardContent>
                                    <Button id="Button3" disabled={true} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </div>

        );
    }
}
export default withStyles(styles)(Achievements);