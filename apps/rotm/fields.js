'use strict';

const path = require('path');

function extname(value) {
  return value && ['.png', '.jpg', '.jpeg'].includes(path.extname(value));
}

module.exports = {
  source: {
    validate: 'required'
  },
  'evidence-url': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'url',
      child: 'textarea'
    }, {
      value: 'no'
    }],
  },
  'url': {
    mixin: 'textarea',
    validate: 'required',
    disableRender: true,
    dependent: {
      field: 'evidence-url',
      value: 'yes'
    },
    attributes: [{
      attribute: 'rows',
      value: 1
    }]
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
    disableRender: true,
    dependent: {
      field: 'evidence-upload',
      value: 'yes'
    },
    validate: [
      'required',
      extname
    ]
  },
  'evidence-upload-more': {
    mixin: 'radio-group',
    validate: 'required',
    legend: {
      className: 'visuallyhidden'
    },
    options: [{
      value: 'yes',
      toggle: 'another-image',
      child: 'input-file'
    }, {
      value: 'no'
    }]
  },
  'another-image': {
    mixin: 'input-file',
    disableRender: true,
    dependent: {
      field: 'evidence-upload-more',
      value: 'yes'
    },
    validate: [
      'required',
      extname
    ]
  },
  'evidence-written': {
    mixin: 'textarea',
    attributes: [{
      attribute: 'rows',
      value: 8
    }]
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
  'contact-details-name': {
    mixin: 'input-text',
    legend: {
      className: 'visuallyhidden'
    },
    validate: 'required'
  },
  'contact-details-method': {
    mixin: 'checkbox-group',
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
  },
  'contact-email': {
    disableRender: true,
    dependent: {
      field: 'contact-details-method',
      value: 'email'
    },
    validate: 'required'
  },
  'contact-phone': {
    disableRender: true,
    dependent: {
      field: 'contact-details-method',
      value: 'phone'
    },
    validate: 'required'
  }
};
