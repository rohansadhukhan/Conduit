import React from 'react'
import './navbar.css'
import { Menu } from './menu'

export default class Navbar extends React.Component {
    render() {
        return (
            <>
                <nav className='box'>
                    <div className='container'>
                        <div className='responsive-nav'>
                            <div className='nav-items'>
                                <div className='left'>
                                    <div className='nav-logo-box'>
                                        <a href='/'>
                                            <img src='https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-10.png'
                                                alt='logo'
                                                width='50px' />
                                            <h1 className='pc'>Conduit</h1>
                                        </a>

                                        {/* <div>
                                            <h1>{(this.props.user ? this.props.user.username : 'Conduit')}</h1>
                                        </div> */}

                                    </div>
                                </div>
                                <div className='right'>
                                    <div className='nav-menu-box'>
                                        <div className='menu-items'>
                                            <input
                                                placeholder='Search...'/>
                                        </div>
                                        <div className='menu-items'>Post</div>
                                        <div>
                                            <button className='avatar'>R
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}