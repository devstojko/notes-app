import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

export class Login extends Component {
  
  state = {
    error: ''
  }

  static propTypes = {
    loginWithPassword: func.isRequired
  }

  onSubmit = e => {
    const { loginWithPassword } = this.props;
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    loginWithPassword({ email }, password, error => (error
      ? this.setState({ error: 'Unable to login. Please check your email and password!' })
      : this.setState({ error: '' })));
  }

  render() {
    const { error } = this.state;
    const renderErrorBox = () => error && <p className="error-box" >{error}</p>;
    return (
      <div className="boxed-view" >
        <div className="boxed-view__box">
          <h1>Login</h1>

          {renderErrorBox()}

          <form className="boxed-view__form" onSubmit={this.onSubmit} noValidate>
            <input
              ref={(el) => { this.email = el; }}
              type="email"
              name="email"
              placeholder="Email"
              className="input"
            />
            <input
              ref={(el) => { this.password = el; }}
              type="password"
              name="password"
              placeholder="Password"
              className="input"
            />
            <button className="button button--primary" >Login button</button>
          </form>
          <Link to="/singup">Need an account?</Link>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    loginWithPassword: Meteor.loginWithPassword
  };
}, Login);