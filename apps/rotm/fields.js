'use strict';

const path = require('path');

const extensions = ['.png', '.jpg', '.jpeg'];

module.exports = {
  source: {
    validate: 'required'
  },
  'more-info': {
    mixin: 'textarea'
  },
  'material-type': {
    mixin: 'checkbox-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'image',
      'video',
      'article',
      'comment',
      'speech',
      'something-else'
    ]
  },
  'report-reason': {
    mixin: 'textarea',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'add-image': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'who-shared': {
    mixin: 'input-text',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'can-we-contact': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [
      'yes',
      'no'
    ]
  },
  'evidence-upload': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
     options: [{
      value: 'yes',
      toggle: 'image',
      child: 'input-file'
    }, {
      value: 'no'
    }]
  },
  'image': {
    mixin: 'input-file',
    validate: [function extname(value) {
      return extensions.includes(path.extname(value));
    }]
  },
  'image-paste': {
    mixin: 'input-text',
    legend: {
      className: 'visuallyhidden'
    }
  },
  'evidence-general': {
    mixin: 'textarea'
  },
  'evidence-written': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
     options: [{
      value: 'yes',
      toggle: 'yes-written',
      child: 'textarea'
    }, {
      value: 'no'
    }]
  },
  'yes-written': {
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 12
    }]
  },
  'evidence-url': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
     options: [{
      value: 'yes',
      toggle: 'yes-url',
      child: 'input-text'
    }, {
      value: 'no'
    }]
  },
  'yes-url': {
    mixin: 'input-text'
  },
  'evidence-url-auto': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
     options: [{
      value: 'yes'
    }, {
      value: 'no'
    }]
  },
  'send-copy': {
    mixin: 'checkbox-group',
    options: [{
      value: 'yes',
      toggle: 'send-copy-email',
      child: 'input-text'
    }]
  },

  'video': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'video-upload',
      child: 'input-file'
    }, {
      value: 'no'
    }
    ]
  },
  'contact-details-method': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'email',
      toggle: 'contact-email',
      child: 'input-text'
    }, {
      value: 'phone',
      toggle: 'contact-phone',
      child: 'input-text'
    }, {
      value: 'text',
      toggle: 'contact-text',
      child: 'input-text'
    }]
  }
};
