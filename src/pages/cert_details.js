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
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Header from '../components/header';
import { read } from '../state/certs';
import { browseAll } from '../state/userCerts';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const styles = {
  eventDescription: {
    whiteSpace: 'pre-line',
  },
  tableContainer: {
    // margin: '10px',
  },
};

class Certs extends Component {
  componentDidMount(){
    // this.props.browse();
    const { id } = this.props.match.params;
    console.log('cdm', id, this.props);
    this.props.read(id);
    this.props.browseAll({cert_id: id, orderBy: 'user_name', sortOrder: 'asc'});
  }
  render() {
    const { browseAll } = this.props.userCerts;
    const { read } = this.props.certs;
    console.log({browseAll});

    return (
        <div style={styles.container}>
          <Header/>
          <h1>{read ? read.name : ''}</h1>
          <h2>{read ? read.description : ''}</h2>
          <TableContainer style={styles.tableContainer}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Name</StyledTableCell>
                  <StyledTableCell>Certified</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {map(browseAll, (row) => (
                  <StyledTableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      <Link to={`/certs/${row.id}`}>{row.user_name}</Link>
                    </TableCell>
                    <TableCell>{row.created_at}</TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { certs, userCerts } = state;
  return { certs, userCerts };
}


export default connect(mapStateToProps, { browseAll, read })(Certs);
