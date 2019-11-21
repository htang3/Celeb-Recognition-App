import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { API, graphqlOperation, Storage,Auth }  from "aws-amplify";
import * as queries from '../../graphql/queries';

import CommentForm from './addComment';
const styles = {
  card: {
    width: 400,
    minHeight: 275,
    margin: 2
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'inherit',
    padding: '10px'
  },
  media: {
    minHeight: 200,
    minWidth: 200
  }
};
class ListPosts extends Component {
state = {
    open: false,
    posts: [],
    comments: [],
    userid: '',
    fileUrl: [],
    key: ''
  }
  handleClose=()=> {
    this.setState({ open: false})
  }
  handleClickOpen = () => {
    this.setState({ open: true });
  };
 async componentDidMount () {
   let data = await Auth.currentSession();
   console.log(data);
    var token = await data.getIdToken();
    this.setState({
      userid: token.payload["cognito:username"]
    })
    
    ///get the query list of posts
    API.graphql(graphqlOperation(queries.listPosts ,{
      filter: {
          userid: {
              ne: this.state.userid
              //eq: this.state.userID
          }
      }
  }))
     .then(data => {
      console.log(data.data.listPosts.items)
      //get each post with key image
      for (let i = 0; i< data.data.listPosts.items.length; i++){
        Storage.get(data.data.listPosts.items[i].key)
        .then(data => {
          console.log("in here data", data)
          let posts = this.state.posts
          posts[i].imageURL = data
          this.setState({
            posts
          })
        })
        .catch(error =>console.log(error))
      }
       this.setState({posts: data.data.listPosts.items})
      })
      .catch(error =>console.log(error))  
   
 }
   

render(){
    const { classes } = this.props;
    const { posts } = this.state;
    return (
      <div className={classes.root}>
         <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Other Posts
            </Typography>
            {/* <AddPost /> */}
            {/* <AddItem /> */}
            {/* <Button onClick={signOut}>Log Out</Button> */}
          </Toolbar>
        </AppBar>
      <Grid container className={classes.root} spacing={16}>
          {posts.map((post, index) => (
             <Grid key={post.id} post>
                 <Card className={classes.card}>
                   <CardContent>
                   <CardMedia
                    className={classes.media}
                    image = {post.imageURL}
                    title="Contemplative Reptile" />
                     <Typography className={classes.title}  gutterBottom>
                       Title: {post.title}
                     </Typography>
                     <br />
                     {/* <img src={this.state.fileUrl[index]} alt="image"/> */}
                      <Typography component="p">
                      Description: {post.description}
                      </Typography>
                  </CardContent>
                    <CardActions>
                      <CommentForm currentItem={post}/> 
                  
                   </CardActions>                    
                 </Card>                
               </Grid>
              
             ))}
         </Grid>
      </div>
    );
  }
}
ListPosts.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ListPosts);