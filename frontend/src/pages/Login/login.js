import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios"


const Login = () => {

    const url = 'users/login';

    const [data, setData] = useState({
        email: "",
        password: "",
    })

    const updateValue = (event) => {
        const name = event.target.name;
        var value = event.target.value;

        setData((preValue) => {
            if(name === "checkbox" && preValue.checkbox === "on") value = "off";
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
        }).catch(err => {
            if(err.response.data.errors.body.length > 1) alert(err.response.data.errors.body[0] + " " + err.response.data.errors.body[1])
            else alert(err.response.data.errors.body[0]);
        })
    }

    return (
        <>
            <div className="login_form_box">
                <div className="field_design">
                    <h3>Login using</h3>
                </div>
                <div className="social_icons">
                    <img src="media/google.png" alt="google"/>
                    <img src="media/facebook.png" alt="facebook"/>
                    <img src="media/linkedin.png" alt="linkedin"/>
                    <img src="media/twitter.png" alt="twitter"/>
                </div>
                <form className="input_box" onSubmit={onSubmit}>
                    <input type="email" className="input_field" placeHolder="Email" name="email" onChange={updateValue} required/>
                    <input type="password" className="input_field" placeHolder="password" name="password" onChange={updateValue} required/>
                    {/* <input type="checkbox" className="check_box" name="checkbox" onClick={updateValue}/><span>Remember me</span> */}
                    <button type="submit" className="submit_button">Log in</button>
                </form>
                <div className="below_button1">
                    <p className="col-95">Don't have an account?
                    <Link to="/register" className="another_comp">Register</Link>
                    </p>
                </div>
                <div className="below_button2">
                    <Link className="another_comp">Forgot password</Link>
                </div>
            </div>
        </>
    )
}

export default Login;