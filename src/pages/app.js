import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import { colors } from '../lib/styles';
import { getNewSignups } from '../state/user';
import { fetchStats } from '../state/stats';

const actionCreators = { getNewSignups, fetchStats };

const baseStyles = {
  container: {
    backgroundColor: colors.primaryHighlight,
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  },
  mainBody: {
    display: 'flex',
    height: '100%',
  }
};

class App extends Component {
  componentDidMount(){
    this.props.getNewSignups();
    this.props.fetchStats();
  }
  render() {
    const { user, stats } = this.props;
    let newUserList = '';
    let statsList = '';

    if(user.newSignups) {
      newUserList = (
        <div>
        <h2>New People</h2>
        <ul>
          {user.newSignups.map((ns) => <li key={ns.id}><img src={`https://www.gravatar.com/avatar/${ns.gravatar}?s=50`} height={50} width={50} alt={ns.name} /> {ns.name} {ns.created_at}</li>)}
        </ul>
        </div>
      )
    }

    if(stats.stats) {
      statsList = (
        <div>
        <h2>Cool Stats</h2>
        <ul>{`Total Users: ${stats.stats.user_count}`}</ul>
        <ul>{`New Users last 14 days: ${stats.stats.new_user_count}`}</ul>
        <ul>{`Total User Certifications: ${stats.stats.user_certs}`}</ul>
        <ul>{`User Certifications last 14 days: ${stats.stats.new_cert_count}`}</ul>

        </div>
      )
    }

    return (
        <div style={baseStyles.container}>
          <Header/>
          <h1>Welcome to the HeatSync Labs Members App.</h1>
          {newUserList}
          {statsList}
          <div style={baseStyles.mainBody}>hello {user.auth.name}</div>
        </div>
    );
  }
}


function mapStateToProps(state) {
  const { user, stats } = state;
  return { user, stats };
}


export default connect(mapStateToProps, actionCreators)(App);
