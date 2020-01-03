import React, {useContext} from 'react';
import {PageContext} from "../contexts/PageContext";
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Ethgarden from "./Ethgarden";
import Main from "./Main";
import {Redirect, Link, useHistory} from "react-router-dom";
import Shop from "./Shop";
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import HelpIcon from '@material-ui/icons/Help';
import Button from "@material-ui/core/Button";
import {LoginContext} from "../contexts/LoginContext";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
}));

export default function MiniDrawer() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    let history = useHistory();

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);

    };

    const handleHome = () => {
        setOpen(false);
        console.log("trying to redirect");
        history.push("/Home");

    };

    const handleShop = () => {
        setOpen(false);
        console.log("trying to redirect");
        history.push("/Shop");

    };

    const handleAchievements = () => {
        setOpen(false);
        console.log("trying to redirect");
        history.push("/Achievements");

    };

    const handleHelp = () => {
        setOpen(false);
        console.log("trying to redirect");
        history.push("/Help");

    };

    const handleLogout = () => {

        //probably remove access and refresh tokens

        toggleLoginFalse();

    };
    const {toggleLoginFalse} = useContext(LoginContext);



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{
                    background: '#81C784',
                }}
            >
                <Toolbar>
                    <Button id="loginButton" onClick = {handleLogout} style={{boxShadow: "none", position: 'absolute', right: '15px', top: '15px', outline: 'none', color: 'white', borderColor: 'none'}}>
                        LOGOUT
                    </Button>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {window.location.pathname.substr(1)}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <h3 style={{
                        color: '#616161',
                    }}> EthGarden </h3><h3 style={{
                    color: '#81C784',
                }}> .io </h3>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>

                </div>


                <List>
                    <ListItem button onClick={handleHome}>
                        <ListItemIcon>{<LocalFloristIcon />}</ListItemIcon>
                        <ListItemText primary={"My garden"} />
                    </ListItem>
                    <ListItem button onClick={handleShop}>
                        <ListItemIcon>{<ShoppingBasketIcon />}</ListItemIcon>
                        <ListItemText primary={"Shop"} />
                    </ListItem>
                    <ListItem button onClick={handleAchievements}>
                        <ListItemIcon>{<StarBorderIcon />}</ListItemIcon>
                        <ListItemText primary={"Achievements"} />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    <ListItem button onClick={handleHelp}>
                        <ListItemIcon>{<HelpIcon />}</ListItemIcon>
                        <ListItemText primary={"Help"} />
                    </ListItem>
                </List>


            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <Main />
            </main>
        </div>
    );
}