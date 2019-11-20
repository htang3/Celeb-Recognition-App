import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AddPost from './addPost';

import { Auth } from 'aws-amplify';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    float: 'right',
  },
  root: {
    flexGrow: 1
  },
  grow: {
   flexGrow: 1,
 },
});

// function signOut() {
//     Auth.signOut()
//       .then(data => console.log(data))
//       .catch(err => console.log(err))
// }

class CrudNavBar extends Component {
render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Posts
            </Typography>
            <AddPost />
            {/* <AddItem /> */}
            {/* <Button onClick={signOut}>Log Out</Button> */}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

CrudNavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CrudNavBar);