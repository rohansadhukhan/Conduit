import axios from "axios";
import React from "react";
import Navbar from '../../components/Navbar/navbar';
import TagsInput from "../../components/Tags/tagsinput";
import './post.css'

export default class Post extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTags = this.handleTags.bind(this);
    }

    state = {
        user: '',
        title: '',
        description: '',
        tags: []
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
    }

    handleInputChange(e) {
        const target = e.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const config = {
            headers: {
                Authorization: "Token " + localStorage.getItem('token')
            }
        };
        axios.post('articles', {
            article: {
                title: this.state.title,
                description: this.state.description,
                tags: this.state.tags
            }
        }, config).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    handleTags(tgs) {
        // console.log(tgs);
        this.setState({
            tags: tgs
        })
    }


    render() {
        return (
            <>
                <Navbar
                    user={this.state.user}
                    handleModals={this.handleModals}
                    handleClicks={this.handleClicks} />
                <div className='post-box'>
                    <div className='col-8'>
                        <div className='post-info'>
                            <input
                                type='text'
                                name='title'
                                placeholder='Title...'
                                autoComplete='off'
                                onChange={this.handleInputChange}
                                required />
                            <textarea
                                type='text'
                                name='description'
                                placeholder='Start writting...'
                                onChange={this.handleInputChange}
                                required />
                        </div>
                    </div>
                    <div className='col-1'>

                    </div>
                    <div className='col-3'>
                        <h2>Add Tags</h2>
                        <div className='post-tags'>
                            <TagsInput
                                allTags={this.handleTags} />
                        </div>

                        <button
                            className='post-button'
                            onClick={this.handleSubmit}>
                            Post
                        </button>
                    </div>

                </div>
            </>
        )
    }
}

{/* <form onSubmit={this.handleSubmit}>
                    <input
                        type='text'
                        name='title'
                        onChange={this.handleInputChange}
                        placeholder='Title'
                        required />
                    <input
                        type='text'
                        name='description'
                        onChange={this.handleInputChange}
                        placeholder='Description'
                        required />
                    <button type='submit'> Post Article</button>
                </form> */}