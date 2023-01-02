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
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CircularProgress from '@mui/material/CircularProgress';
import { StyledTableCell, StyledTableRow } from '../components/styled-rows';
import Header from '../components/header';
import { colors } from '../lib/styles';
import { getOne } from '../state/user';
import withRouter from '../lib/withRouter';

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
    width: '45%',
    overflow: 'hidden',
    // border: '1px solid black',
    borderRadius: '0.5em',
    padding: '0.5em',
    margin: '0.5em',
  },
  cards: {
    display: 'flex',
  },
};

class App extends Component {
  componentDidMount() {
    const { id } = this.props.router.params;
    console.log('cdm', id, this.props);
    this.props.getOne(id);
  }

  render() {
    const { user } = this.props;
    const aUser = user.getOne;
    console.log('props', this.props);
    return (
      <div style={styles.container}>
        <Header />
        <h2>All People</h2>

        {aUser ? (
          <>
            <TableContainer style={styles.tableContainer}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell />
                    <StyledTableCell>Name</StyledTableCell>
                    <StyledTableCell>Card?</StyledTableCell>
                    <StyledTableCell>Created</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>

                  <StyledTableRow key={aUser.id}>
                    <TableCell><Avatar src={`https://www.gravatar.com/avatar/${aUser.gravatar}?s=50`} /></TableCell>
                    <TableCell component="th" scope="row">
                      {aUser.name || 'NO NAME SET'}
                    </TableCell>
                    <TableCell>{aUser.user_cards.length ? 'Y' : 'N'}</TableCell>
                    <TableCell>{aUser.created_at ? new Date(aUser.created_at).toLocaleDateString('en-US') : ''}</TableCell>
                  </StyledTableRow>

                </TableBody>
              </Table>
            </TableContainer>
            <div style={styles.cards}>
              <Card style={styles.card}>
                <CardHeader title="Certifications:" />
                <CardContent>
                  {aUser.user_certs.length ? (
                    <ul>
                      {map(aUser.user_certs, (c, idx) => (
                        <li>
                          <Link key={c.f1} to={`/certs/${c.f1}`}>{c.f2}</Link>
                          {' '}
                          {new Date(c.f3).toLocaleDateString()}
                        </li>
                      ))}
                    </ul>
                  ) : (<span>None yet.</span>)}
                </CardContent>
              </Card>
              <Card style={styles.card}>
                <CardHeader title="Instructor for:" />
                <CardContent>
                  {aUser.instructing.length ? (
                    <div>
                      {map(aUser.instructing, (c, idx) => (
                        <Link key={c.f1} to={`/certs/${c.f1}`}>
                          {c.f2}
                          {aUser.user_certs.length > (idx + 1) ? ',' : ''}
                          {' '}

                        </Link>
                      ))}
                    </div>
                  ) : (<span>Not instructing any classes.</span>)}
                </CardContent>
              </Card>
            </div>
          </>
        ) : <CircularProgress />}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default withRouter(connect(mapStateToProps, { getOne })(App));
