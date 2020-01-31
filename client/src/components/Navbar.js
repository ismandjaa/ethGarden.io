import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from '@material-ui/core/Button';
import {styled} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import { Link, Redirect } from 'react-router-dom'
import getWeb3 from "../utils/getWeb3";
import {LoginContext} from "../contexts/LoginContext";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";



class Navbar extends Component {
    static contextType = LoginContext;

    state = { storageValue: 0, web3: null, accounts: null, contract: null, login: false, open:false};


    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    startLogin = async () => {

        // Get network provider and web3 instance.
        console.log("Login is trying to get web3");
        await getWeb3()
                .then((response) => {
                    console.log("Log in got it");
                    const {toggleSpinnerTrue} = this.context;
                    toggleSpinnerTrue();


                });
    };

    startLogin2 = () => {


        const {toggleSpinnerTrue} = this.context;
        toggleSpinnerTrue();
    };


        render() {
        //console.log(this.context);


        const EthgardenAppBar = styled(AppBar)({
            background: '#81C784',
            border: 0,
            height: 64,
            padding: '0 30px',
        });

        const LoginFab = styled(Button)({
            background: '#66BB6A',
            '&:hover': {
                background: '#66BB6A !important',
            },

            height: 50,
            padding: '0 30px',
            color: 'white',
            border: 5,
            boxShadow: '2 2px 2px 2px',
        });

            if (typeof web3 !== "undefined") {
                return(
                    <div style={{
                        //position: 'absolute', left: '50%', top: '50%',
                        // transform: 'translate(-50%, -50%)'
                    }} className="App">
                        <div>
                            <EthgardenAppBar color="primary" position="static">
                                <Toolbar>
                                    <Link to='/'><h3 style={{
                                        position: 'absolute',
                                        left: '8px',
                                        top: '15px',
                                        color: 'white'
                                    }}>Ethgarden.io</h3></Link>

                                    <Button id="loginButton" variant="outlined" onClick={this.startLogin2} style={{
                                        boxShadow: "none",
                                        position: 'absolute',
                                        right: '1px',
                                        top: '15px',
                                        outline: 'none',
                                        color: 'white',
                                        borderColor: 'white'
                                    }}>
                                        <SportsEsportsIcon style={{position: 'relative', left: '-8px'}}/>
                                        Login
                                    </Button>

                                </Toolbar>
                            </EthgardenAppBar>

                        </div>
                    </div>



                )
            }

            else {

                return (
                    <div style={{
                        //position: 'absolute', left: '50%', top: '50%',
                        // transform: 'translate(-50%, -50%)'
                    }} className="App">
                        <div>
                            <EthgardenAppBar color="primary" position="static">
                                <Toolbar>
                                    <Link to='/'><h3 style={{
                                        position: 'absolute',
                                        left: '8px',
                                        top: '15px',
                                        color: 'white'
                                    }}>Ethgarden.io</h3></Link>
                                    <Button id="loginButton" variant="outlined" onClick={this.handleClickOpen} style={{
                                        boxShadow: "none",
                                        position: 'absolute',
                                        right: '1px',
                                        top: '15px',
                                        outline: 'none',
                                        color: 'white',
                                        borderColor: 'white'
                                    }}>
                                        <SportsEsportsIcon style={{position: 'relative', left: '-8px'}}/>
                                        Login
                                    </Button>

                                </Toolbar>
                            </EthgardenAppBar>

                        </div>

                        <Dialog
                            open={this.state.open}
                            onClose={this.handleClose}
                            aria-labelledby="form-dialog-title"
                        >
                            <DialogTitle id="form-dialog-title">Missing web3!</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    You need a web3 client to play ethgarden!
                                    <br></br>
                                    Go get one now!
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={this.handleClose}
                                        style={{background: '#616161', color: "white", borderColor: '#616161'}}>
                                    Okay
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>

                );
            }
        //Here i need to get some info from the React Context API.
        //The point of this is to not have to go Prop drilling between react components
        //the Context API is lighter than the REDUX API

        }

}

export default Navbar;

//below is my quick sketch of a navbar
/*
// const Navbar = () => (
//     <header>
//         <nav>
//             <ul>
//                 <li><Link to='/'>Welcome</Link></li>
//                 <li><Link to='/Home'>Home</Link></li>
//                 <li><Link to='/Shop'>Shop</Link></li>
//             </ul>
//         </nav>
//     </header>
// );
// export default Navbar*/
