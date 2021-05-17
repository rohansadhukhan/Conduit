import axios from "axios";
import React, { useRef, createRef } from "react";
import Navbar from '../../components/Navbar/navbar';
import './post.css'

export default class Post extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: '',
            title: '',
            description: [{
                id: 0,
                body: ''
            }],
            tags: [],
            count: 10,
            id: 1,
            prevFocus: 0,
            nextFocus: 2,
        }
        this.MODE_PUBLISH_ARTICLE = 2;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTags = this.handleTags.bind(this);
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

    componentDidUpdate(pprops, pstate) {
        if (pstate.id != this.state.id) {
            console.log(this.state.description);
            this.state.description[this.state.id - 1].ref.focus();
        }
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

        axios.post('articles', {
            article: {
                title: this.state.title,
                description: this.state.description,
                tags: this.state.tags
            }
        }, {
            withCredentials: true
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    handleTags(tgs) {
        this.setState({
            tags: tgs
        })
    }

    render() {
        return (
            <>
                <Navbar
                    user={this.state.user}
                    mode={this.MODE_PUBLISH_ARTICLE}
                    handleModals={this.handleModals}
                    handleClicks={this.handleClicks} />

                <div class="row">
                    <div className='post-box'>
                        <div className='row'>
                        </div>
                        <div className='row'>
                            {
                                this.state.description.map((item) => (
                                    <div className='row bg'>
                                        <textarea
                                            key={item.id}
                                            ref={(ref) => {
                                                item.ref = ref
                                            }}
                                            onChange={(e) => {
                                                const temp = [...this.state.description];
                                                temp[item.id] = {
                                                    id: item.id,
                                                    body: e.target.value,
                                                    ref: item.ref
                                                }
                                                this.setState({
                                                    description: temp
                                                })
                                            }}
                                            onFocus={() => {
                                                this.setState({
                                                    prevFocus: this.state.id - 1,
                                                    nextFocus: this.state.id + 1
                                                })
                                            }}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    console.log(e.key);
                                                    if (this.state.description[this.state.prevFocus].body != '') {
                                                        this.setState({
                                                            id: this.state.id + 1,
                                                            description: [...this.state.description, {
                                                                id: this.state.id,
                                                                body: '',
                                                            }]
                                                        });
                                                    }
                                                } else if (e.key === '8') {
                                                    e.preventDefault();
                                                    if (this.state.prevFocus != 0) {
                                                        this.setState({
                                                            id: this.state.prevFocus
                                                        });
                                                    }
                                                } else if (e.key === '2') {
                                                    e.preventDefault();
                                                    if (this.state.id < this.state.description.length) {
                                                        this.setState({
                                                            id: this.state.nextFocus
                                                        });
                                                    }
                                                } else if (e.key == '4') {
                                                    e.preventDefault();
                                                    if (this.state.description[this.state.prevFocus].body === ''
                                                        && this.state.id > 1) {
                                                        var array = [...this.state.description];
                                                        var index = array.indexOf(e.target.value)
                                                        if (index !== -1) {
                                                            array.splice(index, 1);
                                                            this.setState({ description: array });
                                                        }
                                                        this.setState({
                                                            id: this.state.prevFocus
                                                        });

                                                    }
                                                }
                                            }}
                                            placeholder='Tell your story' />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

{/* <div className='post-box'>
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

</div> */}

