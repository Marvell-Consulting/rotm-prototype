'use strict';

const router = require('express').Router();
const busboy = require('busboy-body-parser');

router.use(busboy());

router.post('/', (req, res, next) => {
  if (req.files.document) {
    res.json({'url': `http://s3.com/foo/111`});
  } else {
    next(new Error('No file uploaded'));
  }
});

module.exports = router;
