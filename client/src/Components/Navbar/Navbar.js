import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Toolbar, Typography } from '@material-ui/core';
import useStyles from './Styles';
import memoriesText from "../../Images/memoriesText.png";
import memoriesLogo from "../../Images/memoriesLogo.png";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation, Link } from "react-router-dom";
import decode from 'jwt-decode';
import * as actionType from '../../Constants/actionTypes';

const Navbar = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const location = useLocation()
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    useEffect(() => {
        const token = user?.token;

        if (token) {
            const decodedToken = decode(token);

            if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }

        setUser(JSON.parse(localStorage.getItem('profile')));
    }, [location]);

    // console.log(user?.result.imageUrl)

    const logout = () => {
        dispatch({ type: actionType.LOGOUT })
        navigation('/auth')

        setUser(null)
    }
    return (
        <AppBar className={classes.appBar} position="static" color="inherit">
            <Link to="/" className={classes.brandContainer}>
                <img src={memoriesText} alt='icon' height="45px" />
                <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
            </Link>
            <Toolbar className={classes.toolbar}>
                {user?.result ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} varient="h6">{user.result.name}</Typography>
                        <Button variant="contained" className={classes.logout} color="secondary" onClick={logout} >Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary" >Login</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;