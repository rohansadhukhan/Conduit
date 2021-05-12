import { Component } from 'react'
import axios from 'axios';
import Navbar from '../../components/Navbar/navbar'
import ExpandedArticle from '../../components/Articles/article-expanded'
import Pagination from '../../components/Pagination/pagination'
import './profile.css'

export default class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            articles: [],
            totalArticles: 0,
            currentPage: 1,
            defaultPageSize: 4
        }

        this.handlePaginate = this.handlePaginate.bind(this);
    }

    componentDidMount() {
        const config = {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        };
        axios.get('user', config).then(res => {
            // console.log(res.data.user.username);
            this.setState({
                user: res.data.user
            })
        }).catch(err => {
            console.log(err)
        });
        axios.get('articles', {
            params: {
                page: this.state.currentPage,
                size: this.state.defaultPageSize,
                author: this.state.user.email
            }
        }).then(res => {
            console.log(res);
            console.log(this.state.currentPage);
            console.log(this.state.totalArticles);
            this.setState({
                articles: res.data.articles,
                totalArticles: res.data.total
            })
        }).catch(err => {
            console.log(err)
        });
    }

    componentDidUpdate(pprops, pstate) {
        console.log(`Component did update`);
        if (pstate.currentPage != this.state.currentPage) {
            console.log(this.state.currentPage);
            axios.get('articles', {
                params: {
                    page: this.state.currentPage,
                    size: this.state.defaultPageSize,
                    author: this.state.user.email
                }
            }).then(res => {
                console.log(res);
                this.setState({
                    articles: res.data.articles,
                    totalArticles: res.data.total
                })
                console.log(this.state.totalArticles);
            }).catch(err => {
                console.log(err)
            });
        }
    }

    handlePaginate(target) {
        this.setState({
            currentPage: target
        });
    }

    render() {
        return (
            <>
                <Navbar
                    user={this.state.user} />
                <div className='profile-box'>
                    <div className='col-2 profile-info'>
                        <img
                            src='https://picsum.photos/150' />
                        <h2>{this.state.user.username}</h2>
                        <p>{this.state.user.email}</p>
                    </div>
                    <div className='col-8 profile-article-info'>
                        {
                            this.state.articles && this.state.articles.map((article, index) => {
                                return (
                                    <div key={index}>
                                        <ExpandedArticle
                                            username={article.author.username}
                                            title={article.title}
                                            description={article.description} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className='col-2'>
                    </div>
                </div>
                <div>
                    <Pagination
                        total={this.state.totalArticles}
                        page={this.state.currentPage}
                        size={this.state.defaultPageSize}
                        paginate={this.handlePaginate} />
                </div>
            </>
        )
    }
}