import React from 'react';
import { useState } from 'react';
import { Helmet } from 'react-helmet';
import BgImage from '../BgImage';
import '../../../store/asyncMethods/AuthMethods';
import { useDispatch, useSelector } from 'react-redux';
import { postLogin } from '../../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';


const Login = () => {

    const dispatch = useDispatch();
    const { loginErrors, loading } = useSelector((state) => state.AuthReducer);

    const [state, setState] = useState({
        email: '',
        password: ''
    })

    const handleLoginInput = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const userLogin = (e) => {
        e.preventDefault();
        // console.log(state);
        dispatch(postLogin(state));
    }
    useEffect(() => {
        console.log('login', loginErrors);
        if (loginErrors.length > 0) {
            loginErrors.map((error) => {
                return toast.error(error.msg)
            });
        }
        // if (user) {
        //     props.history.push('/userDashboard')
        // }
    }, [loginErrors])

    return (
        <>
            <Helmet>
                <title>Login</title>
                <meta
                    name='description'
                    content='User Login Form'
                />
                <link rel="shortcut icon" href="./icons8-blog-48.png" />
            </Helmet>
            <div className="row mt-80">
                <div className="col-8">
                    <BgImage />
                    <Toaster
                        toastOptions={{
                            style: {
                                fontSize: '15px'
                            },
                        }}
                    />
                </div>
                <div className="col-4">
                    <div className="account">
                        <div className="account_-section">
                            <form onSubmit={userLogin}>
                                <div className="group">
                                    <h2 className="form-heading">Login</h2>
                                </div>
                                <div className="group">
                                    <input
                                        type='email'
                                        name='email'
                                        value={state.email}
                                        className="group__control"
                                        placeholder="Enter Email"
                                        onChange={handleLoginInput} />
                                </div>
                                <div className="group">
                                    <input
                                        type='password'
                                        name='password'
                                        value={state.password}
                                        className="group__control"
                                        placeholder="Enter Password"
                                        onChange={handleLoginInput} />
                                </div>
                                <div className="group">
                                    <input
                                        type="submit"
                                        className="btn btn-default btn-block"
                                        value={loading ? '...' : 'Login'}
                                    />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;