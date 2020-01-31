import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import getWeb3 from "../utils/getWeb3";
import PlantBase from "../contracts/PlantBase";
import {LoginContext} from "../contexts/LoginContext";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import { withStyles } from '@material-ui/core/styles';
import axios from "axios";
import Divider from '@material-ui/core/Divider';
import GreenLock from "../img/greenlock.png";
import Medal1 from "../img/medal1.png";
import Medal2 from "../img/medal2.png";
import Medal3 from "../img/medal3.png";
import Blank from "../img/blank.png";


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

//let getGreens = 0;

class Achievements extends Component {

    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null, achievements: 0, greensState: 0, pictureState1: Blank, pictureState2: Blank, pictureState3: Blank, buttonState1: true, buttonState2: true, buttonState3: true};

    //INSERT EMPTY PICTURE AS STANDARD IN THE SAME SIZE AS GREENLOCK AND MEDAL
    //TODO: MAYBE ADD SETSTATE IF IT DOESNT UPDATE LIVE WHEN CORRECT AMOUNT GREENS / MEDAL ACHIEVED.
    componentDidMount = async () => {
        try {

            // Get network provider and web3 instance.
            const web3 = await getWeb3();
            // Use web3 to get the user's accounts.
            const accounts = await web3.eth.getAccounts();
            // Get the contract instance.
            const instance = new web3.eth.Contract(
                PlantBase.abi,
                "0x25F7f77ce006C2F5BeC35d8D4a820e3Ad47f1d90",
            );
            this.setState({ web3, accounts, contract: instance });

            const currentApi = "https://ethgarden.io/api/";

            await axios.get(currentApi + "badges/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    //console.log("Here are your badges:");
                    //console.log(response.data);
                    //console.log(web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress));
                    //console.log(response.data.length);
                    this.setState({achievements: response.data.length});
                });


        } catch (error) {
            // Catch any errors for any of the above operations.
            alert(
                `Failed to load web3, accounts, or contract. Check console for details.`,
            );
            console.error(error);
        }

        if (this.state.achievements === 0){
            this.setAchievementZero();

        }
        else if (this.state.achievements === 1){
            this.setAchievementOne();

        }
        else if (this.state.achievements === 2){
            this.setAchievementTwo();

        }
        else if (this.state.achievements === 3){
            this.setAchievementThree();

        }

        this.getTheGreens();
    };


    getTheGreens = async () => {
        const {greens} = this.context;
        this.setState({greensState: greens});

        if (this.state.greensState > 100){
            this.setState({buttonState1: false});
        }
        if (this.state.greensState > 1000){
            this.setState({buttonState2: false});
        }
        if (this.state.greensState > 10000){
            this.setState({buttonState3: false});
        }

        setTimeout(this.getTheGreens, 500);
    };

    setAchievementZero (){
        //console.log("achievements was 0");
        this.setState({pictureState1: GreenLock});
        this.setState({pictureState2: GreenLock});
        this.setState({pictureState3: GreenLock});
    };
    setAchievementOne (){
        //console.log("achievements was 1");
        document.getElementById("CardContent1").parentNode.removeChild(document.getElementById("CardContent1"));
        document.getElementById("Points1").style.visibility = "hidden";
        this.setState({pictureState1: Medal1});
        this.setState({pictureState2: GreenLock});
        this.setState({pictureState3: GreenLock});
        this.setState({achievements: 1});
    };
    setAchievementTwo (){
        //console.log("achievements was 2");
        document.getElementById("CardContent1").parentNode.removeChild(document.getElementById("CardContent1"));
        document.getElementById("Points1").style.visibility = "hidden";
        document.getElementById("CardContent2").parentNode.removeChild(document.getElementById("CardContent2"));
        document.getElementById("Points2").style.visibility = "hidden";
        this.setState({pictureState1: Medal1});
        this.setState({pictureState2: Medal2});
        this.setState({pictureState3: GreenLock});
        this.setState({achievements: 2});
    };
    setAchievementThree (){
        //console.log("achievements was 3");
        document.getElementById("CardContent1").parentNode.removeChild(document.getElementById("CardContent1"));
        document.getElementById("Points1").style.visibility = "hidden";
        document.getElementById("CardContent2").parentNode.removeChild(document.getElementById("CardContent2"));
        document.getElementById("Points2").style.visibility = "hidden";
        document.getElementById("CardContent3").parentNode.removeChild(document.getElementById("CardContent3"));
        document.getElementById("Points3").style.visibility = "hidden";
        this.setState({pictureState1: Medal1});
        this.setState({pictureState2: Medal2});
        this.setState({pictureState3: Medal3});
    };

    claimAchievementOne = async () => {
        //console.log("i wanna claim achievement 1");

        if (this.state.greensState > 100 && this.state.achievements === 0){
            const currentApi = "https://ethgarden.io/api/";
            const web3 = this.state.web3;
            let userId = null;
            //get user id
            await axios.get(currentApi + "users/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    userId = response.data.id;
                }).catch(console.log);
            //Sends refresh Token and gets access token and sets to context
            await axios.post(currentApi + "refresh/",
                {
                    refresh: this.context.refreshToken
                })
                .then(response => {
                    const {setAccessToken} = this.context;
                    setAccessToken(response.data.access);
                }).catch(console.log);
            //sends user id and access token to claim badge
            await axios.post(currentApi + "badges/claim",
                {
                    user_id: userId,
                    badge_id: "3"
                },
                { headers: {Authorization: `Bearer ${this.context.accessToken}` }})
                .then(response => {
                    //console.log(response.data);
                    this.setState({pictureState1: Medal1});
                    document.getElementById("CardContent1").parentNode.removeChild(document.getElementById("CardContent1"));
                    document.getElementById("Points1").style.visibility = "hidden";
                    this.setState({achievements: 1});
                }).catch(console.log);
        }
    };
    claimAchievementTwo = async () => {
        //console.log("i wanna claim achievement 2");

        if (this.state.greensState > 1000  && this.state.achievements === 1){
            const currentApi = "https://ethgarden.io/api/";
            const web3 = this.state.web3;
            let userId = null;
            //get user id
            await axios.get(currentApi + "users/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    userId = response.data.id;
                }).catch(console.log);
            //Sends refresh Token and gets access token and sets to context
            await axios.post(currentApi + "refresh/",
                {
                    refresh: this.context.refreshToken
                })
                .then(response => {
                    const {setAccessToken} = this.context;
                    setAccessToken(response.data.access);
                }).catch(console.log);
            //sends user id and access token to claim badge
            await axios.post(currentApi + "badges/claim",
                {
                    user_id: userId,
                    badge_id: "1"
                },
                { headers: {Authorization: `Bearer ${this.context.accessToken}` }})
                .then(response => {
                    //console.log(response.data);
                    this.setState({pictureState2: Medal2});
                    document.getElementById("CardContent2").parentNode.removeChild(document.getElementById("CardContent2"));
                    document.getElementById("Points2").style.visibility = "hidden";
                    this.setState({achievements: 2});
                }).catch(console.log);
        }
        else if (this.state.greensState > 1000 && this.state.achievements !== 1){
            alert("you need to claim the first achievement!")
        }
    };
    claimAchievementThree = async () => {
        //console.log("i wanna claim achievement 3");

        if (this.state.greensState > 10000 && this.state.achievements === 2){
            const currentApi = "https://ethgarden.io/api/";
            const web3 = this.state.web3;
            let userId = null;
            //get user id
            await axios.get(currentApi + "users/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    userId = response.data.id;
                }).catch(console.log);
            //Sends refresh Token and gets access token and sets to context
            await axios.post(currentApi + "refresh/",
                {
                    refresh: this.context.refreshToken
                })
                .then(response => {
                    const {setAccessToken} = this.context;
                    setAccessToken(response.data.access);
                }).catch(console.log);
            //sends user id and access token to claim badge
            await axios.post(currentApi + "badges/claim",
                {
                    user_id: userId,
                    badge_id: "2"
                },
                { headers: {Authorization: `Bearer ${this.context.accessToken}` }})
                .then(response => {
                    //console.log(response.data);
                    this.setState({pictureState3: Medal3});
                    document.getElementById("CardContent3").parentNode.removeChild(document.getElementById("CardContent3"));
                    document.getElementById("Points3").style.visibility = "hidden";
                    this.setState({achievements: 3});

                }).catch(console.log);
        }
        else if (this.state.greensState > 10000 && this.state.achievements !== 2){
            alert("you need to claim the other achievements first!")
        }
    };


//{loaded ? () : (
//   <div className={classes.progress}>
//     <CircularProgress color="secondary" />
//   </div>
//   )
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
                                    id="Picture1"
                                    component="img"
                                    alt="nice plant"
                                    height="325"
                                    width="225"
                                    image= {this.state.pictureState1}
                                    title="smallplant"
                                />
                                <h4 id="Points1" style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 100 </h4>
                                <CardContent id="CardContent1">
                                    <Button onClick={this.claimAchievementOne} id="Button1" disabled={this.state.buttonState1} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
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
                                    image= {this.state.pictureState2}
                                    title="smallplant"
                                />
                                <h4 id="Points2" style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 1000</h4>
                                <CardContent id="CardContent2">
                                    <Button onClick={this.claimAchievementTwo} id="Button2" disabled={this.state.buttonState2} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
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
                                    image= {this.state.pictureState3}
                                    title="smallplant"
                                />
                                <h4 id="Points3" style={{color: "#616161", position: "relative", top: "-170px"}}> {this.state.greensState} / 10000 </h4>
                                <CardContent id="CardContent3">
                                    <Button onClick={this.claimAchievementThree} id="Button3" disabled={this.state.buttonState3} style={{position: "relative", background: '#81C784', color: "white", borderColor:'#81C784', top:"-40px"}}> Unlock </Button>
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