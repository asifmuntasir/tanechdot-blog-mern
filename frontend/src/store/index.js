import { createStore, applyMiddleware, combineReducers } from "redux";
import thunkMiddleware from "redux-thunk";
import AuthReducer from "./reducers/AuthReducer";
import {
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage
} from "./reducers/PostReducer";

import {
    updateName
} from "./reducers/ProfileReducer";
import { composeWithDevTools } from 'redux-devtools-extension';
import 'remixicon/fonts/remixicon.css'

const rootReducers = combineReducers({
    // AuthReducer: AuthReducer,
    // key and value same here, So we can write this like as given below
    AuthReducer,
    PostReducer,
    FetchPosts,
    FetchPost,
    UpdatePost,
    UpdateImage,
    updateName
});

const middlewares = [thunkMiddleware];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;


