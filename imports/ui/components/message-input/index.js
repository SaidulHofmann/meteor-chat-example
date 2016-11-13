import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';

import './index.html';

const ENTER_KEY = 13;

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