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
import { TextField, Button, Card, CardHeader } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { auth } from '../state/user';
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
    height: '400px',
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

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleLogin() {
    this.props.auth(this.state.email, this.state.password)
      .then((ok) => {
        console.log('auth ok', ok);
        this.props.history.push('/app');
      })
      .catch((err) => {
        console.log('err', err);
      })
  }

  render() {
    const { user } = this.props;
    console.log('login user', user);
    const propErrors = {};
    let errorMsg = '';
    // prefill user/pass in dev
    if (process.env.NODE_ENV == "development") {
      this.state.email = 'admin@example.com';
      this.state.password = 'Testing1!';
    }
    if (user.authError && user.authError.details) {
      user.authError.details.forEach((detail) => {
        propErrors[detail.path] = detail.message;
      });
    } else if (user.authError) {
      // TODO fetch can get better errors
      // eslint-disable-next-line
      errorMsg = get(user.authError, 'content.message') || get(user.authError, 'content.error') || user.authError.message;
    }
    return (
      <div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <CardHeader title="Sign In" />
          <div style={baseStyles.errorText}>{errorMsg}</div>
          <div style={baseStyles.form}>
            <TextField
              className="login-field"
              label="email"
              name="email"
              fullWidth={true}
              error={!!propErrors.email}
              onChange={this.handleChange}
              value={this.state.email}
            />
            <TextField
              className="login-field"
              label="Password"
              name="password"
              fullWidth={true}
              error={!!propErrors.password}
              onChange={this.handleChange}
              type="password"
              value={this.state.password}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleLogin}
              style={formButton}
            >Sign In</Button>
            <p style={baseStyles.forgotPassword}><Link to="/signup">New User?</Link></p>
            <p style={baseStyles.forgotPassword}><Link to="/forgot">Forgot your password?</Link></p>
          </div>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default connect(mapStateToProps, { auth })(Login);