const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../utils/auth');
const {
    createPost,
    updatePost,
    fetchPosts,
    fetchPost,
    updateValidations,
    updateImage,
    deletePost,
    home,
    postDetails,
    postComment
} = require("../controllers/userPostController");

const upload = multer({ dest: `../../the-anecdote-client/public/image` });


router.post('/create_post', auth, upload.single('image'), createPost);
router.post('/update_post', [auth, updateValidations], updatePost);
router.post('/update_image', auth, updateImage);
router.get('/posts/:id/:page', auth, fetchPosts);
router.get('/post/:id', auth, fetchPost);
router.get('/delete_post/:id', auth, deletePost);
router.get('/home/:page', home);
router.get('/explore/:id', postDetails);
router.post('/comment', auth, postComment);

module.exports = router;