import { useState } from "react";
import axios from "axios"
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import './login.css'


const Login = (props) => {

    const url = 'users/login';

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const updateValue = (event) => {
        const name = event.target.name;
        var value = event.target.value;

        setData((preValue) => {
            if (name === "checkbox" && preValue.checkbox === "on") value = "off";
            return {
                ...preValue,
                [name]: value
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        axios.post(url, {
            user: {
                email: data.email,
                password: data.password
            }
        }).then(res => {
            console.log(res.data);
            localStorage.setItem('token', res.data.user.token);
            props.onClose();
        }).catch(err => {
            if (err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            else alert(err.response.data.errors.body[0]);
        })
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} className='signup-box' >
                    <Grid align='center'>
                        <Avatar><LockIcon /></Avatar>
                        <h2>Log In to Conduit</h2>
                    </Grid>
                    <form onSubmit={onSubmit}>
                        <TextField
                            name='email'
                            variant="outlined"
                            label='Email'
                            placeholder='Enter email'
                            style={{marginTop: '30px'}}
                            onChange={updateValue}
                            fullWidth
                            required />
                        <TextField
                            name='password'
                            variant="outlined"
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            style={{marginTop: '10px'}}
                            onChange={updateValue}
                            fullWidth
                            required />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    // checked={state.checkedB}
                                    // onChange={handleChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="Remember me" />
                        <Button
                            type='submit'
                            color='primary'
                            fullWidth
                            variant='contained'
                            className='signup-button'>Sign In</Button>
                        <Typography
                            style={{marginTop: '10px'}}>
                            <Link href="#">
                                Forgot Password?
                            </Link>
                        </Typography>
                        <Typography
                            style={{marginTop: '10px'}}>
                            Do you have an account?
                            <span
                                style={{color: '#3f51b5'}}
                                onClick={() => {props.handleKeyClick(4)}}>Sign Up</span>
                        </Typography>
                    </form>
                </Paper>
            </Grid>
        </>
    )
}

export default Login;