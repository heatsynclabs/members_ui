// Copyright 2019 Iced Development, LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar } from '@material-ui/core';

import Button from '@material-ui/core/Button';

import { logout } from '../state/user';
import { ReactComponent as Meatball} from '../meatball.svg';

import { colors } from '../lib/styles';

const styles = {
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
  },
  menuButton: {
    margin: '5px',
  },
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
    let btn = (<Link to="/login"><Button
            label="Login"
          >Login</Button></Link>);

    if(user.auth){
      nav = (
          <span>
            <Link to="/app" style={styles.menuButton}>
              <Button
                label="Home">
                Home
              </Button>
            </Link>
            <Link to="/users" style={styles.menuButton}>
              <Button
                label="People">
                People
              </Button>
            </Link>
            <Link to="/events" style={styles.menuButton}>
              <Button
                label="Events">
                Events
              </Button>
            </Link>
            <Link to="/certs" style={styles.menuButton}>
              <Button
                label="Certs">
                Certs
              </Button>
            </Link>
          </span>);
      btn = (<Button
            style={styles.menuButton}
            onClick={this.handleLogout}
          >Logout</Button>);
    }
    else if(user.verifyPending || user.authPending){
      btn = (
        <Link to="/login" style={styles.menuButton}>
        Login
        </Link>);
    }
    return (
      <Toolbar style={styles.header}>
        <span>
          <Link to="/">
            <Meatball style={styles.logo} />
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
