import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import { colors } from '../lib/styles';
import { getOne, formatDateRange } from '../state/events';

const actionCreators = { getOne };

const baseStyles = {
  eventDescription: {
    whiteSpace: 'pre-line'
  }
};

class App extends Component {
  componentDidMount(){
    this.props.getOne(this.props.match.params.event_id);
  }
  render() {
    const { events } = this.props;
    // const event = this.props.getOne(1); //this.props.match.params.event_id

    let eventList = '';
    const ev = events.one;

    if(ev) {
      var dateRange = formatDateRange(ev);

      eventList = (
        <div>
          <h2>{ev.name}</h2>
          <h5>{dateRange.full_date_string} ({ev.frequency})</h5>
          <i>{ev.location}</i>
          <p style={baseStyles.eventDescription}>
            {ev.description}
          </p>
        </div>
      )
    }

    return (
        <div style={baseStyles.container}>
          <Header/>
          {eventList}
        </div>
    );
  }
}

function mapStateToProps(state) {
  const { events } = state;
  return { events };
}


export default connect(mapStateToProps, actionCreators)(App);
