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
import { Link } from 'react-router-dom';
import { map } from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid } from '@material-ui/data-grid';
import Header from '../components/header';
import { colors } from '../lib/styles';
import { getAll } from '../state/user';

const actionCreators = { getAll };

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
    display: 'inline-block',
    height: 200,
    width: 200,
    overflow: 'hidden',
    border: '1px solid black',
    borderRadius: '1em',
    padding: '0.5em',
    margin: '0.5em'
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    height: 450
  }
};

const columns = [
  { field: 'id', hide: true },
  { 
    field: 'gravatar',
    headerName: ' ',
    width: 60,
    renderCell: (params) => {
      return <Avatar src={`https://www.gravatar.com/avatar/${params.value}?s=50`}/>
    },
  },
  {
    field: 'name',
    headerName: 'Name',
    align: 'left',
    width: 200,
    renderCell: (params) => {
      return <Link to={`/users/${params.id}`}>{params.value}</Link>
    },
  },
  {
    field: 'user_certs',
    headerName: 'Certs',
    align: 'left',
    width: 200,
    renderCell: (params) => {
      return (<div>{map(params.value, (c, idx) => {
        return <Link key={c.f1} to={`/certs/${c.f1}`}>{c.f2}{params.value.length > (idx + 1) ? ',' : ''} </Link>
      })}</div>);
    },
  },
  {
    field: 'instructing',
    headerName: 'Instructor',
    align: 'left',
    width: 150,
    renderCell: (params) => {
      return (<div>{map(params.value, (c, idx) => {
        return <Link key={c.f1} to={`/certs/${c.f1}`}>{c.f2}{params.value.length > (idx + 1) ? ',' : ''} </Link>
      })}</div>);
    },
  },
  {
    field: 'user_cards',
    headerName: 'Card?',
    width: 70, 
    valueFormatter: (params) => { 
      return params.value.length ? 'Y' : 'N';
    },
  },
  {
    field: 'created_at',
    headerName: 'Created',
    align: 'right',
    valueFormatter: (params) => { 
      return new Date(params.value).toLocaleDateString();
    },
  },
];

class App extends Component {
  componentDidMount(){
    this.props.getAll({orderBy: 'name', sortOrder: 'asc'});
  }
  render() {
    const { user } = this.props;
    return (
        <div style={styles.container}>
          <Header/>
          <h2>All People</h2>
          {!user.getAllPending ? (
            <div style={styles.gridContainer}>
              <DataGrid columns={columns} rows={user.getAll || []} />
            </div>
          ) : <CircularProgress/>}
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, actionCreators)(App);
