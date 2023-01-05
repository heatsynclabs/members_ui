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
import withRouter from '../lib/withRouter';
import { Button, Card, CircularProgress, TextField } from '@mui/material';
import { get } from 'lodash';

import { auth, oauthStart, tokenLogin, emailLogin } from '../state/user';
import { colors } from '../lib/styles';
import Joi from 'joi';

const emailCheck = Joi.string().email({ tlds: {allow: false} });


const styles = {
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
  loginBrand: {
    height: '18px',
    width: '18px',
    marginRight: '15px'
  },
  loginBrandText: {
    fontSize: '1em',
    width: '100%',
    textTransform: 'none',
    textAlign: 'left',
  }
};

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      useEmail: false,
      email: '',
      emailValid: false,
      sent: false,
    };
  }

  componentDidMount() {
    const { token } = this.props.router.params;
    if(token) {
      this.props.tokenLogin(token)
      .then((ok) => {
        console.log('auth ok', ok);
        this.props.router.navigate('/app');
      })
      .catch((err) => {
        console.log('err', err);
        this.props.oauthStart();
      });
      return;
    }
    this.props.oauthStart();
  }

  textChange = (e) => {
    console.log(e.value, e.target, e.target.value);
    const email = e.target.value;
    const emailValid = !emailCheck.validate(email).error;
    this.setState({email, emailValid});
  }

  sendEmail = async (event) => {
    event.preventDefault();
    await this.props.emailLogin(this.state.email);
    this.setState({sent: true});
  }


  render() {
    const { user } = this.props;
    console.log('login user', user);
    const propErrors = {};
    let errorMsg = '';
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
      <div style={styles.container} >

          <div style={styles.errorText}>{errorMsg}</div>

        <Card style={styles.loginBox}>
        {this.state.sent ? (
          <div>Please check your email for a login link.</div>
        ):  (
        <div>
        {user.oauthStart ? (
            <div style={styles.form}>

            {get(user, 'oauthStart.providers.google') ? (
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.google.url}
                style={{margin: '10px', width: '220px', color: '#757575', backgroundColor: '#FFF'}}
              ><img alt="google" style={styles.loginBrand} src="/images/oauth/google.svg"/>
              <span style={styles.loginBrandText}>Sign in with Google</span></Button>
            ) : ''}
            
            <br/>
            {get(user, 'oauthStart.providers.github') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.github.url}
                style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#333'}}
              ><img alt="github" style={styles.loginBrand} src="/images/oauth/github.svg"/>
              <span style={styles.loginBrandText}>Sign in with Github</span></Button>
              <br/>
            </>
            ) : ''}
            {get(user, 'oauthStart.providers.facebook') ? (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={() => document.location.href = user.oauthStart.providers.facebook.url}
                style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#3b5998'}}
              ><img alt="facebook" style={styles.loginBrand} src="/images/oauth/facebook.svg"/>
              <span style={styles.loginBrandText}>Sign in with Facebook</span></Button>
              <br/>
            </>
            ) : ''}
            {!this.state.useEmail ? (<Button
              variant="contained"
              color="primary"
              onClick={() => this.setState({useEmail: true})}
              style={{margin: '10px', width: '220px', color: '#FFF', backgroundColor: '#db4437'}}
            ><img alt="email" style={styles.loginBrand} src="/images/oauth/mail.svg"/>
            <span style={styles.loginBrandText}>Sign in with Email</span></Button>) : ''}
            {this.state.useEmail ? (
              <form onSubmit={this.sendEmail}>
                <div>
                  <TextField
                    value={this.state.email}
                    label="email"
                    onChange={this.textChange}
                    autoFocus
                    style={{margin: '10px', width: '220px', color: 'black'}}
                  />
                  <br/>
                  <Button
                    variant="contained"
                    color="primary"
                    disabled={!this.state.emailValid}
                    style={{margin: '10px', width: '180px', color: '#FFF', backgroundColor: this.state.emailValid ? '#db4437' : '#DDD'}}
                    type="submit"
                  >
                    <img alt="email" style={styles.loginBrand} src="/images/oauth/mail.svg"/>Send Link
                  </Button>
                </div>
              </form>
            ) : ''}
          
          </div>
          
          ) : <CircularProgress/>}
          </div>)}
          
          </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return { user };
}

export default withRouter(connect(mapStateToProps, { auth, oauthStart, tokenLogin, emailLogin })(Login));