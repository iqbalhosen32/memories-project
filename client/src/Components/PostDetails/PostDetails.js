import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider, Grid } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';
import CommentSection from './CommentSection';
import { getPost, getPostsBySearch } from '../../Actions/Posts';
import useStyles from './Styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useNavigate();
  const classes = useStyles();
  const { id } = useParams();

  const postt = post?.post;

  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'none', tags: postt?.tags?.join(',') }));
    }
  }, [post]);




  if (!post) return null;

  const openPost = (_id) => history(`/posts/${_id}`);

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  const recommendedPosts = posts?.filter(({ _id }) => _id !== postt._id);

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section_wrapper}>
          <div className={classes.section}>
            <Typography variant="h3" component="h2">{postt.title}</Typography>
            <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{postt.tags.map((tag) => `#${tag} `)}</Typography>
            <Typography gutterBottom variant="body1" component="p">{postt.message}</Typography>
            <Typography variant="h6">Created by: {postt.name}</Typography>
            <Typography variant="body1">{moment(postt.createdAt).fromNow()}</Typography>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
            <Divider style={{ margin: '20px 0' }} />
            <CommentSection post={post} />
            <Divider style={{ margin: '20px 0' }} />
          </div>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={postt.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!recommendedPosts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
              {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                  <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                    <Typography gutterBottom variant="h6">{title}</Typography>
                    <Typography gutterBottom variant="subtitle2">{name}</Typography>
                    <Typography variant="body2" color="textSecondary" component="p">{message.split(' ').splice(0, 20).join(' ')}...</Typography>
                    <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                    <img src={selectedFile} alt={title} width="200px" />
                  </div>
                </Grid>
              ))}
            </Grid>
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;