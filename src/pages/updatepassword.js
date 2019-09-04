import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, RaisedButton, Card, CardHeader } from 'material-ui';
import { get } from 'lodash';

import { updatePassword } from '../state/user';
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

class UpdatePassword extends Component {
  constructor(props) {
    super(props);
    this.handleUpdate = this.handleUpdate.bind(this);
  }
  handleUpdate() {
    const password = this.refs.password.getValue();
    const confirmPassword = this.refs.confirmPassword.getValue();
    this.props.updatePassword(this.props.match.params.token, password, confirmPassword);
  }
  render() {
    const { user } = this.props;

    if(!user.updatePassword){
      const propErrors = {};
      let errorMsg = '';
      if(user.updatePasswordError && user.updatePasswordError.details) {
        user.updatePasswordError.details.forEach(detail => {
          propErrors[detail.path] = detail.message;
        });
      }
      else if(user.updatePasswordError) {
        //TODO fetch can get better errors
        errorMsg = get(user.updatePasswordError, 'content.message') || get(user.updatePasswordError, 'content.error') || user.updatePasswordError.message;
      }

      return (<div style={baseStyles.container} >
          <Card style={baseStyles.loginBox}>
            <CardHeader title="Update your password."/>
            <div style={baseStyles.errorText}>{errorMsg}</div>
            <div style={baseStyles.form}>
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
                label="Update Password"
                onTouchTap={this.handleUpdate}
              />
            </div>
          </Card>
        </div>);
    }

    return (
      <div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <CardHeader>Your password has been reset.</CardHeader>
          <Link to="/app"><RaisedButton label="Login" primary={false} /></Link>
        </Card>
      </div>);
  }
}

function mapStateToProps(state) {
  const { user } = state;

  return { user };
}


export default connect(mapStateToProps, { updatePassword })(UpdatePassword);
