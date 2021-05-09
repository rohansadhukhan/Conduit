import { Component } from 'react';
import ReactDOM from 'react-dom';
import './modal.css'

export default class Modal extends Component {
    render() {
        const test = {
            width: 'fit-content'
        }
        if (!this.props.open) return null
        return (
            ReactDOM.createPortal(
            <>
                <div className='modal-background'></div>
                <div className='modal-box'>
                    {this.props.children}
                    <button style={test} onClick={this.props.onClose}>Close</button>
                </div>
            </>,
            document.getElementById('portal')
            )
        )
    }
}