import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function (room) {
    check(room, String);
    return Messages.find({ room });
  });
}

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