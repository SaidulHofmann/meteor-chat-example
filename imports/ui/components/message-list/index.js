import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { Session } from 'meteor/session';
import { Messages } from '../../../api/messages';

import './index.html';
import './item';

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