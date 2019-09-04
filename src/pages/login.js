import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, RaisedButton, Card, CardHeader } from 'material-ui';
import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { auth } from '../state/user';
import { colors } from '../lib/styles';


const baseStyles = {
  container: {
    backgroundAttachment: 'scroll',
    backgroundRepeat: 'repeat',
    height: '100%',
    minHeight: '900px',
    padding: '10px'
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
  }
};

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }
  handleLogin() {
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    this.props.auth(email, password)
      .then((ok) => {
        this.props.history.push('/');
      });
  }
  render() {
    const { user } = this.props;
    const propErrors = {};
    let errorMsg = '';
    if(user.authError && user.authError.details) {
      user.authError.details.forEach(detail => {
        propErrors[detail.path] = detail.message;
      });
    }
    else if(user.authError) {
      //TODO fetch can get better errors
      errorMsg = get(user.authError, 'content.message') || get(user.authError, 'content.error') || user.authError.message;
    }
    return (
      <div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <CardHeader title="Sign In"/>
          <div style={baseStyles.errorText}>{errorMsg}</div>
          <div style={baseStyles.form}>
            <TextField
              className="login-field"
              floatingLabelText="Email"
              fullWidth={true}
              errorText={propErrors.email}
              ref="email"
            />
            <TextField
              className="login-field"
              floatingLabelText="Password"
              fullWidth={true}
              ref="password"
              errorText={propErrors.password}
              type="password"
            />
            <RaisedButton
              label="Sign In"
              onTouchTap={this.handleLogin}
            />
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
