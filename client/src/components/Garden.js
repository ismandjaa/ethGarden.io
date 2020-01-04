import React, { Component, useContext, useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import "../App.css";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';



import {LoginContext} from "../contexts/LoginContext";
import axios from "axios";
import getWeb3 from "../utils/getWeb3";

const useStyles = makeStyles({
    card: {
        //minWidth: 200,
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => ++value); // update the state to force render
}

const plants = [

];

export default function Garden() {

    const classes = useStyles();

    const forceUpdate = useForceUpdate();

    function emptyPlants() {
        //empties plant array
        plants.length = 0;
    }

    useEffect( () => {
        // Your code here
        async function getMyPlants() {

            const web3 = await getWeb3();
            const currentApi = "http://134.209.225.213/";
            //console.log("You have this many plants:");

            await axios.get(currentApi + "plants/" + web3.utils.toChecksumAddress(web3.currentProvider.selectedAddress))
                .then(response => {
                    //console.log(response.data);
                    const elements = response.data;
                    emptyPlants();


                    for (const [plant_id, owner] of elements.entries()) {
                        //console.log(plant_id, owner);
                        plants.push(owner);
                    }
                    console.log({plants});
                    forceUpdate();

                });


        }
        getMyPlants();
    }, []);



    return (

        <Grid
            container spacing={1}
            direction="row"
            justify="flex-start"
            alignItems="center"
        >
                {plants.map((plant_id) => {
                    return <Grid item lg={2} key={plant_id.plant_id}>
                        <Card className={classes.card}>
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                alt="nice plant"
                                height="325"
                                width="225"
                                image= "https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg"
                                title="smallplant"
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h5" component="h2">
                                    #{plant_id.plant_id}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    This is plant #{plant_id.plant_id},
                                    It is currently producing {plant_id.greens_per_block} "greens" per block!
                                    What a nice plant!
                                </Typography>
                                <br></br>
                                <Typography gutterBottom variant="body1" color="textPrimary" component="p">
                                    {plant_id.value/1000000000000000000} ETH
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Button size="small" color="primary">
                                Share
                            </Button>
                            <Button size="small" color="primary">
                                Learn More
                            </Button>
                        </CardActions>
                    </Card>
                    </Grid>
                })}

        </Grid>



    );
}