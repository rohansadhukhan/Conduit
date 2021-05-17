import axios from 'axios';
import React from 'react';
import Tags from '../../components/Tags/tags';
import Navbar from '../../components/Navbar/navbar';
import Article from '../../components/Articles/articles';
import Pagination from '../../components/Pagination/pagination';
import Modal from '../../components/Modals/modal';
import Login from '../../components/Login/login';
import Register from '../../components/Register/register';
import { withRouter } from "react-router-dom";
import './home.css';
class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handlePaginate = this.handlePaginate.bind(this);
        this.handleModals = this.handleModals.bind(this);
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.handleClicks = this.handleClicks.bind(this);
    }

    state = {
        user: null,
        articles: [],
        totalArticles: 0,
        currentPage: 1,
        defaultPageSize: 4,
        isModalOpen: false,
        isOpenLogin: false,
        isOpenRegister: false
    }

    componentDidMount() {
        axios.get('user', {
            withCredentials: true
        }).then(res => {
            console.log(res);
            this.setState({
                user: res.data.user
            })
        }).catch(err => {
            console.log(err)
        });

        axios.get('articles', {
            params: {
                page: this.state.currentPage,
                size: this.state.defaultPageSize
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

    componentDidUpdate(pprops, pstate) {
        console.log(`Component did update`);
        if (pstate.currentPage !== this.state.currentPage) {
            console.log(this.state.currentPage);
            axios.get('articles', {
                params: {
                    page: this.state.currentPage,
                    size: this.state.defaultPageSize
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

    openModal(value) {
        if (value === 1) {
            this.setState({
                isModalOpen: true,
                isOpenLogin: true
            })
        } else if (value === 2) {
            this.setState({
                isModalOpen: true,
                isOpenRegister: true
            })
        } else {
            window.location.reload();
        }
    }

    closeModal() {
        this.setState({
            isModalOpen: false,
            isOpenLogin: false,
            isOpenRegister: false
        })
    }

    handlePaginate(target) {
        this.setState({
            currentPage: target
        });
    }

    handleModals(value) {
        this.closeModal();
        this.openModal(value);
    }

    handleClicks(value) {
        if(value === 1) {
            this.props.history.push('/post');
        }
    }

    render() {
        return (
            <>
                <Modal
                    open={this.state.isOpenLogin}
                    onClose={this.closeModal}>
                    <Login handleModals={this.handleModals} />
                </Modal>
                <Modal
                    open={this.state.isOpenRegister}
                    onClose={this.closeModal}>
                    <Register handleModals={this.handleModals} />
                </Modal>
                <div className={(this.state.isModalOpen ? 'row blur' : 'row')}>
                    <div className='row'>
                        <Navbar
                            user={this.state.user}
                            handleModals={this.handleModals}
                            handleClicks={this.handleClicks} />
                    </div>
                    <div className='row'>
                        <div className='home-box'>
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
                        <div className='home-pagination col-6'>
                            <Pagination
                                total={this.state.totalArticles}
                                page={this.state.currentPage}
                                size={this.state.defaultPageSize}
                                paginate={this.handlePaginate} />
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default withRouter(Home);