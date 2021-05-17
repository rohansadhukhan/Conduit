import React from 'react'
import './navbar.css'

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpenLogin: false,
            isOpenRegister: false,
        }
        console.log(this.props.mode);
        this.handleModalStatus = this.handleModalStatus.bind(this);
        // this.handleClicks = this.handleClicks.bind(this);
    }

    handleKeyClick(position) {
        if (position === 3) {
            this.setState({
                isOpenLogin: true,
                isOpenRegister: false
            })
        } else if (position === 4) {
            this.setState({
                isOpenLogin: false,
                isOpenRegister: true
            })
        }
    }

    handleModalStatus(status) {
        if (status === true) {
            this.setState({
                isOpenLogin: false,
                isOpenRegister: false
            })
        }
    }

    // handleClicks(value) {
    //     if (va === true) {
    //         this.setState({
    //             isOpenLogin: false,
    //             isOpenRegister: false
    //         })
    //     }
    // }

    render() {
        return (
            <>
                <nav className={(this.props.user ? 'row' : 'row bg')}>
                    <div className='responsive-nav'>
                        <div className='nav-items'>
                            <div className='left'>
                                <div className='nav-logo-box'>
                                    <a href='/'>
                                        <img src='https://www.freeiconspng.com/thumbs/blogger-logo-icon-png/blogger-logo-icon-png-10.png'
                                            alt='logo'
                                            width='40px' />
                                        <h1 className='pc'>Conduit</h1>
                                    </a>

                                    {/* <div>
                                            <h1>{(this.props.user ? this.props.user.username : 'Conduit')}</h1>
                                        </div> */}

                                </div>
                            </div>
                            <div className='right'>
                                {this.props.user ?
                                    (
                                        <div className='nav-menu-box'>
                                            <div className='menu-items'>
                                                <input
                                                    placeholder='Search...' />
                                            </div>
                                            <div className='menu-items'
                                                onClick={(() => {
                                                    this.props.handleClicks(1);
                                                })}>Post</div>
                                            <div>
                                                <button className='avatar'
                                                    onClick={this.handleModalStatus}>{this.props.user.username}
                                                </button>
                                            </div>
                                        </div>

                                    ) : (
                                        <div className='nav-menu-box'>
                                            <span><a href='/post'>Write</a></span>
                                            <span onClick={() => {
                                                this.props.handleModals(1)
                                            }}> Sign In </span>
                                            <button onClick={() => {
                                                this.props.handleModals(2)
                                            }}> Get Started </button>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                </nav>
            </>
        )
    }
}