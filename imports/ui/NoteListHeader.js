import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { func } from 'prop-types';

NoteListHeader.propTypes = {
  meteorCall: func.isRequired
}

export function NoteListHeader ({ meteorCall }) {
  return (
    <button onClick={() => meteorCall('notes.insert')}>New Note</button>
  );
};

export default createContainer(() => {
  return {
    meteorCall: Meteor.call
  };
}, NoteListHeader);