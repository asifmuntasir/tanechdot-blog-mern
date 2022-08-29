import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { homePosts } from '../../store/asyncMethods/PostMethod';
import Loader from '../Loader';
import moment from 'moment';
import Parser from 'html-react-parser';
import Pagination from '../Pagination';

const Home = () => {

    let { page } = useParams();
    if (page === undefined) {
        page = 1;
    }

    const { loading } = useSelector(state => state.PostReducer);
    const { posts, count, perPage } = useSelector(state => state.FetchPosts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(homePosts(page));
    }, [page]);

    // console.log('Page: ', page);
    // console.log('Posts: ', posts);
    // console.log('Count: ', count);
    // console.log('Perpage: ', perPage);

    return (
        <>
            <Helmet>
                <title>The Anecdote</title>
                <meta
                    name='description'
                    content='MERN Stack Blog'
                />
                <link rel="shortcut icon" href="./home.png" />
            </Helmet>
            <div className="container">
                <div className="row mt-100" style={{ marginBottom: '30px' }}>
                    <div className="col-8 home">
                        {
                            !loading ? posts.length > 0 ? posts.map(
                                post => (
                                    <div className="row post-style" key={post._id}>
                                        <div className="col-8">
                                            <div className="post__card">
                                                <div className="post__card__header">
                                                    <div className="post__card__header__avator">
                                                        {post.userName[0]}
                                                    </div>
                                                    <div className="post__card__header__user">
                                                        <span>{post.userName}</span>
                                                        <span>{moment(post.updatedAt).format("MMM Do YY")}</span>
                                                    </div>
                                                </div>
                                                <div className="post__card__body">
                                                    <h1 className="post__card__body__title">
                                                        <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                                    </h1>
                                                    <div className="post__card__body__details">
                                                        {Parser(post.body.slice(0, 250))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-4">
                                            <div className="post__image">
                                                <img src={`/image/${post.image}`} alt={post.image} />
                                            </div>
                                        </div>
                                    </div>
                                )) : ('No posts') : (<Loader />
                            )}
                    </div>
                </div>
                <div className="row">
                    <div className="col-8">
                        <Pagination
                            path="home"
                            page={page}
                            perPage={perPage}
                            count={count}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;