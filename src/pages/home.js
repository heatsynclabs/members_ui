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
    return (
      <div style={baseStyles.container}>
        <Header {...this.props} />
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
