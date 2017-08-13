import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';

export default class Login extends Component {
  
  state = {
    error: ''
  }

  onSubmit = (e) => {
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();

    Meteor.loginWithPassword({ email }, password, error => (error ?
      this.setState({ error: 'Unable to login. Please check your email and password!' })
      :
      this.setState({ error: '' })));
  }

  render() {
    return (
      <div className="boxed-view" >
        <div className="boxed-view__box">
          <h1>Login</h1>

          {this.state.error && <p className="error-box" >{this.state.error}</p>}

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
