import { Template } from 'meteor/templating';

import './item.html';

Template.messageListItem.helpers({
  formatDate (dateString) {
    const date = new Date(dateString);
    return date.toLocaleTimeString();
  }
});