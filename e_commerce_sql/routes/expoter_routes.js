const express = require('express');
const router = express.Router();

const {
    show_dashboard,
    send_order,
    approve_order,
} = require('../controllers/expoter_controller')

router.route('/dashboard')
.get(show_dashboard)
.post(send_order)

router.post('/approve_order',approve_order)

module.exports = router;