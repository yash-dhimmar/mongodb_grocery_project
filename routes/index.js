const express = require('express');
const router = express.Router();
const path = require('path');
const {dirname} = require('path');

global.base_path = dirname(require.main.filename)


/* GET users listing. */
router.get('/', (req, res) => {
    res.json({message:{message:'respond with a resource'},status:200,error:false});
});

const v1 = require('../src/v1/api/routes/index');
router.use('/api/v1',v1);

const v1Admin = require('../src/v1/admin/routes/index');
router.use('/admin',v1Admin)

module.exports = router;
