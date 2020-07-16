 'use strict';

const config = require('../../config');
const skipStep = require('./behaviours/skip-step');
const saveImage = require('./behaviours/save-image');
const removeImage = require('./behaviours/remove-image');
const unsetValue = require('./behaviours/unset-value');
const checkDeviceType = require('./behaviours/check-device-type');
const caseworkerEmailer = require('./behaviours/caseworker-email')(config.email);
const checkReportBackLink = require('./behaviours/check-report-back-link');

module.exports = {
  name: 'rotm',
  params: '/:action?',
  confirmStep: '/check-your-report',
  steps: {
    '/start': {
      fields: [
        'start'
      ],
      next: '/evidence-url'
    },
    '/evidence-url': {
      fields: [
        'yes-url',
        'evidence-url'
      ],
      next: '/evidence-upload',
      continueOnEdit: true
    },
    '/evidence-upload': {
      fields: [
        'image',
        'evidence-upload'
      ],
      forks: [
        {
          target: '/evidence-upload-confirm',
          condition: {
            field: 'evidence-upload',
            value: 'yes'
          }
        },
        {
          target: '/evidence-written',
          condition: {
              field: 'evidence-upload',
              value: 'no'
          }
        }
      ],
      behaviours: [skipStep, saveImage('image'), checkDeviceType],
      continueOnEdit: true
    },
    '/evidence-upload-confirm': {
      fields: [
        'evidence-upload-more',
        'another-image'
      ],
      forks: [
        {
          target: '/evidence-upload-confirm',
          condition: {
            field: 'evidence-upload-more',
            value: 'yes'
          }
        },
        {
          target: '/evidence-written',
          condition: {
              field: 'evidence-upload-more',
              value: 'no'
          }
        }
      ],
      behaviours: [saveImage('another-image'), removeImage, unsetValue('evidence-upload-more')],
      continueOnEdit: true
    },
    '/evidence-written': {
      fields: [
        'evidence-written',
      ],
      next: '/can-we-contact',
      continueOnEdit: true
    },
    '/can-we-contact': {
      fields: [
        'can-we-contact'
      ],
      forks: [{
        target: '/contact-details',
        condition: {
          field: 'can-we-contact',
          value: 'yes'
        }
      }],
      next: '/check-your-report',
      // continueOnEdit: true
    },
    '/contact-details': {
      fields: [
        'contact-details-name',
        'contact-details-method',
        'contact-email',
        'contact-phone'
      ],
      next: '/check-your-report'
    },
    '/check-your-report': {
      fields: [
        'send-copy'
      ],
      prereqs: ['/image'],
      behaviours: [
        require('hof-behaviour-summary-page'),
        'complete',
        caseworkerEmailer,
        checkReportBackLink,
        removeImage
      ],
      nullValue: 'pages.confirm.undefined',
      sections: {
        'summary': [
          'yes-url',
          'evidence-written',
          'can-we-contact',
          'contact-details-name',
          'contact-email',
          'contact-phone'
        ]
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    },
    '/404': {
      backLink: false
    },
    '/timeout': {
      backLink: false,
      next: '/evidence-url'
    }
  }
};
