import axios from 'axios';
import React from 'react'

export default class Home extends React.Component {

    state = {}

    componentDidMount() {

        // const config = {
        //     headers: {
        //         Authorization: "Token " + localStorage.getItem('token')
        //     }
        // };

        const url = "user";

        axios.get(url).then(res => {
            console.log(res);
            this.setState({
                user : res.data.user
            })
        }).catch(err => {
            console.log(err)
        })
    }

    render() {
        if(this.state.user) {
            return (
                <div>
                    <h1>{this.state.user.username} is loged in</h1>
                </div>
            )
        }
        return (
            <div>
                <h1>User</h1>
            </div>
        )
    }

}