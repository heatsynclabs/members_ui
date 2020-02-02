import React from 'react';
import { connect } from 'react-redux';

class AuthWrapper extends React.Component {

  componentDidUpdate() {
    const { user } = this.props;
    // console.log('cdm', user);
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
    return (
      <div>
        {(user.auth) ?
          this.renderChildrenWithProps(children)
        :
         ''
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
