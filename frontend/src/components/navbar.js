import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {

    render() {
        return (
            <>
                <nav>
                    <Link className="login" to="/login">Login</Link>
                </nav>
            </>
        )
    }
}