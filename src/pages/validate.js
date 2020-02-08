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

import { validate } from '../state/user';
import { colors } from '../lib/styles';


const baseStyles = {
  container: {
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'repeat',
    height: '100%',
    minHeight: '900px',
    padding: '10px'
  },
  errorText: {
    color: colors.secondaryAccent,
    height: '18px',
    paddingTop: '18px',
  }
};

class Validate extends Component {
  componentWillMount() {
    this.props.validate(this.props.match.params.token);
  }
  render() {
    const { user } = this.props;

    if(user.validate) {
      return (<div style={baseStyles.container} >
        <div>
          Your email has been validated <Link to="/app">click here</Link> to login.
        </div>
      </div>);
    }

    if (user.validateError){
      return (<div style={baseStyles.container} >
          <div style={baseStyles.errorText}>
          There was an error validating. {user.validateError.toString()}
          </div>
        </div>);
    }

    return <div>validating <CircularProgress size={80} thickness={5} /> </div>;

  }
}


function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { validate })(Validate);
