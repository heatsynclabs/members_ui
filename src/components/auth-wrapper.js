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
