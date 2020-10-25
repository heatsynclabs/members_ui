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

import Header from '../components/header';
import { read, formatDateRange } from '../state/events';

const baseStyles = {
  eventDescription: {
    whiteSpace: 'pre-line'
  }
};

class App extends Component {
  state = {
    id: null,
    name: '',
    frequency: '',
    location: '',
    description: '',
    start_date: null,
    end_date: null
  };

  async componentDidMount(){
    // this.props.read(this.props.match.params.event_id);
    const { id, name, frequency, location, description, start_date, end_date } = await this.props.read(this.props.match.params.event_id);
    this.setState({ id, name, frequency, location, description, start_date, end_date });
  }

  render() {
    // const { events } = this.props;
    // const event = this.props.read(1); //this.props.match.params.event_id

    // let eventList = '';
    // const ev = this.props.read;
    const { read } = this.props.events;


    return (
      <div style={baseStyles.container}>
      <Header/>
      {read ? (
        <>
          <h2>{this.state.name}</h2>
          <h5>
            {formatDateRange(this.state.start_date, this.state.end_date).full_date_string}
            &nbsp;({this.state.frequency})
          </h5>
          <i>{this.state.location}</i>
          <p style={baseStyles.eventDescription}>
            {this.state.description}
          </p>
          <Link to={`/events/${this.state.id}/edit`}>Edit</Link>
        </>
      ) : (
        <CircularProgress/>
      )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { events } = state;
  return { events };
}


export default connect(mapStateToProps, { read })(App);
