import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { TextField, Button, Card, CardHeader } from '@material-ui/core';
import { get } from 'lodash';

import { updatePassword } from '../state/user';
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

class UpdatePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      confirmPassword: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleUpdatePassword = this.handleChange.bind(this, 'password');
    this.handleUpdateConfirmPassword = this.handleChange.bind(this, 'confirmPassword');
  }

  handleChange(field, evt) {
    this.setState({ [field]: evt.target.value });
  }

  handleUpdate() {
    this.props.updatePassword(this.props.match.params.token, this.state.password, this.state.confirmPassword)
      .then((res) => {
        this.props.history.push('/app');
        return res;
      })
      .catch((err) => {
        console.log('pass update err', err);
      });
  }

  render() {
    const { user } = this.props;
    
    if (!user.updatePassword) {
      const propErrors = {};
      let errorMsg = '';
      if (user.updatePasswordError && user.updatePasswordError.details) {
        user.updatePasswordError.details.forEach((detail) => {
          propErrors[detail.path] = detail.message;
        });
      } else if (user.updatePasswordError) {
        // TODO fetch can get better errors
        // eslint-disable-next-line
        errorMsg = get(user.updatePasswordError, 'content.message') || get(user.updatePasswordError, 'content.error') || user.updatePasswordError.message;
      }

      return (<div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <CardHeader title="Update your password." />
          <div style={baseStyles.errorText}>{errorMsg}</div>
          <div style={baseStyles.form}>
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
              error={!!propErrors.confirmPassword}
              onChange={this.handleUpdateConfirmPassword}
              value={this.state.confirmPassword}
              type="password"
            />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleUpdate}
              style={formButton}
              disabled={!this.state.password || !this.state.confirmPassword}
            >Update Password</Button>
          </div>
        </Card>
      </div>);
    }

    return (
      <div style={baseStyles.container} >
        <Card style={baseStyles.loginBox}>
          <span>Your password has been reset.</span>
          <Link to="/app">
          <Button
            variant="contained"
            color="primary"
          >Login</Button>
          </Link>
        </Card>
      </div>);
  }
}


function mapStateToProps(state) {
  const { user } = state;

  return { user };
}


export default connect(mapStateToProps, { updatePassword })(UpdatePassword);