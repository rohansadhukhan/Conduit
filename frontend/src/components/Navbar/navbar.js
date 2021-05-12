import React from 'react'
import './navbar.css'
import { Menu } from './menu'

export default class Navbar extends React.Component {
    render() {
        return (
            <>
                <nav className='nav-box'>
                    <div className='left'>
                        <div className='nav-logo-box'>
                            <a href='/'>
                                <img src='https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-10.png'
                                alt='logo'
                                width='50px' />
                            </a>
                            {/* <h1>Conduit</h1> */}
                            <h1>{(this.props.user ? this.props.user.username: 'Conduit')}</h1>
                        </div>
                    </div>
                    <div className='right'>
                        <ul className='nav-menu'>
                            {Menu.map((item, index) => {
                                return (
                                    <li 
                                        key={index}
                                        onClick={() => this.props.handleKeyClick(index)}>
                                        {
                                            (item.uri !== null ?
                                                <a href={item.uri}>
                                                    {item.title}
                                                </a> :
                                                item.title
                                            )
                                        }
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </nav>
            </>
        )
    }
}