import axios from 'axios';
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGIN_ERRORS
} from '../types/UserTypes';

// User Register Method
export const postRegister = (state) => {
    return async (dispatch) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
                'trustProtoHeader': true
            }
        }
        dispatch({ type: SET_LOADER });
        try {
            const { data } = await axios.post(`/register`, state, config);
            dispatch({
                type: CLOSE_LOADER
            });
            // console.log(data);
            localStorage.setItem('userToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
        } catch (error) {
            dispatch({
                type: 'CLOSE_LOADER'
            });
            dispatch({
                type: REGISTER_ERRORS,
                payload: error.response.data.errors,
            })
            console.log(error.response)
        }
    }
}



// User Login Method
export const postLogin = (state) => {
    return async (dispatch) => {
        const config = {
            Headers: {
                'Content-Type': 'application/json',
                'trustProtoHeader': true
            }
        }
        try {
            dispatch({ type: SET_LOADER });
            const { data } = await axios.post(`/login`, state, config);
            dispatch({ type: CLOSE_LOADER });
            localStorage.setItem('userToken', data.token);
            dispatch({ type: SET_TOKEN, payload: data.token });
        } catch (error) {
            dispatch({ type: CLOSE_LOADER });
            dispatch({
                type: LOGIN_ERRORS,
                payload: error.response.data.errors,
            });
            console.log(error.response);
        }
    }
}