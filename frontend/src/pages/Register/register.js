// import { Link } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Navbar from '../../components/Navbar/navbar';
import { Grid, Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Register = () => {

    const url = 'users';
    const history = useHistory();

    const [data, setData] = useState({
        username: "",
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
        // if(data.password !== data.cnfpassword) alert("Confirm password doesn't match with password");
        // else {
        
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
            history.push('/');
        }).catch(err => {
            // if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            // else alert(err.response.data.errors.body[0]);
            console.log(err);
        })
        // }
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
                            label='Name'
                            placeholder='Enter name'
                            fullWidth
                            required />
                        <TextField
                            label='Username'
                            placeholder='Enter username'
                            fullWidth
                            required />
                        <TextField
                            label='Email'
                            placeholder='Enter email'
                            fullWidth
                            required />
                        <TextField
                            label='Password'
                            placeholder='Enter password'
                            type='password'
                            fullWidth
                            required />
                        <TextField
                            label='Confirm Password'
                            placeholder='Re-enter password'
                            type='password'
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
                        <Typography>
                            Already have an account?
                            <Link href="/login">
                                Sign In
                            </Link>
                        </Typography>
                    </form>
                </Paper>
            </Grid>

        </>
    )
}

export default Register;

{/* <div className="reg_form_box">
                <div className="field_design">
                    <h3>Create account using</h3>
                </div>
                {/* <div className="social_icons">
                    <img src="media/google.png" alt="google"/>
                    <img src="media/facebook.png" alt="facebook"/>
                    <img src="media/linkedin.png" alt="linkedin"/>
                    <img src="media/twitter.png" alt="twitter"/>
                </div> */}
// <form className="input_box" onSubmit={onSubmit}>
//     {/* <input 
//         type="text" 
//         className="input_field" 
//         placeholder="Name" 
//         name="name" 
//         onChange={updateValue} 
//         required/> */}
//     <input 
//         type="text" 
//         className="input_field" 
//         placeholder="Username" 
//         name="username" 
//         onChange={updateValue} 
//         required/>
//     <input 
//         type="email" 
//         className="input_field" 
//         placeholder="Email id" 
//         name="email" 
//         onChange={updateValue} 
//         required/>
//     <input 
//         type="password" 
//         className="input_field" 
//         placeholder="Password" 
//         name="password" 
//         onChange={updateValue} 
//         required/>
{/* <input 
                        type="password" 
                        className="input_field" 
                        placeholder="Confirm password" 
                        name="cnfpassword" 
                        onChange={updateValue} 
                        required/> */}
{/* <input 
                        type="checkbox" 
                        className="check_box" 
                        name="checkbox" 
                        onChange={updateValue}/><span>Remember me</span> */}
            //         <button
            //             type="submit" 
            //             className="submit_button">Register</button>
            //     </form>
            //     <div className="below_button">
            //         <p className="col-95">Already have an account?
            //         <Link to="/login" className="another_comp">Log in</Link>
            //         </p>
            //     </div>
            // </div> */}