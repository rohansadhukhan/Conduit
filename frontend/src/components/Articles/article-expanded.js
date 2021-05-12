import React from "react";
import './article-expanded.css';
import { ReactComponent as Appreciate } from '../../images/clap.svg';
import { ReactComponent as Comment } from '../../images/comments.svg';

export default class ExpandedArticle extends React.Component {

    constructor(props) {
        super(props);
        this.state = null;
    }

    componentDidMount() {

    }

    render() {
        return (
            <>
                <div className='expanded-article-box'>
                    <div className='publish-info'>
                        <p>Published in <strong>ProAndroidDev</strong></p>
                        <p> ·Mar 5</p>
                    </div>
                    <img alt='aritcle' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8borqsjfVye2Rm2dgmXrHHTlxG_1aCgI08Q&usqp=CAU' />
                    <h1><a>Dagger 2 and Jetpack Compose Integration</a></h1>
                    <p className='expanded-article-desc'>Highlighting the advantages of DI is not the purpose of this article, but almost all of the project needs it. In the official documentation, it’s easy to learn how to use Hilt with Jetpack Compose; however, in the real world, most of us have been using Dagger 2 for dependency injections.
                        Let’s start with how Hilt works under the hood with Jetpack Compose navigation. Thereafter, we will focus on the Dagger 2 solution. Before we begin, we must first define navigation.
                        Compose Navigation

                        Let’s define the navigation in Activity.
                        Add string constants for the navigation (i.e., …</p>
                    <div className='more-box'>
                        <div className='user-response'>
                            <Appreciate className='expanded-article-icon' />
                            <p className='expanded-article-icon'>23</p>
                            <Comment className='expanded-article-icon' />
                            <p className='expanded-article-icon'>32</p>
                        </div>
                        <div className='more-options'>
                            {/* <Appreciate className='expanded-article-icon' /> */}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}