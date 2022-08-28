import { React, useState } from 'react';
import { Helmet } from 'react-helmet';
import BgImage from '../BgImage';
import { useDispatch, useSelector } from 'react-redux';
import { postRegister } from '../../../store/asyncMethods/AuthMethods';
import toast, { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';

const Register = (props) => {

    const [state, setState] = useState({
        name: '',
        email: '',
        password: '',
    });

    const { loading, registerErrors, user } = useSelector((state) => state.AuthReducer);


    const dispatch = useDispatch();

    const handleInputs = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const userRegister = async (e) => {
        e.preventDefault();
        console.log(state);
        dispatch(postRegister(state));
    }

    useEffect(() => {
        console.log('register', registerErrors);
        if (registerErrors.length > 0) {
            registerErrors.map((error) => {
                return toast.error(error.msg)
            });
        }
        // if (user) {
        //     props.history.push('/userDashboard')
        // }
    }, [registerErrors, user])


    return (
        <>
            <Helmet>
                <title>Register</title>
                <meta
                    name='description'
                    content='User Register Form'
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
                            <form onSubmit={userRegister}>
                                <div className="group">
                                    <h2 className="form-heading">Register</h2>
                                </div>
                                <div className="group">
                                    <input
                                        type="text"
                                        name="name"
                                        className="group__control"
                                        placeholder="Enter Name"
                                        value={state.name}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="email"
                                        name="email"
                                        className="group__control"
                                        placeholder="Enter Email"
                                        value={state.email}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="password"
                                        name="password"
                                        className="group__control"
                                        placeholder="Create Password"
                                        value={state.password}
                                        onChange={handleInputs}
                                    />
                                </div>
                                <div className="group">
                                    <input
                                        type="submit"
                                        className="btn btn-default btn-block"
                                        value={loading ? '...' : 'Register'}
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

export default Register;