import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { Messages } from '../collection';

Meteor.publish('messages', function (room) {
  check(room, String);
  return Messages.find({ room });
});