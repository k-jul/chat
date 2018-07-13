const router = require('express').Router();
const users = require('./users');
const messages = require('./messages');

router.use('/users', users);
router.use('/messages', messages);

module.exports = router;