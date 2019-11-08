import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavigationIcon from '@material-ui/icons/Navigation';
import SportsEsportsIcon from '@material-ui/icons/SportsEsports';
import Fab from '@material-ui/core/Fab';
import { Link } from 'react-router-dom'


class Navbar extends Component {


    render() {

        const EthgardenAppBar = styled(AppBar)({
            background: '#81C784',
            border: 0,
            height: 50,
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

        return (

            <div style={{
                //position: 'absolute', left: '50%', top: '50%',
                // transform: 'translate(-50%, -50%)'
            }} className="App">
                <div>
                    <EthgardenAppBar color="primary" position="static">
                        <Toolbar>
                            <Link to='/'><h3 style={{position: 'absolute', left: '8px', top: '8px', color: 'white'}}>Ethgarden.io</h3> </Link>
                            <Link to='/Home'> <Button variant="outlined" style={{boxShadow: "none", position: 'absolute', right: '1px', top: '6px', outline: 'none', color: 'white', borderColor: 'white'}}>
                                <SportsEsportsIcon style={{position: 'relative', left: '-8px'}}/>
                                Login
                            </Button>
                            </Link>
                        </Toolbar>
                    </EthgardenAppBar>

                </div>
            </div>
        );
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
