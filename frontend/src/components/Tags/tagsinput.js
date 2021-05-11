import { Component } from "react";
import Tag from './tags'
import './tagsinput.css';

export default class TagsInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            tags: []
        }

        this.addTag = this.addTag.bind(this);
        this.removeTag = this.removeTag.bind(this);
        this.handleAllTags = this.handleAllTags.bind(this);
    }

    addTag(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            this.setState({
                tags: [...this.state.tags, e.target.value]
            });
            e.target.value = "";
            this.handleAllTags();
        }
    }

    removeTag(index) {
        console.log(`clicked at postion ${index}`);
        this.setState({
            tags: [...this.state.tags.filter(tag => this.state.tags.indexOf(tag) !== index)]
        })
    }

    handleAllTags() {
        this.props.allTags(this.state.tags);
    }

    render() {
        return (
            <div className='tags-box'>
                <ul>
                    {this.state.tags.map((tag, index) => (
                        <li key={index}>
                            <Tag
                                cancelable={true}
                                position={index}
                                remove={this.removeTag}>{tag}</Tag>
                        </li>
                    ))}
                </ul>
                <input
                    type='text'
                    onKeyUp={this.addTag}
                    placeholder='Press enter to add tags'
                />
            </div>
        )
    }
};