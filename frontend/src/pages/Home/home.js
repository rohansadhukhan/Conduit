import axios from 'axios';
import React from 'react';
import Navbar from '../../components/navbar';
import Article from '../../components/Articles/articles';
import './home.css';

export default class Home extends React.Component {

    state = {}

    componentDidMount() {

        const config = {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        };

        const url = "user";

        axios.get(url, config).then(res => {
            console.log(res);
            this.setState({
                user: res.data.user
            })
        }).catch(err => {
            console.log(err)
        })


        axios.get('articles').then(res => {
            console.log(res);
            this.setState({
                articles: res.data.articles
            })
        }).catch(err => {
            console.log(err)
        })
    }


    render() {

        if (this.state.user) {
            return (
                <div className='home-box'>
                    <Navbar />
                    <h1>{this.state.user.username} is loged in</h1>
                    {
                        this.state.articles && this.state.articles.map((article, index) => {
                            return (
                                <div key={index}>
                                    <Article 
                                        title = {article.title}
                                        description = {article.description} />
                                </div>
                            )
                        })
                    }
                </div>
            )
        }

        return (
            <div>
                <Navbar />
                <h1>User</h1>
            </div>
        )
    }

}