import axios from "axios";
import {
    CREATE_ERRORS,
    REMOVE_ERRORS,
    SET_LOADER,
    CLOSE_LOADER,
    REDIRECT_TRUE,
    REDIRECT_FALSE,
    SET_MESSAGE,
    REMOVE_MESSAGE,
    SET_POSTS,
    SET_POST,
    POST_REQUEST,
    POST_RESET,
    SET_UPDATE_ERRORS,
    RESET_UPDATE_ERRORS,
    UPDATE_IMAGE_ERRORS,
    SET_DETAILS,
    COMMENTS
} from '../types/PostTypes';

// const token = localStorage.getItem('userToken');

export const createAction = (postData) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();
        // console.log('Your State: ', token);

        dispatch({
            type: SET_LOADER
        });
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const { data: { msg } } = await axios.post(`/create_post`, postData, config);
            dispatch({
                type: CLOSE_LOADER
            });
            // console.log(data);
            dispatch({
                type: REMOVE_ERRORS
            })
            dispatch({
                type: REDIRECT_TRUE
            });
            dispatch({
                type: SET_MESSAGE,
                payload: msg
            })
        } catch (error) {
            console.log(error.response);
            const { errors } = error.response.data;
            dispatch({
                type: CLOSE_LOADER
            });
            // console.log(error.message);
            dispatch({
                type: CREATE_ERRORS,
                payload: errors
            });
        }
    }
}

export const fetchPosts = (id, page) => {
    return async (dispatch, getState) => {
        const { AuthReducer: { token } } = getState();

        dispatch({
            type: SET_LOADER
        });

        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            }
            const {
                data: { response, count, perPage }
            } = await axios.get(`/posts/${id}/${page}`, config);

            dispatch({
                type: CLOSE_LOADER
            });
            // console.log(response);
            dispatch({
                type: SET_POSTS,
                payload: { response, count, perPage }
            });
        } catch (error) {
            dispatch({
                type: CLOSE_LOADER
            })
        }
    }
}

export const fetchPost = (id) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }
        dispatch({
            type: SET_LOADER
        });

        try {
            const { data: { post } } = await axios.get(`/post/${id}`, config);
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: SET_POST,
                payload: post
            });
            dispatch({
                type: POST_REQUEST
            });
        } catch (error) {
            dispatch({
                type: CLOSE_LOADER
            });
            console.log(error.message)
        }
    }
}


export const updateAction = (editData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        dispatch({
            type: SET_LOADER
        });

        try {
            const { data } = await axios.post(`/update_post`, editData, config);
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: REDIRECT_TRUE
            });
            dispatch({
                type: SET_MESSAGE,
                payload: data.msg
            })
            console.log(data);
        } catch (error) {
            const {
                response: {
                    data: { errors },
                }
            } = error;
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: SET_UPDATE_ERRORS,
                payload: errors
            })
            console.log(error.response)
        }
    }
}

export const updateImageAction = (updateData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        dispatch({
            type: SET_LOADER
        });

        try {
            const { data } = await axios.post(`/update_image`, updateData, config);
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: REDIRECT_TRUE
            })
            dispatch({
                type: SET_MESSAGE,
                payload: data.msg
            })
            // console.log(data);
        } catch (error) {
            const {
                response: {
                    data: { errors },
                }
            } = error;
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: UPDATE_IMAGE_ERRORS,
                payload: errors
            });
            // console.log(error.message);
        }
    }
}


// Display all posts

export const homePosts = (page) => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOADER
        });
        try {
            const { data: { response, count, perPage } } = await axios.get(`/home/${page}`);
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: SET_POSTS,
                payload: { response, count, perPage }
            });
        } catch (error) {
            dispatch({
                type: CLOSE_LOADER
            });
            console.log(error);
        }
    }
}

export const postDetails = (id) => {
    return async (dispatch) => {
        dispatch({
            type: SET_LOADER
        });
        try {
            const { data: { post_details, comments } } = await axios.get(`/explore/${id}`);
            dispatch({
                type: CLOSE_LOADER
            });
            dispatch({
                type: SET_DETAILS,
                payload: post_details
            });
            dispatch({
                type: COMMENTS,
                payload: comments
            });
            // console.log(post_details);
            // console.log(comments);
        } catch (error) {
            dispatch({
                type: CLOSE_LOADER
            });
            console.log(error);
        }
    }
}


export const postComment = (commentData) => {
    return async (dispatch, getState) => {
        const {
            AuthReducer: { token },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        }

        dispatch({
            type: SET_LOADER
        });

        try {
            const { data } = await axios.post(`/comment`, commentData, config);
            dispatch({
                type: CLOSE_LOADER
            });
            console.log(data);
        } catch (error) {
            dispatch({
                type: CLOSE_LOADER
            });
            console.log(error);
        }
    }
}