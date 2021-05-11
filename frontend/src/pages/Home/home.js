import axios from 'axios';
import React from 'react';
import Tags from '../../components/Tags/tags';
import Navbar from '../../components/Navbar/navbar';
import SearchBox from '../../components/Search/search';
import Article from '../../components/Articles/articles';
import Modal from '../../components/Modals/modal';
import Login from '../../components/Login/login';
import Register from '../../components/Register/register';
import './home.css';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.handleKeyClick = this.handleKeyClick.bind(this);
    }

    state = {
        isOpenLogin: false,
        isOpenRegister: false
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        };

        axios.get('user', config).then(res => {
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
            console.log(this.state.articles[0]);
        }).catch(err => {
            console.log(err)
        })
    }

    handleKeyClick(position) {
        if (position === 3) {
            this.setState({
                isOpenLogin: true,
                isOpenRegister: false
            })
        } else if (position === 4) {
            this.setState({
                isOpenLogin: false,
                isOpenRegister: true
            })
        }
    }

    handleModalStatus(status) {
        if (status === true) {
            this.setState({
                isOpenLogin: false,
                isOpenRegister: false
            })
        }
    }

    render() {
        return (
            <div className={(this.state.isOpenLogin || this.state.isOpenRegister ? 'blur' : '')}>
                <Navbar
                    user={this.state.user}
                    handleKeyClick={this.handleKeyClick} />

                <Modal
                    open={this.state.isOpenLogin}
                    onClose={() => {
                        this.setState({
                            isOpenLogin: false
                        })
                    }}><Login
                        handleKeyClick={this.handleKeyClick}
                        onClose={() => {
                            this.setState({
                                isOpenLogin: false
                            })
                        }} /></Modal>

                <Modal
                    open={this.state.isOpenRegister}
                    onClose={() => {
                        this.setState({
                            isOpenRegister: false
                        })
                    }}><Register
                        handleKeyClick={this.handleKeyClick}
                        onClose={() => {
                            this.setState({
                                isOpenRegister: false
                            })
                        }} /></Modal>

                <div className='home-box'>
                    <div className='home-articles-box'>
                        <div className='col-7'>
                            {
                                this.state.articles && this.state.articles.map((article, index) => {
                                    return (
                                        <div key={index}>
                                            <Article
                                                username={article.author.username}
                                                title={article.title}
                                                description={article.description} />
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className='col-1'></div>
                        <div className='col-4'>
                            <SearchBox />
                            <div className='home-tags'>
                                <Tags>React JS</Tags>
                                <Tags>Competitive programming</Tags>
                                <Tags>Backend</Tags>
                                <Tags>Books</Tags>
                                <Tags>Graph</Tags>
                                <Tags>SQL</Tags>
                                <Tags>Postgre</Tags>
                                <Tags>Connected Component</Tags>
                                <Tags>Firebase</Tags>
                                <Tags>Dijkstra</Tags>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}