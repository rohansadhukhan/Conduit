import React from "react";
import './tags.css';

export default class Tags extends React.Component {

    constructor(props) {
        super(props);
        this.state = null;
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className='tag-box'>
                <p>{this.props.name}</p>
            </div>
        )
    }
}