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
import withRouter from '../lib/withRouter';
import { getOne, formatDateRange } from '../state/events';

const actionCreators = { getOne };

const baseStyles = {
  eventDescription: {
    whiteSpace: 'pre-line',
  },
};

class App extends Component {
  componentDidMount() {
    this.props.getOne(this.props.router.params.event_id);
  }

  render() {
    const { events } = this.props;
    // const event = this.props.getOne(1); //this.props.match.params.event_id

    let eventList = '';
    const ev = events.getOne;

    if (ev) {
      const dateRange = formatDateRange(ev);

      eventList = (
        <div>
          <h2>{ev.name}</h2>
          <h5>
            {dateRange.full_date_string}
            {' '}
            (
            {ev.frequency}
            )
          </h5>
          <i>{ev.location}</i>
          <p style={baseStyles.eventDescription}>
            {ev.description}
          </p>
        </div>
      );
    }

    return (
      <div style={baseStyles.container}>
        <Header />
        {eventList}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { events } = state;
  return { events };
}

export default withRouter(connect(mapStateToProps, actionCreators)(App));
