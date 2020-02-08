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

import Header from '../components/header';
import { colors } from '../lib/styles';
import { getAll } from '../state/user';

const actionCreators = { getAll };

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
  },
  card: {
    display: 'inline-block',
    height: 200,
    width: 200,
    overflow: 'hidden',
    border: '1px solid black',
    borderRadius: '1em',
    padding: '0.5em',
    margin: '0.5em'
  }
};

class App extends Component {
  componentDidMount(){
    this.props.getAll();
  }
  render() {
    const { user } = this.props;
    let allUserList = '';

    if(user.all) {
      allUserList = (
        <div>
        <h2>All People</h2>
        <div>
          {user.all.map((u) => <div key={u.id} style={baseStyles.card}><img src={`https://www.gravatar.com/avatar/${u.gravatar}?s=50`} height={50} width={50} alt={u.name} /> {u.name} <br/> Level: {u.member_level} <br/> <a href={`mailto:${u.email}`}>{u.email}</a> <br/> {u.created_at}</div>)}
        </div>
        </div>
      )
    }

    return (
        <div style={baseStyles.container}>
          <Header/>
          {allUserList}
        </div>
    );
  }
}


function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps, actionCreators)(App);
