import React from 'react';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useDispatch, useSelector } from 'react-redux';
import { updateNameAction } from '../../store/asyncMethods/ProfileMethod';
import SideBar from '../SideBar/SideBar';
import toast, { Toaster } from 'react-hot-toast';
import { RESET_PROFILE_ERRORS } from '../../store/types/ProfileTypes';
import { useHistory } from 'react-router-dom';

const UpdateUserName = () => {

    const { push } = useHistory();

    const [userName, setUserName] = useState('');

    const dispatch = useDispatch();
    const { user: { name, _id } } = useSelector(user => user.AuthReducer);
    // console.log(name);

    const { loading, redirect } = useSelector(state => state.PostReducer);

    const { updateErrors } = useSelector(state => state.updateName)


    useEffect(() => {
        setUserName(name);
    }, [name]);

    const updateUserName = (e) => {
        e.preventDefault();
        dispatch(updateNameAction({
            name: userName,
            id: _id
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
    }, [push, redirect]);

    return (
        <>
            <Helmet>
                <title>Update User Name</title>
                <meta
                    name='description'
                    content='Update user name'
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
                            <h3 className="card__h3">Update Name</h3>
                        </div>
                        <form onSubmit={updateUserName}>
                            <div className="group">
                                <input
                                    type='text'
                                    name=''
                                    className='group__control'
                                    placeholder='Enter new name'
                                    onChange={(e) => setUserName(e.target.value)}
                                // value={userName}
                                />
                            </div>
                            <div className="group">
                                <input
                                    type="submit"
                                    value="Update Name"
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

export default UpdateUserName;