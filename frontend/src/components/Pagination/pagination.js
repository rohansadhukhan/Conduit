import { Component } from 'react';
import './pagination.css'

export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.handlePageClick = this.handlePageClick.bind(this);
        // this.handlePrevPage = this.handlePrevPage.bind(this);
        // this.handleNextPage = this.handleNextPage.bind(this);
    }
    handlePageClick(e) {
        console.log(`in pagination ${e.target.value}`)
        if (e.target.value == 501) {
            this.props.paginate(this.props.page - 1);
        } else if (e.target.value == 502) {
            this.props.paginate(this.props.page + 1);
        } else {
            this.props.paginate(e.target.value);
        }
    }
    render() {
        const pageNumber = [];
        const total = Math.ceil(this.props.total / this.props.size);
        for (let i = 1; i <= total; i++) pageNumber.push(i);

        return (
            <div className='pagination-box'>
                <ul>
                    <li
                        value='501'
                        className={(this.props.page != 1 ? 'setItem' : 'removeItem')}
                        onClick={this.handlePageClick}>
                        &laquo; prev
                    </li>
                    {pageNumber.map(number => {
                        return (
                            <li
                                key={number}
                                value={number}
                                className={this.props.page == number ? 'current-page' : ''}
                                onClick={this.handlePageClick}>{number}
                            </li>
                        )
                    })}
                    <li
                        value='502'
                        className={(this.props.page != total ? 'setItem' : 'removeItem')}
                        onClick={this.handlePageClick}>
                        next &raquo;
                    </li>
                </ul>
            </div>
        )
    }
}