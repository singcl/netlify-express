const express = require('express');
const apiV1Routes = require('./apiV1');
const apiV2Routes = require('./apiV2');

const router = express.Router();

// API v1 routes
router.use('/api', apiV1Routes);

// API v2 routes
router.use('/apiv2', apiV2Routes);

module.exports = router; 