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
import { StyledTableCell, StyledTableRow } from '../components/styled-rows';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  }
};

class App extends Component {
  componentDidMount(){
    this.props.getAll({orderBy: 'name', sortOrder: 'asc'});
  }
  render() {
    const { user } = this.props;
    // console.log('props', this.props);
    return (
        <div style={styles.container}>
          <Header/>
          <h2>All People</h2>
          {!user.allPending ? (
            <TableContainer style={styles.tableContainer}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell></StyledTableCell>
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Certs</StyledTableCell>
                    <StyledTableCell>Instructor</StyledTableCell>
                    <StyledTableCell>Card?</StyledTableCell>
                    <StyledTableCell>Created</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {map(user.all, (row) => (
                    <StyledTableRow key={row.id}>
                      <TableCell><Avatar src={`https://www.gravatar.com/avatar/${row.gravatar}?s=50`} /></TableCell>
                      <TableCell component="th" scope="row">
                        <Link to={`/certs/${row.id}`}>{row.name || 'NO NAME SET'}</Link>
                      </TableCell>
                      <TableCell>
                        <div>{map(row.user_certs, (c, idx) => {
                          return <Link to={`/certs/${c.f1}`}>{c.f2}{row.user_certs.length > (idx + 1) ? ',' : ''} </Link>
                        })}</div>
                      </TableCell>
                      <TableCell>
                        <div>{map(row.instructing, (c, idx) => {
                          return <span>{c.f2}{row.instructing.length > (idx + 1) ? ',' : ''} </span>
                        })}</div>
                      </TableCell>
                      <TableCell>{row.user_cards.length ? 'Y' : 'N'}</TableCell>
                      <TableCell>{row.created_at ? new Date(row.created_at).toLocaleDateString('en-US') : ''}</TableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
