import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Messages } from '../imports/api/messages';

import './main.html';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Session.setDefault('currentRoom', 'main');

const ENTER_KEY = 13;

Template.messageList.onCreated(function () {
  this.autorun(() => {
    Meteor.subscribe('messages', Session.get('currentRoom'));
  });
});

Template.messageList.helpers({
  messages () {
    return Messages.find({}, { date: -1 });
  }
});

Template.messageItem.helpers({
  formatDate (dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  }
});

Template.messageInput.events({
  'keyup .js-message' (evt, instance) {
    if (evt.which === ENTER_KEY) {
      const text = evt.target.value;
      const room = Session.get('currentRoom');

      if (text) {
        Meteor.call('postMessage', { text, room });
        evt.currentTarget.value = '';
      }
    }
  }
});

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