const express = require('express');
const router = express.Router();


const {
    show_dashboard,
    send_products,
    update_product,
    show_add_product,
    add_product,
    delete_product,
    show_seller,
    send_seller,
    approve_seller,
    reject_seller,
    show_seller_products,
    send_seller_products,
    approve_product,
    reject_product,
    show_transpoter,
    add_transpoter,
} = require('../controllers/admin_controller')

router.route('/dashboard')
.get(show_dashboard)
.post(send_products)

router.post('/update_product',update_product);

router.route('/add_product')
.get(show_add_product)
.post(add_product)

router.delete('/delete',delete_product);

router.route('/approve')
.get(show_seller)
.post(send_seller)

router.post('/approve_seller',approve_seller)
router.post('/reject_seller',reject_seller)

router.route('/seller_product')
.get(show_seller_products)
.post(send_seller_products)

router.post('/approve_product',approve_product)
router.post('/reject_product',reject_product)

router.route('/transpoter')
.get(show_transpoter)
.post(add_transpoter)

module.exports = router;