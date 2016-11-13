import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './index.html';

Template.roomList.helpers({
  isChecked (room) {
    return Session.equals('currentRoom', room);
  }
});

Template.roomList.events({
  'change input[name="room"]' (evt) {
    const room = evt.currentTarget.value;
    Session.set('currentRoom', room);
  }
});