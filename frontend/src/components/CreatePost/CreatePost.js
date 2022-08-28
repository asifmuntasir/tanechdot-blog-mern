import React from 'react';
import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch, useSelector } from 'react-redux';
import { createAction } from '../../store/asyncMethods/PostMethod';
import toast, { Toaster } from 'react-hot-toast';
import Loader from '../Loader';



const CreatePost = (props) => {

    const [state, setState] = useState({
        title: '',
        description: '',
        image: ''
    });

    const dispatch = useDispatch();
    const { user: { _id, name } } = useSelector(state => state.AuthReducer);
    // const {_id, name} = user;
    // console.log(_id, name);

    const { createErrors, redirect, loading } = useSelector(state => state.PostReducer);

    useEffect(() => {
        console.log('postError', createErrors);
        if (redirect) {
            props.history.push('/userDashboard');
        }
        if (createErrors.length !== 0) {
            createErrors.map((error) => {
                return toast.error(error.msg)
            });
        }
    }, [createErrors, redirect])

    const [currentImage, setCurrentImage] = useState('Choose Image');

    const [imagePreview, setImagePreivew] = useState('')

    const [value, setValue] = useState('');


    const [slug, setSlug] = useState('');

    const [editSlug, setEditSlug] = useState(false);

    const handlePostTitle = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
        const createSlug = e.target.value.trim().split(' ').join('-');
        setSlug(createSlug);
    }

    const fileHandle = (e) => {
        // console.log(e.target.files[0].name);
        if (e.target.files.length !== 0) {
            setCurrentImage(e.target.files[0].name);

            setState({
                ...state,
                [e.target.name]: e.target.files[0]
            })

            const fileReader = new FileReader()
            fileReader.onloadend = () => {
                setImagePreivew(fileReader.result)
            }
            fileReader.readAsDataURL(e.target.files[0]);
        }
    }

    const handleSlug = (e) => {
        setEditSlug(true)
        setSlug(e.target.value)
    }

    const handleUpdateSlug = (e) => {
        e.preventDefault();
        setSlug(slug.trim().split(' ').join('-'))
    }

    const handleDescription = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        })
    }

    const createPost = (e) => {
        e.preventDefault();
        // console.log(state)
        // console.log(slug)
        // console.log(value);
        const { title, description, image } = state;

        const formData = new FormData();
        formData.append('title', title);
        formData.append('body', value);
        formData.append('image', image);
        formData.append('description', description);
        formData.append('slug', slug);
        formData.append('name', name);
        formData.append('id', _id);

        dispatch(createAction(formData))
    }


    return (
        <>
            <Helmet>
                <title>Create Post</title>
                <meta
                    name='description'
                    content='Create a post by user'
                />
                <link rel="shortcut icon" href="./create_post.png" />
            </Helmet>
            <Toaster
                toastOptions={{
                    style: {
                        fontSize: '15px'
                    },
                }}
            />
            {
                !loading ? (
                    <div className="container mt-100">
                        <form onSubmit={createPost}>
                            <div className="row ml-minus-15 mr-minus-15">
                                <div className="col-6 p-15">
                                    <div className="card box-shadow">
                                        <h3 className="card__h3">Create a new post</h3>
                                        <div className="group">
                                            <label htmlFor="title">Post Title</label>
                                            <input
                                                type="text"
                                                name="title"
                                                id='title'
                                                className='group__control'
                                                placeholder='Post Title...'
                                                onChange={handlePostTitle}
                                            />
                                        </div>
                                        <div className="group">
                                            <label htmlFor="image" className='image__label'>{currentImage}</label>
                                            <input
                                                type="file"
                                                name="image"
                                                id='image'
                                                onChange={fileHandle}
                                            />
                                        </div>
                                        <div className="group">
                                            <label htmlFor="body">
                                                Post Body
                                            </label>
                                            <ReactQuill
                                                theme="snow"
                                                id='body'
                                                value={value}
                                                onChange={setValue}
                                                placeholder='Post body...'
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 p-15">
                                    <div className="card box-shadow">
                                        <div className="group">
                                            <label htmlFor="slug">Post URL</label>
                                            <input
                                                type="text"
                                                name="slug"
                                                id='slug'
                                                value={slug}
                                                onChange={handleSlug}
                                                className='group__control'
                                                placeholder='Post URL...'
                                            />
                                        </div>
                                        <div className="group">
                                            {editSlug ?
                                                <input
                                                    type="submit"
                                                    value="Updated Slug"
                                                    onClick={handleUpdateSlug}
                                                    className='btn btn-default btn-block'
                                                /> : ''}
                                        </div>
                                        <div className="group">
                                            <div className="imagePreview">
                                                {
                                                    imagePreview ? <img src={imagePreview} alt="" /> : ''
                                                }
                                            </div>
                                        </div>
                                        <div className="group">
                                            <label htmlFor="description">
                                                Meta Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                defaultValue={state.description}
                                                onChange={handleDescription}
                                                cols="30"
                                                rows="10"
                                                className='group__control'
                                                placeholder='meta description...'
                                                maxLength='150'
                                            >
                                            </textarea>
                                            <p className="length">
                                                {
                                                    state.description ? state.description.length : 0
                                                }
                                            </p>
                                        </div>
                                        <div className="group">
                                            <input
                                                type="submit"
                                                value="Create Post"
                                                className='btn btn-default btn-block'
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (<Loader />)
            }
        </>
    );
};

export default CreatePost;