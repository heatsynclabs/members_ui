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
import { TextField, Button, Card, CardHeader, CircularProgress } from '@material-ui/core';
import { get } from 'lodash';

import { passwordReset } from '../state/user';
import { colors, formButton } from '../lib/styles';


const baseStyles = {
  container: {
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'repeat',
    height: '100%',
    minHeight: '900px',
    padding: '10px',
  },
  loginBox: {
    margin: '0 auto 100px',
    textAlign: 'center',
    width: '500px',
  },
  errorText: {
    color: colors.secondaryAccent,
    height: '18px',
    paddingTop: '18px',
  },
  form: {
    margin: 'auto',
    padding: '35px 50px 50px',
  },
};

class Forgot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdateEmail = this.handleChange.bind(this, 'email');
    this.handleResetRequest = this.handleResetRequest.bind(this);
  }

  handleChange(field, evt) {
    this.setState({ [field]: evt.target.value });
  }

  handleResetRequest() {
    this.props.passwordReset(this.state.email);
  }
  render() {
    const { user } = this.props;
    if (user.passwordResetPending) {
      return <CircularProgress size={80} thickness={5} />;
    }
    if (!user.passwordReset) {
      let errorMsg = '';
      let errorText = '';
      if (user.passwordResetError && user.passwordResetError.details) {
        errorText = user.passwordResetError.details[0].message;
      } else if (user.passwordResetError) {
        // TODO fetch can get better errors
        // eslint-disable-next-line
        errorMsg = get(user.passwordResetError, 'content.message') || get(user.passwordResetError, 'content.error') || user.passwordResetError.message;
      }
      return (
        <div style={baseStyles.container} >
          <Card style={baseStyles.loginBox}>
            <CardHeader title="Reset Password" />
            <div style={baseStyles.errorText}>{errorMsg}</div>
            <div style={baseStyles.form}>
              <TextField
                className="login-field"
                label="Email"
                fullWidth={true}
                error={!!errorText}
                onChange={this.handleUpdateEmail}
                value={this.props.email}
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleResetRequest}
                style={formButton}
              >Send Reset Link</Button>
            </div>
          </Card>
        </div>
      );
    }
    return (
      <div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <div>An email has been sent to you with a link to reset your password.</div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}


export default connect(mapStateToProps, { passwordReset })(Forgot);