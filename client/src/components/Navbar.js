import React, { Component } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import Button from 'react-bootstrap/Button';
import { styled } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import NavigationIcon from '@material-ui/icons/Navigation';
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

        const LoginFab = styled(Fab)({
            background: '#66BB6A',
            '&:hover': {
                background: '#66BB6A !important',
            },

            height: 50,
            padding: '0 30px',
            color: 'white',
            border: 0,
            //boxShadow: '0 0px 0px 0px',
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
                            <Link to='/Home'> <LoginFab size="medium" onClick={this.signLogin} style={{boxShadow: "none", position: 'absolute', right: '1px', top: '6px', outline: 'none'}} variant="extended" >
                                <NavigationIcon />
                                Login
                            </LoginFab> </Link>
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
