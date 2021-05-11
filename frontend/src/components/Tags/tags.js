import React from "react";
import './tags.css';

export default class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemove = this.handleRemove.bind(this);
    }

    handleRemove() {
        this.props.remove(this.props.position)
    }

    render() {
        if (this.props.cancelable) {
            return (
                <div className='tag-box'>
                    {this.props.children}
                    <span 
                        className='tag-cancel'
                        onClick={this.handleRemove}>&times;</span>
                </div>
            )
        }
        return (
            <div className='tag-box'>
                {this.props.children}
            </div>
        )
    }
}