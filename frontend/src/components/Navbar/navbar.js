import React from 'react'
import { Link } from 'react-router-dom'
import './navbar.css'
import { Menu } from './menu'

export default class Navbar extends React.Component {

    state = {
        clicked: false
    }

    handleClick = () => {
        this.setState({ clicked: !this.state.clicked });
    }

    render() {
        return (
            <>
                <nav className='nav-box'>
                    <div className='left'>
                        <div className='nav-logo-box'>
                            <img src='https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-10.png'
                                alt='logo'
                                width='50px' />
                            <h1>Conduit</h1>
                        </div>
                    </div>
                    <div className='right'>
                        <ul className='nav-menu'>
                            {Menu.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <a href={item.uri}>
                                            {item.title}
                                        </a>
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

{/* <nav className='nav-box'>
                    <Link to='/'>
                        <img
                            src='https://miro.medium.com/max/3582/0*Sc1VKetYxe7iWnjW.png'
                            alt='app-logo'
                            className='app-logo' />
                    </Link>
                    <div className='nav-links'>
                        <ul>
                            <li><Link to="/articles">Article</Link></li>
                            <li><Link to="/login">Login</Link></li>
                        </ul>
                    </div>
                </nav> */}