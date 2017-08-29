import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { string, func } from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';

PrivateHeader.propTypes = {
  title: string,
  handleLogout: func.isRequired
}

PrivateHeader.defaultProps = {
  title: "Dashboard"
}

export function PrivateHeader({ title, handleLogout }) {
  return (
    <div>
      <h1>{title}</h1>
      <button onClick={ () => handleLogout() }>logout</button>
    </div>
  );
}

export default createContainer(() => {
  return {
    handleLogout: () =>  Accounts.logout()
  };
}, PrivateHeader);