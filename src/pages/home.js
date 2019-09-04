import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/header';


import { colors } from '../lib/styles';

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
  }
};

class Home extends Component {
  render() {
    const { user } = this.props;
    return (
      <div style={baseStyles.container}>
        <Header {...this.props}/>
        <h1>Welcome to the HeatSync Labs Members App.</h1>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps)(Home);
