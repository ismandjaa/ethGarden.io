import React, { useContext, useEffect, useState } from "react";
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
import {useHistory} from "react-router-dom";

const useStyles = makeStyles({
    card: {
        //minWidth: 300,
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

const plants = [];

export default function Garden() {

    const {setSelectedPlant} = useContext(LoginContext);

    const classes = useStyles();

    let history = useHistory();

    const forceUpdate = useForceUpdate();

    function emptyPlants() {
        //empties plant array
        plants.length = 0;
    }

    useEffect( () => {
        async function getMyPlants() {

            const web3 = await getWeb3();
            const currentApi = "https://ethgarden.io/api/";

            web3.currentProvider.setMaxListeners(0); //fix
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
                    //console.log({plants});
                    forceUpdate();

                });
            setTimeout(getMyPlants, 5000);
        }
        getMyPlants();
    }, []);

    function redirectToPlant(ev) {

        const target = ev.currentTarget.querySelector('div').querySelector('h2').innerHTML.substr(1);
        //console.log(target);

        setSelectedPlant(target);

        //console.log("trying to redirect to plant");
        history.push("/Plant");

        //here i need to change context to the target
        //and then redirect to plant route.


    }

    function getPlantImg(plant_id) {

    const images={
        0:"https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg",
        1: "https://cgaxisimg.ams3.cdn.digitaloceanspaces.com/2014/10/23a-copy1.jpg",
        2:"https://cloudinary-a.akamaihd.net/ufn/image/upload/biaxkijyvddm5zzrf9iq.jpg",
        3:"https://images.homedepot-static.com/productImages/cd3c9e1b-e172-44ea-a03c-11052df95e7e/svn/house-plants-21917-64_1000.jpg",
        4:"https://i.pinimg.com/originals/45/1c/41/451c41cae3e242aafeda0205b24b6109.jpg",
        5: "https://media.gq.com/photos/5d1bc24d4b12140009c87b85/master/w_1280%2Cc_limit/ZZ-Plant.jpg",
        6:"https://i.pinimg.com/originals/d0/9c/70/d09c703421083313a9bcf2fa20566708.jpg",
        7:"https://www.tropicalplantsonline.com/assets/images/Golden-Pothos-Totem.jpg",
        8:"https://www.ikea.com/gb/en/images/products/epipremnum-potted-plant-golden-pothos__0573935_PE667974_S5.JPG",
        9:"https://www.easycare-plants.com/wp-content/uploads/2019/02/Dypsis-24-cm.jpg"
    };

    const image = images[plant_id.plant_id.charAt(plant_id.plant_id.length-1)];
        return (

            image
        )
    }


    if (plants.length === 0){
        return(
            <div style={{}} className="NoPlants">

                <div style={{
                    position: 'fixed', left: '50%', top: '30%',
                    transform: 'translate(-50%, -50%)',
                    color: "grey"
                }}>
                    <h1>You don't have any plants yet.. :(</h1>

                    <br/>

                    <h4> You can buy plants in the shop on the left </h4>
                    <h4> .. or receive them from a friend!  </h4>
                </div>
            </div>
        )
    }

    else {
        return (

            <Grid
                container xl={11} spacing={1}
                direction="row"
                justify="flex-start"
            >
                {plants.map((plant_id) => {
                    return <Grid item xl={2} key={plant_id.plant_id}>
                        <Card className={classes.card}>
                            <CardActionArea onClick = {redirectToPlant}>
                                <CardMedia
                                    component="img"
                                    alt="nice plant"
                                    height="325"
                                    width="225"
                                    image= {getPlantImg(plant_id)}
                                    title="smallplant"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2" id="plantId">
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
}