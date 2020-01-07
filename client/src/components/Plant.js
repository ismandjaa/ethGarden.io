import React, {useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {LoginContext} from "../contexts/LoginContext";
import {useHistory} from "react-router-dom";
import getWeb3 from "../utils/getWeb3";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import IconButton from "@material-ui/core/IconButton";
import AutorenewIcon from '@material-ui/icons/Autorenew';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import Spinner from 'react-bootstrap/Spinner';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import SendIcon from '@material-ui/icons/Send';
import PlantBase from "../contracts/PlantBase";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles({
    card: {
        maxHeight: 1080,
        minWidth: 500,
        maxWidth: 1000,
    },
    media: {
        height: 400,
        width: 400,
    },

    table: {
        minWidth: 400,
        maxWidth: 700,
    }
});

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const plant = [];

const plantOwner = [];

const plantValue = [];

const plantId = [];

const plantERC = [];

const plantGreensPerBlock = [];


//THIS SHOULD BE A CLASS COMPONENT INSTEAD OF FUNCTIONAL COMPONENT AS STATE IS NEEDED FOR DIFFERENT DIALOGS
export default function Plant() {
    const classes = useStyles();

    const {selectedPlant} = useContext(LoginContext);

    let history = useHistory();

    const forceUpdate = useForceUpdate();

    const removePlant = () => {
        //empties plant array
        plant.length = 0;

        plantOwner.length = 0;
        plantValue.length = 0;
        plantId.length = 0;
        plantERC.length = 0;
        plantGreensPerBlock.length = 0;
    };


    useEffect( () => {
        // Your code here
        async function getThePlant() {

            if (selectedPlant === false){

                console.log("selected Plant not found");
                history.push("/Garden");

            }
            else {

                const currentApi = "https://ethgarden.io/api/";

                console.log("you are trying to get this plant: " + selectedPlant);

                await axios.get(currentApi + "plant/" + selectedPlant)
                    .then(response => {
                        //console.log(response.data);
                        removePlant();

                        plant.push(response.data);

                        plantOwner.push(plant[0].owner);

                        plantValue.push(plant[0].value);

                        plantId.push(plant[0].plant_id);

                        plantERC.push(plant[0].erc20_address);

                        plantGreensPerBlock.push(plant[0].greens_per_block);

                        forceUpdate();

                    });
            }


        }
        getThePlant();
    }, []);


    const getPlantOwner = (plantOwner[0]);
    const getPlantValue = (plantValue[0]);
    const getPlantId = (plantId[0]);
    const getPlantERC = (plantERC[0]);
    const getPlantGreensPerBlock = (plantGreensPerBlock[0]);

    const handleBack = () => {
        removePlant();
        console.log("trying to go back");
        history.push("/Garden");

    };

    function getPlantImg() {

        if (getPlantId === undefined){
            return(null)
        }
        else {

            const images = {
                0: "https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg",
                1: "https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg",
                2: "https://cloudinary-a.akamaihd.net/ufn/image/upload/biaxkijyvddm5zzrf9iq.jpg",
                3: "https://images.homedepot-static.com/productImages/cd3c9e1b-e172-44ea-a03c-11052df95e7e/svn/house-plants-21917-64_1000.jpg",
                4: "https://i.pinimg.com/originals/45/1c/41/451c41cae3e242aafeda0205b24b6109.jpg",
                5: "https://media.gq.com/photos/5d1bc24d4b12140009c87b85/master/w_1280%2Cc_limit/ZZ-Plant.jpg",
                6: "https://i.pinimg.com/originals/d0/9c/70/d09c703421083313a9bcf2fa20566708.jpg",
                7: "https://www.tropicalplantsonline.com/assets/images/Golden-Pothos-Totem.jpg",
                8: "https://www.ikea.com/gb/en/images/products/epipremnum-potted-plant-golden-pothos__0573935_PE667974_S5.JPG",
                9: "https://www.easycare-plants.com/wp-content/uploads/2019/02/Dypsis-24-cm.jpg"
            };

            const image = images[plantId[0].charAt(plantId[0].length - 1)];

            return (

                image
            )
        }
    }


    const [open, setOpen, ] = React.useState(false);

    let [refundDialog] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    async function refundPlant(){

        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(
            PlantBase.abi,
            "0x25F7f77ce006C2F5BeC35d8D4a820e3Ad47f1d90",
        );

        console.log(getPlantId);

        const options = {from: accounts[0]};

        contract.methods.refund(getPlantId).send(options)
            .on('receipt', function(receipt) {
                // receipt example
                console.log(receipt);
            })

    }


    async function getInput(){

        handleClose();

        const address = document.getElementById("ethAddress").value;

        const web3 = await getWeb3();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const contract = new web3.eth.Contract(
            PlantBase.abi,
            "0x25F7f77ce006C2F5BeC35d8D4a820e3Ad47f1d90",
        );

        console.log(getPlantId);

        const options = {from: accounts[0]};

        contract.methods.safeTransferFrom(getPlantOwner, address, getPlantId).send(options)
            .on('receipt', function(receipt) {
                // receipt example
                console.log(receipt);
            })

    }




    return (

        <div align="center">
            <IconButton onClick={handleBack}>
                <ChevronLeftIcon />
            </IconButton>
                <Box pt={1} />
                <Card className={classes.card} raised={false} align="center">
                    <CardContent>

                            {getPlantImg() ? (
                                <CardMedia
                                    component="img"
                                    alt="nice plant"
                                    className={classes.media}
                                    image= {getPlantImg()}
                                    title="Contemplative Reptile"
                                />
                            ) : (
                                <Spinner />
                            )}

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h1" align="center">
                                Plant ID: #{getPlantId}
                            </Typography>
                            <Divider />
                            <Typography variant="body2" color="textSecondary" component="p">
                                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                                across all continents except Antarctica
                            </Typography>
                            <br/>
                            <Table className={classes.table} aria-label="caption table">
                                <TableBody>

                                        <TableRow>
                                            <TableCell align="left">Value:</TableCell>
                                            <TableCell align="right">{getPlantValue/1000000000000000000} ETH</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Greens Per Block:</TableCell>
                                            <TableCell align="right">{getPlantGreensPerBlock}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Plant ERC Address:</TableCell>
                                            <TableCell align="right">{getPlantERC}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left">Owner:</TableCell>
                                            <TableCell align="right">{getPlantOwner}</TableCell>
                                        </TableRow>



                                </TableBody>
                            </Table>
                        </CardContent>
                    </CardContent>
                    <CardActions style={{justifyContent: 'flex-end'}}>
                        <Fab variant="extended" style={{background: '#81C784', color: "white", }} onClick = {handleClickOpen}>
                            <SendIcon className={classes.extendedIcon}/>
                            TRANSFER
                        </Fab>
                        <Fab variant="extended" onClick = {refundPlant}>
                            <AutorenewIcon className={classes.extendedIcon}/>
                              REFUND
                        </Fab>
                    </CardActions>
                </Card>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Transfer plant #{getPlantId}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To transfer this plant to a new address, please enter the address you want to transfer to:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethAddress"
                        label="Ethereum Address"
                        type="Ethereum Address"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={getInput} color="primary">
                        TRANSFER
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Transfer plant #{getPlantId}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To transfer this plant to a new address, please enter the address you want to transfer to:
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="ethAddress"
                        label="Ethereum Address"
                        type="Ethereum Address"
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        CANCEL
                    </Button>
                    <Button onClick={getInput} color="primary">
                        TRANSFER
                    </Button>
                </DialogActions>
            </Dialog>

        </div>


    );
}