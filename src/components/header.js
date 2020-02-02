import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import { logout } from '../state/user';
import { ReactComponent as Meatball} from '../meatball.svg';

import { colors } from '../lib/styles';

const baseStyles = {
  header: {
    backgroundColor: colors.darkAccent,
    padding: '25px',
  },
  headerText: {
    color: colors.highlightBright,
    fontWeight: 100,
    paddingLeft: '10px',
  },
  icon: {
    color: colors.white,
  },
  logo: {
    height: '68px',
    padding: '5px 5px 5px 10px',
    marginRight: '10px',
  }
};



class Header extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);

  }
  handleLogout() {
    this.props.logout();
  }
  render() {
    const { user } = this.props;

    let nav = "";
    let btn = (<Link to="/app"><Button
            label="Login"
            primary={false}
          >Login</Button></Link>);

    if(user.auth){
      nav = (
          <span>
            <Link to="/app">
              <Button
                label="Home"
                primary={false}>
                Home
              </Button>
            </Link>
            <Link to="/users">
              <Button
                label="People"
                primary={false}>
                People
              </Button>
            </Link>
            <Link to="/events">
              <Button
                label="Events"
                primary={false}>
                Events
              </Button>
            </Link>
          </span>);
      btn = (<Button
            primary={false}
            onClick={this.handleLogout}
          >Logout</Button>);
    }
    else if(user.verifyPending || user.authPending){
      btn = (
        <Link to="/login">
        Login
        </Link>);
    }
    return (
      <Toolbar style={baseStyles.header}>
        <span firstChild={true}>
          <Link to="/">
            <Meatball style={baseStyles.logo} />
          </Link>
        </span>
        <span>
          {nav}
          {btn}
        </span>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { logout })(Header);
