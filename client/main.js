import { Template } from 'meteor/templating';
import { Messages } from '../imports/api/messages';

import './main.html';

const ENTER_KEY = 13;

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
      const author = instance.find('.js-author').value;

      if (text && author) {
        Messages.insert({
          author,
          text,
          createdAt: new Date()
        });
        evt.currentTarget.value = '';
      }
    }
  }
});