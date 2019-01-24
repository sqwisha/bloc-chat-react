import React, { Component } from 'react';

class User extends Component {
  render() {
    return(
      <div>
        <button
          id="sign-in"
          onClick={ this.props.setUser }>
          Sign In
        </button>
        <button
          id="sign-out"
          onClick={ this.props.signOut }>
          Sign Out
        </button>
        <div>Logged in as { this.props.username }</div>
      </div>
    );
  }
}

export default User;
