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
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { DataGrid } from '@material-ui/data-grid';
import Header from '../components/header';
import { read, edit, add } from '../state/certs';
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
  nameField: {
    fontSize: '1.5em',
    magin: '5px',
  },
  descriptionFeild: {
    width: '125ch',
    magin: '5px',
  },
  form: {
    width: '90%',
    margin: '5px',
  },
  formButton: {
    margin: '5px',
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
  state = {
    name: '',
    description: '',
  };

  nameChange = (e) => {
    this.setState({name: e.target.value});
  };

  descriptionChange = (e) => {
    this.setState({description: e.target.value});
  };

  submitForm = () => {
    const { id } = this.props.match.params;
    const { name, description } = this.state;
    this.props.edit(id, { name, description });
  };

  async componentDidMount(){
    const { id } = this.props.match.params;
    this.props.browseAll({cert_id: id, orderBy: 'user_name', sortOrder: 'asc'});
    const res = await this.props.read(id);
	if (res !== null) {
		const { name, description } = res;
    	this.setState({ name, description });
	}
  }

  render() {
    const { browseAll } = this.props.userCerts;
    const { read, editPending } = this.props.certs;
    const { auth } = this.props.user;

    return (
        <div style={styles.container}>
          <Header/>
          {auth.isAdmin && read ? (
            <div style={styles.form}>
              <TextField
                label="Name"
                style={styles.nameField}
                value={this.state.name}
                onChange={this.nameChange}
              />
              <br/>
              <TextField
                label="Description"
                fullWidth
                style={styles.nameField}
                value={this.state.description}
                onChange={this.descriptionChange}
              />
              <Button
                style={styles.formButton}
                variant="contained"
                color="primary"
                onClick={this.submitForm}
                disabled={editPending || !this.state.name || !this.state.description}
              >
                Update
              </Button>
            </div>
          ) : (
            <>
              <h1>{read ? read.name : ''}</h1>
              <h2>{read ? read.description : ''}</h2>
            </>
          )}
          
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


export default connect(mapStateToProps, { browseAll, read, edit, add })(Certs);
