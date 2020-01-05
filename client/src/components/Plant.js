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

const useStyles = makeStyles({
    card: {
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

const plant = [];

export default function Plant() {
    const classes = useStyles();

    const {selectedPlant} = useContext(LoginContext);

    let history = useHistory();

    const forceUpdate = useForceUpdate();

    const removePlant = () => {
        //empties plant array
        plant.length = 0;
    };

    useEffect( () => {
        // Your code here
        async function getThePlant() {

            if (selectedPlant === false){

                console.log("selected Plant not found");
                history.push("/Garden");

            }
            else {

                const web3 = await getWeb3();
                const currentApi = "https://ethgarden.io/api/";

                console.log("you are trying to get this plant: " + selectedPlant);

                await axios.get(currentApi + "plant/" + selectedPlant)
                    .then(response => {
                        //console.log(response.data);
                        removePlant();

                        plant.push(response.data);

                        console.log(plant[0].owner);

                        forceUpdate();

                    });
            }


        }
        getThePlant();
    }, []);

    console.log(plant[0]);

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image="/static/images/cards/contemplative-reptile.jpg"
                    title="Contemplative Reptile"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        hello
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                        across all continents except Antarctica
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
    );
}