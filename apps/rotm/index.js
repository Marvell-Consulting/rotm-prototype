 'use strict';

const skipStep = require('./behaviours/skip-step');
const saveImage = require('./behaviours/save-image');
const removeImage = require('./behaviours/remove-image');
const createThumbnail = require('./behaviours/create-thumbnail');
const config = require('../../config');
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
      next: '/material-type'
    },
    '/material-type': {
      fields: [
        'material-type'
      ],
      next: '/evidence-url'
    },
    '/evidence-url': {
      fields: [
        'evidence-url'
      ],
      next: '/evidence-upload',
      continueOnEdit: true
    },
    '/evidence-upload': {
      fields: [
        'evidence-upload'
      ],
      // behaviours: [skipStep, saveImage, createThumbnail],
      next: '/evidence-upload-confirm',
      continueOnEdit: true
    },
    '/evidence-upload-confirm': {
      forks: [{
        target: '/evidence-upload',
        condition: {
          field: 'add-image',
          value: 'no'
        }
      }],
      next: '/evidence-written',
      continueOnEdit: true
    },
    '/evidence-written': {
      fields: [
        'evidence-written',
      ],
      next: '/can-we-contact',
      continueOnEdit: true
    },
    '/source': {
      fields: [
        'source'
      ],
      next: '/more-info'
    },
    '/more-info': {
      fields: [
        'more-info'
      ],
      next: '/image'
    },
    '/evidence': {
      fields: [
        'image',
        'image-paste',
        'yes-url',
        'yes-written'
      ],
      behaviours: [skipStep, saveImage, createThumbnail],
      next: '/evidence-added-2',
      continueOnEdit: true
    },
    '/image': {
      fields: [
        'image'
      ],
      behaviours: [skipStep, saveImage, createThumbnail],
      next: '/add-image',
      continueOnEdit: true
    },
    '/evidence-url-auto': {
      fields: [
        'evidence-url-auto'
      ],
      next: '/evidence-written',
      continueOnEdit: true
    },
    '/evidence-added-2': {
      fields: [
        'add-image'
      ],
      forks: [{
        target: '/image',
        condition: {
          field: 'add-image',
          value: 'no'
        }
      }],
      next: '/can-we-contact',
      continueOnEdit: true
    },
    '/video': {
      fields: [
        'video'
      ],
      next: '/add-image',
      continueOnEdit: true
    },
    '/add-image': {
      fields: [
        'add-image'
      ],
      forks: [{
        target: '/image',
        condition: {
          field: 'add-image',
          value: 'no'
        }
      }],
      next: '/can-we-contact',
      continueOnEdit: true
    },
    '/who-shared': {
      fields: [
        'who-shared'
      ],
      next: '/can-we-contact'
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
        'contact-details-method'
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
          'source-website',
          'report-reason',
          'yes-url',
          'yes-written',
          'contact-details-name',
          // 'contact-email',
          'contact-phone'
          // 'contact-text'
          // image preview is hardcoded in the page template
        ]
      },
      next: '/confirmation'
    },
    '/confirmation': {
      backLink: false
    }
  }
};
