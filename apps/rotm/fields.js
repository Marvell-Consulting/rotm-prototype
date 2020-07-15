'use strict';

const path = require('path');

const extensions = ['.png', '.jpg', '.jpeg'];

module.exports = {
  source: {
    validate: 'required'
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
  'evidence-upload-confirm': {
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
    disableRender: true,
    validate: ['required', function extname(value) {
      return value && extensions.includes(path.extname(value));
    }]
  },
  'evidence-written': {
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 8
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
      child: 'textarea'
    }, {
      value: 'no'
    }],
  },
  'yes-url': {
    mixin: 'textarea',
    validate: 'required',
    disableRender: true,
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
  },
  'contact-details-name': {
    mixin: 'input-text',
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required'
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
    }]
  }
};
