import React, { Component } from 'react';
import { connect } from 'react-redux';
import { TextField, RaisedButton, Card, CardHeader } from 'material-ui';
import { get } from 'lodash';

import { signup } from '../state/user';
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
    this.handleSignup = this.handleSignup.bind(this);
  }
  handleSignup() {
    const username = this.refs.username.getValue();
    const email = this.refs.email.getValue();
    const password = this.refs.password.getValue();
    const confirmPassword = this.refs.confirmPassword.getValue();
    this.props.signup({username, email, password, confirmPassword});
  }
  render() {
    const { user } = this.props;
    let content = (<Card style={baseStyles.loginBox}>
        <span>Thank you for signing up! An email has been sent to you to verify your account.</span>
      </Card>);

    if(!user.signup){
      const propErrors = {};
      let errorMsg = '';
      if(user.signupError && user.signupError.details) {
        user.signupError.details.forEach(detail => {
          propErrors[detail.path] = detail.message;
        });
      }
      else if(user.signupError) {
        //TODO fetch can get better errors
        errorMsg = get(user.signupError, 'content.message') || get(user.signupError, 'content.error') || user.signupError.message;
      }

      content = (<div style={baseStyles.container} >
          <Card style={baseStyles.loginBox}>
            <CardHeader title="Sign Up"/>
            <div style={baseStyles.errorText}>{errorMsg}</div>
            <div style={baseStyles.form}>
              <TextField
                className="login-field"
                floatingLabelText="Username"
                fullWidth={true}
                errorText={propErrors.username}
                ref="username"
              />
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
                errorText={propErrors.password}
                ref="password"
                type="password"
              />
              <TextField
                className="login-field"
                floatingLabelText="Confirm Password"
                fullWidth={true}
                errorText={propErrors.confirmPassword}
                ref="confirmPassword"
                type="password"
              />
              <RaisedButton
                label="Sign Up!"
                onTouchTap={this.handleSignup}
              />
            </div>
          </Card>
        </div>);
    }

    return <div>{content}</div>;
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return { user };
}


export default connect(mapStateToProps, { signup })(Signup);
