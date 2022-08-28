import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import toast, { Toaster } from 'react-hot-toast';
import SideBar from '../SideBar/SideBar';
import { useDispatch, useSelector } from 'react-redux';
import { updatePasswordAction } from '../../store/asyncMethods/ProfileMethod';
import { RESET_PROFILE_ERRORS } from '../../store/types/ProfileTypes';
import { useHistory } from 'react-router-dom';

const ChangeUserPassword = () => {

    const { push } = useHistory();

    const [state, setState] = useState({
        current: '',
        newPassword: '',
        userId: null
    })

    const dispatch = useDispatch();

    const { redirect } = useSelector(state => state.PostReducer);

    const { updateErrors } = useSelector(state => state.updateName);

    const { user: { _id } } = useSelector(state => state.AuthReducer);


    const changePassword = (e) => {
        e.preventDefault();
        dispatch(updatePasswordAction({
            current: state.current,
            newPassword: state.newPassword,
            userId: _id
        }));
    }

    useEffect(() => {
        if (updateErrors.length !== 0) {
            updateErrors.map(error => toast.error(error.msg));
            dispatch({
                type: RESET_PROFILE_ERRORS
            });
        }

    }, [updateErrors]);


    useEffect(() => {
        if (redirect) {
            push('/userDashboard');
        }
    }, [redirect]);

    return (
        <>
            <Helmet>
                <title>Update User Password</title>
                <meta
                    name='description'
                    content='Update user password'
                />
                <link rel="shortcut icon" href="./updated.png" />
            </Helmet>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '15px'
                    },
                }}
            />
            <div className="container mt-100">
                <div className="row ml-minus-15 mr-minus-15">
                    <div className="col-3 p-15">
                        <SideBar />
                    </div>
                    <div className="col-9 p-15">
                        <div className="card">
                            <h3 className="card__h3">Update Password</h3>
                        </div>
                        <form onSubmit={changePassword}>
                            <div className="group">
                                <input
                                    type='password'
                                    className='group__control'
                                    placeholder='Current Password'
                                    onChange={(e) => setState({ ...state, current: e.target.value })}
                                    value={state.current}
                                />
                            </div>
                            <div className="group">
                                <input
                                    type='password'
                                    name=''
                                    className='group__control'
                                    placeholder='New Password'
                                    onChange={(e) => setState({ ...state, newPassword: e.target.value })}
                                    value={state.newPassword}
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="submit"
                                    value="Update Password"
                                    className='btn btn-default btn-block'
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChangeUserPassword;