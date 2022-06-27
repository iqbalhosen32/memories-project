import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './Styles.js';
import Input from './Input';
import { GoogleLogin } from 'react-google-login';
import Icon from './Icon';
import { useDispatch } from 'react-redux';
import gapi from 'gapi-script';
import { useNavigate } from 'react-router-dom';
import { signup, signin } from '../../Actions/Auth';
import { AUTH } from '../../Constants/actionTypes.js';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [form, setForm] = useState(initialState);
  const handleShowPassword = () => setShowPassword(!showPassword);
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignUp) {
      dispatch(signup(form, navigate));
    } else {
      dispatch(signin(form, navigate));
    }
  };
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const switchMode = () => {
    setForm(initialState);
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;


    try {
      dispatch({ type: AUTH, data: { result, token } })
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = () => alert('Google Sign In was unsuccessful. Try again later');

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" varient="h5" >{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          {/* <Grid container spacing={2}>
            {
              isSignUp && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />
                </>
              )
            }
            <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            {
              isSignUp && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
            }
          </Grid>
          <Button type='submit' fullWidth variant='contained' color="primary" className={classes.submit}>
            {
              isSignUp ? 'Sign Up' : 'Sign In'
            }
          </Button> */}

          <GoogleLogin
            clientId="Google ID" // Google ID Will be here
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy={'single_host_origin'}
            render={(renderProps) => (
              <Button className={classes.googleButton} color="primary" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant="contained">
                Google Sign In
              </Button>

            )}
          />

          {/* <Grid container justifyContent='flex-end'>
            <Grid item>
              <Button onClick={switchMode}>
                {
                  isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign Up"
                }
              </Button>
            </Grid>
          </Grid> */}
        </form>
      </Paper>
    </Container>
  )
}

export default SignUp;