import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

import RaisedButton from 'material-ui/RaisedButton';

import { logout } from '../state/user';



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
    height: '40px',
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

    let btn = (<Link to="/app"><RaisedButton
            label="Login"
            primary={false}
          /></Link>);

    if(user.auth){
      btn = (<RaisedButton
            label="Logout"
            primary={false}
            onTouchTap={this.handleLogout}
          />);
    }
    else if(user.verifyPending || user.authPending){
      btn = '';
    }
    return (
      <Toolbar style={baseStyles.header}>
        <ToolbarGroup firstChild={true}>
          <Link to="/">
            <img alt="Home" style={baseStyles.logo} src="favicon.ico" />
          </Link>
        </ToolbarGroup>
        <ToolbarGroup>
        {btn}
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps, { logout })(Header);
