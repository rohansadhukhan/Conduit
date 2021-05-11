import React from "react";
import './UserHeader.css';

export default class UserHeader extends React.Component {
    render() {
        return (
            <div className='user-header-box'>

                <img 
                    src='https://picsum.photos/id/237/200/300'
                    alt='user'
                    className='user-avatar' />

                <p className='user-name'>{this.props.username}</p>
                
            </div>
        )
    }
}