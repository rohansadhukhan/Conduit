import { Component } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

export default class Modal extends Component {
    render() {
        if (!this.props.open) return null
        return (
            ReactDOM.createPortal(
                <>
                    <div className='modal-background'></div>
                    <div className='modal-box'>
                        <button className='modal-close' onClick={this.props.onClose}>x</button>
                        {this.props.children}
                    </div>
                </>,
                document.getElementById('portal')
            )
        )
    }
}