import React, { useState, useRef } from 'react';
import { Typography, TextField, Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { commentPost } from '../../Actions/Posts'

import useStyles from './Styles';


const CommentSection = ({ post }) => {
    const postt = post?.post;
    const classes = useStyles();
    const [comments, setComments] = useState(postt?.comments);
    const [comment, setComment] = useState('');
    const dispatch = useDispatch();
    const commentsRef = useRef();
    const user = JSON.parse(localStorage.getItem('profile'))



    const handleComment = async () => {
        const finalUser = `${user.result.name}: ${comment}`
        const newComments = await dispatch(commentPost(finalUser, postt._id));

        setComments(newComments);
        setComment('');

        commentsRef.current.scrollIntoView({ behavior: 'smooth' });
        
    };
    return (
        <div>
            <div className={classes.commentsOuterContainer}>
                <div className={classes.commentsInnerContainer}>
                    <Typography gutterBottom variant='h6'>Comments</Typography>
                    {comments?.map((c, i) => (
                        <Typography key={i} gutterBottom variant="subtitle1">
                            <strong>{c.split(': ')[0]}</strong>
                            {c.split(':')[1]}
                        </Typography>
                    ))}
                    <div ref={commentsRef}>
                        {""}
                    </div>
                </div>
                {
                    user?.result?.name && (
                        <div style={{ width: '50%' }}>
                            <Typography gutterBottom variant='h6'>Write a Comment</Typography>
                            <TextField
                                fullWidth
                                rows={4}
                                variant="outlined"
                                label="Comment"
                                multiline
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            />
                            <Button style={{ marginTop: '10px' }} fullWidth color="primary" disabled={!comment} variant="contained" onClick={handleComment}>
                                Comment
                            </Button>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default CommentSection;