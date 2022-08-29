import React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { postComment, postDetails } from '../../store/asyncMethods/PostMethod';
import Loader from '../Loader';
import moment from 'moment';
import Comment from '../Comment/Comment';
const { htmlToText } = require('html-to-text');


const Details = () => {

    const { id } = useParams();
    const { user } = useSelector(state => state.AuthReducer);
    const { loading, details, comments } = useSelector(state => state.PostReducer);
    const dispatch = useDispatch();

    const [comment, setComment] = useState('');

    const addComment = (e) => {
        e.preventDefault();
        // console.log(comment);
        dispatch(postComment({
            id: details._id,
            comment,
            userName: user.name
        }));
        setComment('');
        dispatch(postDetails(id));
    }

    useEffect(() => {
        dispatch(postDetails(id));
    }, [id])

    return (
        <>
            <Helmet>
                <title>{details.title}</title>
                <meta
                    name='description'
                    content='Post Details'
                />
                <link rel="shortcut icon" href="./home.png" />
            </Helmet>
            <div className="container">
                <div className="row mt-100">
                    <div className="col-8">
                        {
                            !loading ? <div className="post__details">
                                <div className="post__card__header">
                                    <div className="post__card__header__avator">
                                        {details.userName ? details.userName[0] : ''}
                                    </div>
                                    <div className="post__card__header__user">
                                        <span>{details.userName}</span>
                                        <span>{moment(details.updatedAt).format("MMM Do YY")}</span>
                                    </div>
                                </div>
                                <div className="post__card__body">
                                    <h1 className="post__card__body__title">
                                        {details.title}
                                    </h1>
                                    <div className="post__card__body__details">
                                        {htmlToText(details.body)}
                                    </div>
                                    <div className="post__card__body__image">
                                        <img src={`/image/${details.image}`} alt={details.image} />
                                    </div>
                                </div>
                                {
                                    user ? <>
                                        <div className="post__comment">
                                            <form onSubmit={addComment}>
                                                <div className="group">
                                                    <input
                                                        type="text"
                                                        className='group__control'
                                                        placeholder='Write a comment...'
                                                        onChange={(e) => setComment(e.target.value)}
                                                        value={comment}
                                                    />
                                                </div>
                                                <div className="group">
                                                    <input
                                                        type="submit"
                                                        value="Done"
                                                        className='btn btn-default btn-block'
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                        <Comment comments={comments} />
                                    </> : ''
                                }
                            </div>
                                : <Loader />
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;