import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import { string } from 'prop-types';

PrivateHeader.propTypes = {
    title: string
}

PrivateHeader.defaultProps = {
    title: "Dashboard"
}

export default function PrivateHeader({title}) {
    return (
      <div>
        <h1>{title}</h1>
        <button onClick={() => Accounts.logout()}>logout</button>
      </div>
    );
}