import jwt_decode from "jwt-decode";
import {
    SET_LOADER,
    CLOSE_LOADER,
    SET_TOKEN,
    REGISTER_ERRORS,
    LOGOUT,
    LOGIN_ERRORS
} from '../types/UserTypes';

const initState = {
    loading: false,
    registerErrors: [],
    loginErrors: [],
    loadingErrors: [],
    token: '',
    user: '',
}

const token = localStorage.getItem('userToken');
// console.log(token);

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    console.log(decodeToken);
    const expiresIn = new Date(decodeToken.exp * 1000);
    if (new Date() > expiresIn) {
        localStorage.removeItem('userToken');
        return null;
    } else {
        return decodeToken;
    }
    // else {
    //     initState.token = token;
    //     const { user } = decodeToken;
    //     console.log(user);
    //     initState.user = user;
    // }
}

if (token) {
    const decoded = verifyToken(token);
    if (decoded) {
        initState.token = token;
        const { user } = decoded;
        initState.user = user;
    }
}

const AuthReducer = (state = initState, action) => {
    if (action.type === SET_LOADER) {
        return { ...state, loading: true };
    } else if (action.type === CLOSE_LOADER) {
        return { ...state, loading: false }
    } else if (action.type === REGISTER_ERRORS) {
        return { ...state, registerErrors: action.payload }
    } else if (action.type === SET_TOKEN) {
        const decoded = verifyToken(action.payload);
        const { user } = decoded;
        return { ...state, token: action.payload, user: user, loginErrors: [], registerErrors: [] }
    } else if (action.type === LOGOUT) {
        return { ...state, token: '', user: '' }
    } else if (action.type === LOGIN_ERRORS) {
        return {
            ...state,
            loginErrors: action.payload
        }
    }
    else {
        return state;
    }
};

export default AuthReducer;