import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class AuthWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentWillMount() {
    const { user } = this.props;
    if ((!user.verifyPending && !user.authPending) && !user.auth) {
      this.props.history.push('/login');
    }
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if ((!user.verifyPending && !user.authPending) && !user.auth) {
      this.props.history.push('/login');
    }
  }

  renderChildrenWithProps(children) {
    const childrenWithProps = React.Children.map(children, (child) => {
      return React.cloneElement(child, { ...this.props });
    });

    return childrenWithProps;
  }

  render() {
    const { children, user } = this.props;
    console.log('auth', user);
    return (
      <div>
        {(user.auth) ?
          this.renderChildrenWithProps(children)
        :
          null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state;
  return {
    user
  };
}

export default connect(mapStateToProps, {})(AuthWrapper);
