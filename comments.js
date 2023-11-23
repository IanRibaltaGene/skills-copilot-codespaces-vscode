// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Comment = require('../models/comment');
const Post = require('../models/post');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

// Connect to database
mongoose.connect(config.database);

// On connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// On error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// Get all comments
router.get('/', (req, res, next) => {
    Comment.find((err, comments) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get comments'});
        } else {
            res.json(comments);
        }
    });
});

// Get comment by id
router.get('/:id', (req, res, next) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get comment'});
        } else {
            res.json(comment);
        }
    });
});

// Get comments by post id
router.get('/post/:id', (req, res, next) => {
    Comment.find({postId: req.params.id}, (err, comments) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get comments'});
        } else {
            res.json(comments);
        }
    });
});

// Get comments by user id
router.get('/user/:id', (req, res, next) => {
    Comment.find({userId: req.params.id}, (err, comments) => {
        if (err) {
            res.json({success: false, msg: 'Failed to get comments'});
        } else {
            res.json(comments);
        }
    });
});

// Add comment
router.post('/', (req, res, next) => {
    let newComment = new Comment({
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content
    });

    Comment.addComment(newComment, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to add comment'});
        } else {
            res.json({success: true, msg: 'Comment added'});
        }
    });
});

// Update comment
router.put('/:id', (req, res, next) => {
    let updatedComment = {
        userId: req.body.userId,
        postId: req.body.postId,
        content: req.body.content
    };

    Comment.updateComment(req.params.id, updatedComment, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to update comment'});
        } else {
            res.json({success: true, msg: 'Comment updated'});
        }
    });
});

// Delete comment
router.delete('/:id', (req, res, next) => {
    Comment.deleteComment(req.params.id, (err, comment) => {
        if (err) {
            res.json({success: false, msg: 'Failed to delete comment'});
        } else {
            res.json({success: true, msg: 'Comment deleted'});
        }
    });
});

module.exports = router;
