const express = require('express');
const router = express.Router()
const GlobalAuthClass = require('../middleware/auth');
const userRoutes = require('../../admin/routes/admin');

router.use('/', userRoutes);

module.exports = router