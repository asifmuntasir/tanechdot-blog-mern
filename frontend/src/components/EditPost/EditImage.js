import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateImageAction } from '../../store/asyncMethods/PostMethod';
import toast, { Toaster } from 'react-hot-toast';
import { RESET_UPDATE_IMAGE_ERRORS } from '../../store/types/PostTypes';


const EditImage = () => {

    const { id } = useParams();
    const { push } = useHistory();

    const { redirect } = useSelector(state => state.PostReducer);
    const dispatch = useDispatch();
    const { updateImageErrors } = useSelector(state => state.UpdateImage)

    const [state, setState] = useState({
        image: '',
        imagePreview: '',
        imageName: 'Select New Image'
    });

    const fileHandle = (e) => {
        if (e.target.files.length !== 0) {
            const imageReader = new FileReader();
            imageReader.onloadend = () => {
                setState({
                    ...state,
                    image: e.target.files[0],
                    imageName: e.target.files[0].name,
                    imagePreview: imageReader.result
                })
            }
            imageReader.readAsDataURL(e.target.files[0]);
        }
    }

    const updateImage = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('id', id);
        formData.append('image', state.image);
        dispatch(updateImageAction(formData));
    }

    useEffect(() => {
        if (updateImageErrors.length !== 0) {
            updateImageErrors.map(error => {
                return toast.error(error.msg);
            });
            dispatch({
                type: RESET_UPDATE_IMAGE_ERRORS
            });
        }
    }, [updateImageErrors]);

    useEffect(() => {
        if (redirect) {
            push('/userDashboard');
        }
    }, [redirect])

    return (
        <>
            <Helmet>
                <title>Update Image</title>
                <meta
                    name='description'
                    content='Update post image'
                />
                <link rel="shortcut icon" href="./edit.png" />
            </Helmet>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '15px'
                    },
                }}
            />
            <div className="container mt-100">
                <div className="row">
                    <div className="col-6">
                        <div className="card">
                            <h3 className="card__h3">Edit Image</h3>
                            <form onSubmit={updateImage}>
                                <div className="group">
                                    <label htmlFor="image" className='image__label'>
                                        {state.imageName}
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        id='image'
                                        onChange={fileHandle}
                                    />
                                </div>
                                <div className="group">
                                    <div className="imagePreview">
                                        {
                                            state.imagePreview ? <img src={state.imagePreview} alt="" /> : ''
                                        }
                                    </div>
                                </div>
                                <div className="group">
                                    <input
                                        type="submit"
                                        value="Update Image"
                                        className='btn btn-default btn-block'
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

export default EditImage;