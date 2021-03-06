import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css"
import Button from 'react-bootstrap/Button';
import getWeb3 from "../utils/getWeb3";
import PlantBase from "../contracts/PlantBase";
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

import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    card: {
        maxWidth: 345,
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

class Shop extends Component {

    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null, open1: false, open2: false, open3: false, contract2: null};

    handleClickOpen1 = () => {
        this.setState({ open1: true });
    };

    handleClose1 = () => {
        this.setState({ open1: false });
    };

    handleClickOpen2 = () => {
        this.setState({ open2: true });
    };

    handleClose2 = () => {
        this.setState({ open2: false });
    };

    handleClickOpen3 = () => {
        this.setState({ open3: true });
    };

    handleClose3 = () => {
        this.setState({ open3: false });
    };

    getInput = async () => {
        this.setState({ open1: false });
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

    buyBasic = async () => {
        this.setState({ open2: false });
        const price = 0.01;
        //console.log("this is the price: " + price + " eth");

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

    buyPremium = async () => {
        this.setState({ open3: false });
        const price = 0.1;
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
            //const instance2 = new web3.eth.Contract(
                //GardenTestToken,
                //"0xab7f1A5D32376B0fa17FBCe9e71f2e83Adf930d7",
            //);
            // Set web3, accounts, and contract to the state, and then proceed with an
            // example of interacting with the contract's methods.
            this.setState({ web3, accounts, contract: instance});
            //this.setState({ web3, accounts, contract: instance, contract2: instance2 });



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

    buyPlantERC20 = async () => {
        const { accounts, contract2, contract } = this.state;

        const assumedPurchaseValue = 1000000000000000;
        //get this from user
        const shippingFee = await contract.methods.shippingFee().call();

        const value = +assumedPurchaseValue + +shippingFee;

        const options = {from: accounts[0], value: value};

        console.log(10^18);

        const mint = await contract2.methods.mint(accounts[0], "1000000000000000000").send({from: accounts[0]});

        const approve = await contract2.methods.approve("0x25F7f77ce006C2F5BeC35d8D4a820e3Ad47f1d90", "1000000000000000000").send({from: accounts[0]});

        const minterc20 = await contract.methods.mintERC20("0xab7f1A5D32376B0fa17FBCe9e71f2e83Adf930d7").send(options);


    };

    promptDialog1 = async () => {

        this.handleClickOpen1();

    };

    promptDialog2 = async () => {

        this.handleClickOpen2();

    };

    promptDialog3 = async () => {

        this.handleClickOpen3();

    };




    render() {
        const { classes } = this.props;
        return (

            <div style={{}} className="Shop">

                <div align="center">
                    <h4 style={{color: "grey"}}>Psst, want a plant?</h4>

                    <br/>

                    <Grid
                        container xl={11} spacing={5}
                        direction="row"
                        justify="center"
                        alignItems="center"
                    >
                          <Grid item xl={2}>
                              <Card className={classes.card} raised={true}>
                                    <CardActionArea onClick = {this.promptDialog2}>
                                        <CardMedia
                                            component="img"
                                            alt="nice plant"
                                            height="325"
                                            width="225"
                                            image= "https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg"
                                            title="basic"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" id="plantId">
                                                Basic
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Basic Plant with a small chance of being a rare plant!
                                            </Typography>
                                            <br></br>
                                            <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                                                Price: 0.01 ETH
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    </Card>
                          </Grid>
                            <Grid item xl={2}>
                                <Card className={classes.card} raised={true}>
                                    <CardActionArea onClick = {this.promptDialog3}>
                                        <CardMedia
                                            component="img"
                                            alt="nice plant"
                                            height="325"
                                            width="225"
                                            image= "https://i.pinimg.com/originals/d0/9c/70/d09c703421083313a9bcf2fa20566708.jpg"
                                            title="premium"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2" id="plantId">
                                                Premium
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                Premium plant with a small chance of being an ultra rare plant!
                                            </Typography>
                                            <br></br>
                                            <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                                                Price: 0.1 ETH
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        <Grid item xl={2}>
                            <Card className={classes.card} raised={true}>
                                <CardActionArea onClick = {this.promptDialog1}>
                                    <CardMedia
                                        component="img"
                                        alt="nice plant"
                                        height="325"
                                        width="225"
                                        image= "https://www.easycare-plants.com/wp-content/uploads/2019/02/Dypsis-24-cm.jpg"
                                        title="smallplant"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2" id="plantId">
                                            Custom
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Choose your own price and get attributes matching your price point!
                                        </Typography>
                                        <br></br>
                                        <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                                            Price: Your choice!
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>


                    </Grid>

                </div>
                <Dialog
                    open={this.state.open1}
                    onClose={this.handleClose1}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Custom Plant</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Get a random plant with attributes matching your pricepoint.
                            <br></br>
                            This plant is refundable!
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
                        <Button onClick={this.handleClose1} style={{background: '#616161', color: "white", borderColor:'#616161'}}>
                            Cancel
                        </Button>
                        <Button onClick={this.getInput} style={{background: '#81C784', color: "white", borderColor:'#81C784'}}>
                            Buy plant
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open2}
                    onClose={this.handleClose2}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Basic Plant</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Get a basic plant with a small chance of being a rare plant!
                            <br></br>
                            This plant is refundable!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose2} style={{background: '#616161', color: "white", borderColor:'#616161'}}>
                            Cancel
                        </Button>
                        <Button onClick={this.buyBasic} style={{background: '#81C784', color: "white", borderColor:'#81C784'}}>
                            Buy plant
                        </Button>
                    </DialogActions>
                </Dialog>

                <Dialog
                    open={this.state.open3}
                    onClose={this.handleClose3}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Premium Plant</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Get a Premium plant with a small chance of being an ultra rare plant!
                            <br></br>
                            This plant is refundable!
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose3} style={{background: '#616161', color: "white", borderColor:'#616161'}}>
                            Cancel
                        </Button>
                        <Button onClick={this.buyPremium} style={{background: '#81C784', color: "white", borderColor:'#81C784'}}>
                            Buy plant
                        </Button>
                    </DialogActions>
                </Dialog>

            </div>

        );
    }
}
export default withStyles(styles)(Shop);