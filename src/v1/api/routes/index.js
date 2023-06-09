const express = require('express');
const router = express.Router()
const GlobalAuthClass = require('../middleware/auth');
const userRoutes = require('../../api/routes/user');

router.use('/', userRoutes);

module.exports = router