import React from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
import { array } from 'prop-types';

import { Notes } from '../api/notes';
import NoteListHeader from './NoteListHeader';

NoteList.propTypes = {
  notes: array.isRequired
}

export function NoteList ({ notes }) {
  return (
    <div>
      <NoteListHeader />
      NoteList { notes.length }
    </div>
  );
};

export default createContainer(() => {
  Meteor.subscribe('notes');

  return {
    notes: Notes.find().fetch()
  };
}, NoteList);