import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from './collection';

Meteor.methods({
  postMessage ({ text, room }) {
    check(text, String);
    check(room, String);

    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    Messages.insert({
      author: Meteor.user().username,
      room,
      text,
      createdAt: new Date(),
    });
  }
});