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
import {
  TextField, Button, Card, CardHeader
} from '@mui/material';
import { get } from 'lodash';

import { signup } from '../state/user';
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

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
      email: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.handleUpdateEmail = this.handleChange.bind(this, 'email');
    this.handleUpdatePassword = this.handleChange.bind(this, 'password');
    this.handleUpdateConfirmPassword = this.handleChange.bind(this, 'confirmPassword');
  }

  handleChange(field, evt, value) {
    // console.log('handlechange', field, evt, value);
    this.setState({ [field]: evt.target.value });
  }

  handleSignup() {
    const { email } = this.state;
    const { password } = this.state;
    const { confirmPassword } = this.state;
    this.props.signup({ email, password, confirmPassword });
  }

  render() {
    const { user } = this.props;
    let content = (
      <Card style={baseStyles.loginBox}>
        <span>Thank you for signing up! An email has been sent to you to verify your account.</span>
      </Card>
    );

    if (!user.signup) {
      const propErrors = {};
      let errorMsg = '';
      if (user.signupError && user.signupError.details) {
        user.signupError.details.forEach((detail) => {
          propErrors[detail.path] = detail.message;
        });
      } else if (user.signupError) {
        // TODO fetch can get better errors
        // eslint-disable-next-line
        errorMsg = get(user.signupError, 'content.message') || get(user.signupError, 'content.error') || user.signupError.message;
      }

      content = (
        <div style={baseStyles.container}>
          <Card style={baseStyles.loginBox}>
            <CardHeader title="Sign Up" />
            <div style={baseStyles.errorText}>{errorMsg}</div>
            <div style={baseStyles.form}>
              <TextField
                className="login-field"
                label="Email"
                fullWidth={true}
                error={!!propErrors.email}
                onChange={this.handleUpdateEmail}
                value={this.state.email}
              />
              <TextField
                className="login-field"
                label="Password"
                fullWidth={true}
                onChange={this.handleUpdatePassword}
                error={!!propErrors.password}
                value={this.state.password}
                type="password"
              />
              <TextField
                className="login-field"
                label="Confirm Password"
                fullWidth={true}
                onChange={this.handleUpdateConfirmPassword}
                error={!!propErrors.confirmPassword}
                value={this.state.confirmPassword}
                type="password"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={this.handleSignup}
                style={formButton}
              >
                Sign Up!
              </Button>
            </div>
          </Card>
        </div>
      );
    }

    return <div>{content}</div>;
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return { user };
}

export default connect(mapStateToProps, { signup })(Signup);
