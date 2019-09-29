import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/header';
import { colors } from '../lib/styles';
import { getAll } from '../state/events';

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
    const { events } = this.props;
    let allEventList = '';

    if(events.all) {
      allEventList = (
        <div>
        <h2>All Events</h2>
        <div>
          {events.all.map((e) =>
            <div key={e.id} style={baseStyles.card}>
            <h5><a href="/events/{e.id}">{e.name}</a></h5>
            {e.description} <br/>
            {e.start_date} - {e.end_date} ({e.frequency}) <br/>
            {e.location}
            </div>
          )}
        </div>
        </div>
      )
    }

    return (
        <div style={baseStyles.container}>
          <Header/>
          {allEventList}
        </div>
    );
  }
}


function mapStateToProps(state) {
  const { events } = state;
  return { events };
}


export default connect(mapStateToProps, actionCreators)(App);
