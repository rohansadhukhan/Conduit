import axios from "axios";
import React from "react";


export default class CreateNewArticle extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            title: '',
            description: '',
            body: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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

        axios.post('articles',  {
            article : {
                title: this.state.title,
                description: this.state.description,
                body: this.state.body
            }            
        }, config).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    render() {
        return (
            <>
                <form onSubmit={this.handleSubmit}>
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
                    <input
                        type='text'
                        name='body'
                        onChange={this.handleInputChange}
                        placeholder='Body'
                        required />
                    <button type='submit'> Post Article</button>
                </form>
            </>
        )
    }
}