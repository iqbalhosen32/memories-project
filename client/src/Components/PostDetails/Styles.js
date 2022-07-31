import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',

  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    width: '100%',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '40px',
    width: '75%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  section_wrapper: {
    marginLeft: '20px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 0,
    },
  },
  recommendedPosts: {
    display: 'flex',
    flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      borderRadius: '15px',
      height: '100%',
      position: 'relative',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));