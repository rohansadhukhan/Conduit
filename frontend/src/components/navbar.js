import React from 'react'
import { Link } from 'react-router-dom'

export default class Navbar extends React.Component {

    render() {
        return (
            <>
                <nav>
                    <Link  to="/login">Login</Link>
                    <Link  to="/articles">Article</Link>
                </nav>
            </>
        )
    }
}