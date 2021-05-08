import { Component } from "react";
import './search.css'

export default class SearchBox extends Component {
    render() {
        return(
            <div className='search-box'>
                <input type='text' placeholder='Search...' />
                <button>Search</button>
            </div>
        )
    }
}