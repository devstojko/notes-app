import React, { Component } from 'react';
import { func } from 'prop-types';
import { Link } from 'react-router-dom';
import { Accounts } from 'meteor/accounts-base';
import { createContainer } from 'meteor/react-meteor-data';

export class Singup extends Component {
  
  state = {
    error: ''
  }

  static propTypes = {
    createUser: func.isRequired
  }

  onSubmit = (e) => {
    const { createUser } = this.props;
    e.preventDefault();

    const email = this.email.value.trim();
    const password = this.password.value.trim();


    if (password.length < 9) {
      return this.setState({ error: 'Password must be more than 8 characters long!' });
    }

    // createUser({email: let email, password: let password })
    createUser({ email, password }, error => (error 
      ? this.setState({ error: error.reason })
      : this.setState({ error: '' })));
  }

  focus() {
    this.email.focus();
    this.password.focus();
  }

  render() {
    const { error } = this.state;
    const renderErrorBox = () => error && <p className="error-box" >{error}</p>;    
    return (
      <div className="boxed-view" >
        <div className="boxed-view__box">
          <h1>Singup</h1>

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
            <button className="button button--primary" >Create Account</button>
          </form>
          <Link to="/">Back to login page</Link>
        </div>
      </div>
    );
  }
}

export default createContainer(() => {
  return {
    createUser: Accounts.createUser
  };
}, Singup);