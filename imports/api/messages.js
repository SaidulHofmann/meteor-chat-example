import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function () {
    return Messages.find();
  });
}

Meteor.methods({
  postMessage (text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.Error('unauthorized');
    }

    Messages.insert({
      author: Meteor.user().username,
      text,
      createdAt: new Date(),
    });
  }
});