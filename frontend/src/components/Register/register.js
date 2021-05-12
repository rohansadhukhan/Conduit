import { useState } from "react";
import axios from "axios";
import { Grid, Paper, Avatar, TextField, Button, Typography } from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Register = (props) => {

    const url = 'users';

    const [data, setData] = useState({
        username: "",
        email: "",
        password: "",
        cnfpassword: ""
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
        if (data.password !== data.cnfpassword) {
            alert("Confirm password doesn't match with password");
        } else {
            console.log(data.email);
            axios.post(url, {
                user: {
                    username: data.username,
                    email: data.email,
                    password: data.password
                }
            }).then(res => {
                console.log(res.data);
                localStorage.setItem('token', res.data.user.token);
                props.onClose();
            }).catch(err => {
                // if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
                // else alert(err.response.data.errors.body[0]);
                console.log(err);
            })
        }
    }

    return (
        <>
            <Grid>
                <Paper elevation={10} className='signup-box'>
                    <Grid align='center'>
                        <Avatar><LockIcon /></Avatar>
                        <h2>Sign Up</h2>
                    </Grid>
                    <form onSubmit={onSubmit}>
                        <TextField
                            label='Username'
                            variant="outlined"
                            name='username'
                            placeholder='Enter username'
                            style={{marginTop: '30px'}}
                            onChange={updateValue}
                            fullWidth
                            required />
                        <TextField
                            label='Email'
                            variant="outlined"
                            name='email'
                            placeholder='Enter email'
                            style={{marginTop: '10px'}}
                            onChange={updateValue}
                            fullWidth
                            required />
                        <TextField
                            label='Password'
                            variant="outlined"
                            name='password'
                            placeholder='Enter password'
                            type='password'
                            style={{marginTop: '10px'}}
                            onChange={updateValue}
                            fullWidth
                            required />
                        <TextField
                            label='Confirm Password'
                            variant="outlined"
                            name='cnfpassword'
                            placeholder='Re-enter password'
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
                            variant='contained'>Sign Up</Button>
                        <Typography
                            style={{marginTop: '10px'}}>
                            Already have an account?
                            <span
                                style={{ color: '#3f51b5' }}
                                onClick={() => { props.handleKeyClick(3) }}>Sign In</span>
                        </Typography>
                    </form>
                </Paper>
            </Grid>

        </>
    )
}

export default Register;