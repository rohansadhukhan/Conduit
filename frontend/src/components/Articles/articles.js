import React from "react";
import './article.css';
// import { ReactComponent as FavouriteImg } from '../../images/favourite.svg';
// import { ReactComponent as LikeImg } from '../../images/like.svg';
// import { ReactComponent as DisLikeImg } from '../../images/dislike.svg';
// import { ReactComponent as MoreOptionImg } from '../../images/more-options.svg';
import UserHeader from '../UserHeader/UserHeader'

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
                <div className='article-content-box'>
                    <div className='article-user-info'>
                        <UserHeader username={this.props.username} />
                    </div>
                    <div className='article-info'>
                        <div className='article-info-title'>
                            <p>The width property is used to fill a div remaining horizontal space u sing CSS. By setting the width to 100%sing CSS. By setting</p>
                        </div>
                        <div className='article-info-desc'>
                            <p>The width property is used to fill a div remaining horizontal space u sing CSS. By setting the width to 100%sing CSS. By setting the width to 100%sing CSS. By setting the width to 100%sing CSS. By setting the width to 100%</p>
                        </div>
                    </div>
                    <div className='article-response-info'>
                        <div className=''>
                            <p>Jan 13
                                ·
                                4 min read
                                ·
                                Based on your reading history</p>
                        </div>
                        {/* <div className=''>
                        </div> */}
                    </div>
                </div>
                <div className='article-image-box'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzbeFs8SHoF2haqCjFE8336Oec5W6DUceReg&usqp=CAU' alt='article-img' />
                </div>
            </div>
        )
    }
}