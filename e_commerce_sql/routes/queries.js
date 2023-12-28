const express = require('express');
const router = express.Router();


const {
    usertb,
    producttb,
    carttb,
} = require('../controllers/create_querys')


router.get('/usertb',usertb)
router.get('/producttb',producttb)
router.get('/carttb',carttb)
// router.get('/billingtb')

module.exports = router;