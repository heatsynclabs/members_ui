import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import Login from './login';


class PrivatePage extends Component {
  render() {

    const { user } = this.props;

    if(user.auth){
      return this.authorizedRender();
    }
    if(user.verifyPending){
      return <CircularProgress size={80} thickness={5} />;
    }
    return <Login/>;
  }
}

export default PrivatePage;
