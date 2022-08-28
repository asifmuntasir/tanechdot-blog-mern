import React from 'react';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import { CLOSE_LOADER, REDIRECT_FALSE, REMOVE_MESSAGE, SET_LOADER, SET_MESSAGE } from '../../store/types/PostTypes';
import toast, { Toaster } from 'react-hot-toast';
import { fetchPosts } from '../../store/asyncMethods/PostMethod';
import { Link, useParams } from 'react-router-dom';
import Loader from '../Loader';
import SideBar from '../SideBar/SideBar';
import Pagination from '../Pagination';
import axios from 'axios';
import moment from 'moment';

const UserDashboard = () => {

    const { redirect, message, loading } = useSelector((state) => state.PostReducer);
    const { user: { _id }, token } = useSelector(state => state.AuthReducer);
    const { posts, count, perPage } = useSelector(state => state.FetchPosts)
    let { page } = useParams();

    // console.log('My Posts: ', posts);

    if (page === undefined) {
        page = 1;
    }

    const dispatch = useDispatch();

    const deletePost = async (id) => {
        const confirm = window.confirm('Are you want to delete this post?');
        if (confirm) {
            dispatch({
                type: SET_LOADER
            });
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            try {
                const { data: { msg } } = await axios.get(`http://localhost:4000/delete_post/${id}`, config);
                dispatch(fetchPosts(_id, page));
                dispatch({
                    type: SET_MESSAGE,
                    payload: msg
                });
            } catch (error) {
                dispatch({
                    type: CLOSE_LOADER
                });
                console.log(error);
            }
        }
    }


    useEffect(() => {
        if (redirect) {
            dispatch({
                type: REDIRECT_FALSE
            })
        }
        if (message) {
            toast.success(message);
            dispatch({
                type: REMOVE_MESSAGE
            })
        }

    }, [message]);

    useEffect(() => {
        dispatch(fetchPosts(_id, page));
    }, [page])

    return (
        <>
            <Helmet>
                <title>User Dashboard</title>
                <meta
                    name='description'
                    content='User Dashboard'
                />
                <link rel="shortcut icon" href="./user_dashboard.png" />
            </Helmet>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '15px'
                    },
                }}
            />
            <div>
                <div className="container mt-100">
                    <div className="row ml-minus-15 mr-minus-15">
                        <div className="col-3 p-15">
                            <SideBar />
                        </div>
                        <div className="col-9 p-15">
                            {!loading ? posts.length > 0 ? posts.map((post) => (
                                <div className="dashboard__post" key={post._id}>
                                    <div className="dashboard__post__title">
                                        <Link to={`/details/${post.slug}`}>{post.title}</Link>
                                        <span>Published {moment(post.updatedAt).fromNow()}</span>
                                    </div>
                                    <div className="dashboard__post__links">
                                        <Link to={`/updateImage/${post._id}`}><i class="ri-image-edit-line icon"></i></Link>
                                        <Link to={`/editPost/${post._id}`}><i class="ri-file-edit-line icon"></i></Link>
                                        <i onClick={() => deletePost(post._id)} class="ri-delete-bin-5-line icon"></i>
                                    </div>
                                </div>
                            )) : 'You dont have any post' : <Loader />}
                            <Pagination
                                path="userDashboard"
                                page={page}
                                perPage={perPage}
                                count={count}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserDashboard;