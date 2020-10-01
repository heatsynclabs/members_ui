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
import CircularProgress from '@material-ui/core/CircularProgress';
import { DataGrid } from '@material-ui/data-grid';
import Header from '../components/header';
import { read } from '../state/certs';
import { browseAll } from '../state/userCerts';

const styles = {
  eventDescription: {
    whiteSpace: 'pre-line',
  },
  tableContainer: {
    // margin: '10px',
  },
  gridContainer: {
    width: '100%',
    display: 'flex',
    height: 450
  },
};

const columns = [
  { field: 'id', hide: true },
  {
    field: 'user_name',
    headerName: 'Name',
    align: 'left',
    width: 250,
    renderCell: (params) => {
      return <Link to={`/users/${params.data.user_id}`}>{params.value}</Link>
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

class Certs extends Component {
  componentDidMount(){
    // this.props.browse();
    const { id } = this.props.match.params;
    this.props.read(id);
    this.props.browseAll({cert_id: id, orderBy: 'user_name', sortOrder: 'asc'});
  }
  render() {
    const { browseAll } = this.props.userCerts;
    const { read } = this.props.certs;

    return (
        <div style={styles.container}>
          <Header/>
          <h1>{read ? read.name : ''}</h1>
          <h2>{read ? read.description : ''}</h2>
          {browseAll ? (
            <div style={styles.gridContainer}>
              <DataGrid columns={columns} rows={browseAll || []} />
            </div>
          ) : <CircularProgress/>}
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { certs, userCerts } = state;
  return { certs, userCerts };
}


export default connect(mapStateToProps, { browseAll, read })(Certs);
