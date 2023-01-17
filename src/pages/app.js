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
import { connect } from 'react-redux';

import { map } from 'lodash';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchStats } from '../state/stats';
import { getNewSignups } from '../state/user';
import { colors } from '../lib/styles';
import Header from '../components/header';

debugger;

const styles = {
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
  },
  card: {
    margin: '10px',
  },
};

class App extends Component {
  componentDidMount() {
    this.props.getNewSignups();
    this.props.fetchStats();
  }

  render() {
    const { user, stats } = this.props;
    console.log('props', user, stats);

    const newUserList = (
      <Card style={styles.card}>
        Hey Dudes
        <CardHeader title="New heatsync members" />
        <CardContent>
          {user.getNewSignups ? (
            <ul>
              {map(user.getNewSignups, (ns) => (
                <li key={ns.id}>
                  <Avatar src={`https://www.gravatar.com/avatar/${ns.gravatar}?s=50`} height={50} width={50} alt={ns.name} />
                  {' '}
                  {ns.name}
                  {' '}
                  {new Date(ns.created_at).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : <CircularProgress />}
        </CardContent>
      </Card>
    );

    const statsList = (
      <Card style={styles.card}>
        <CardHeader title="Cool Stats" />
        <CardContent>
          {stats.stats ? (
            <>
              <div>{`Total Users: ${stats.stats.user_count}`}</div>
              <div>{`New Users last 14 days: ${stats.stats.new_user_count}`}</div>
              <div>{`Total User Certifications: ${stats.stats.user_certs}`}</div>
              <div>{`User Certifications last 14 days: ${stats.stats.new_cert_count}`}</div>
            </>
          ) : <CircularProgress />}

        </CardContent>
      </Card>
    );

    return (
      <div style={styles.container}>
        <Header />
        <h1>
          Hello,
          {user.auth.name}
          !
        </h1>
        <h2>Welcome to the HeatSync Labs Members App.</h2>
        {newUserList}
        {statsList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, stats } = state;
  return { user, stats };
}

export default connect(mapStateToProps, { getNewSignups, fetchStats })(App);
