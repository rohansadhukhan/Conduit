import React from "react";
import './article.css';
import { ReactComponent as FavouriteImg } from '../../images/favourite.svg';
import { ReactComponent as LikeImg } from '../../images/like.svg';
import { ReactComponent as DisLikeImg } from '../../images/dislike.svg';
import { ReactComponent as MoreOptionImg } from '../../images/more-options.svg';

export default class Article extends React.Component {

    constructor(props) {
        super(props);
        this.state = null;
    }

    componentDidMount() {
        
    }

    render() {
        return (
            <div className='article-box'>
                <div className='col-65'>
                    <h2>{this.props.title}</h2>
                    <p>{this.props.description}</p>
                    <div className='article-info-box'>
                        <div className=''>
                            <span>2 Mar - </span>
                            <span>9 min ago - </span>
                        </div>
                        <div className='article-status'>
                            <LikeImg width='20px' />
                            <DisLikeImg width='20px' />
                            <FavouriteImg width='20px' />
                            <MoreOptionImg width='20px' />
                        </div>
                    </div>
                </div>
                <div className='col-35 image-box'>
                    <img src='https://picsum.photos/id/237/200/300' alt='article-img' />
                </div>
            </div>
        )
    }
}